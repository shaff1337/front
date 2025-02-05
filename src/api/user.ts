import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { NavigateFunction } from 'react-router-dom';
import authClient from './axiosClient';

const token = { headers: { Authorization: `Bearer ${Cookies.get('access_token')}` } };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function me(setUserInfo: any) {
	authClient.get('/user/me', token)
		.then(({ data }) => {
			const user = data.response;
			setUserInfo(
				{
					isLoading: false,
					id: user.id,
					username: user.username,
					email: user.email,
					role: user.role,
					ban: user.ban,
					avatar: `https://www.gravatar.com/avatar/${user.avatar}?d=retro`,
					invitedBy: user.invitedBy,
					createdAt: user.createdAt,
					subscription: user.subscription,
				},
			);
		});
}

export async function getInvites(page: number): Promise<any> {
	const data = await authClient.get(`/user/invite/${page}/get`, token);
	return data.data.response;
}

export async function getInvitesPages(): Promise<any> {
	const data = await authClient.get('/user/invite/pages', token);
	return data.data.response;
}

export async function signOut(navigate: NavigateFunction): Promise<void> {
	Cookies.remove('access_token');
	toast.success('Signed out!');
	return navigate('/auth/sign-in');
}

export async function setEmail(values: { email: string }): Promise<void> {
	await authClient.put('/user/email', JSON.stringify(values), token)
		.then(({ data }) => {
			toast.success(data.response);
		});
}

export async function setPassword(values: { password: string }): Promise<void> {
	await authClient.put('/user/password', JSON.stringify(values), token)
		.then(({ data }) => {
			toast.success(data.response);
		});
}

export async function createPayment(values: { id: string }): Promise<void> {
	await authClient.post('/user/payment/create', JSON.stringify(values), token).then(({ data }) => {
		window.location.replace(data.hosted_url);
	});
}
