import Cookies from 'js-cookie';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import authClient from './axiosClient';

const token = { headers: { Authorization: `Bearer ${Cookies.get('access_token')}` } };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getProfile(
	username: string,
	setUserInfo: any,
	navigate: NavigateFunction,
) {
	authClient
		.get(`/panel/id/${username}`, token)
		.then(({ data }) => {
			const user = data.response;
			setUserInfo({
				isLoading: false,
				id: user.id,
				username: user.username,
				role: user.role,
				ban: user.ban,
				avatar: `https://www.gravatar.com/avatar/${user.avatar}?d=retro`,
				invitedBy: user.invitedBy,
				createdAt: user.createdAt,
			});
		})
		.catch(() => navigate('/', { replace: true }));
}

export async function getComments(username: string): Promise<any> {
	const data = await authClient.get(`/panel/comment/${username}/get`, token);
	return data.data;
}

// eslint-disable-next-line max-len
export async function createComment(values: {comment: string, commentedUser: string}, reload: any): Promise<any> {
	await authClient.post('/panel/comment/create', JSON.stringify(values), token).then(({ data }) => {
		toast.success(data.response);
		reload(Math.random());
	});
}

export async function deleteComment(id: string, reload: any): Promise<any> {
	await authClient.delete(`/panel/comment/${id}/delete`, token).then(({ data }) => {
		toast.success(data.response);
		reload(Math.random());
	});
}

export async function getFAQsByGroup(group: string): Promise<any> {
	const data = await authClient.get(`/panel/faq/${group}/get`, token);
	return data.data;
}

export async function getFAQGroups(): Promise<any> {
	const data = await authClient.get('/panel/group/get', token);
	return data.data;
}

export async function getUsers(page: number): Promise<any> {
	const data = await authClient.get(`/panel/user/${page}/get`, token);
	return data.data;
}

export async function getUsersPages(): Promise<any> {
	const data = await authClient.get('/panel/user/pages', token);
	return data.data.response;
}
