/* eslint-disable max-len */
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import authClient from './axiosClient';

const token = { headers: { Authorization: `Bearer ${Cookies.get('access_token')}` } };

/**
 * TODO: ban/unban
 * TODO: delete HWID
 */

export async function getAllUsers(): Promise<any> {
	const data = await authClient.get('/admin/user/get', token);
	return data.data;
}

export async function getInvites(page: number): Promise<any> {
	const data = await authClient.get(`/admin/invite/${page}/get`, token);
	return data.data;
}

export async function getInvitesPages(): Promise<any> {
	const data = await authClient.get('/admin/invite/pages', token);
	return data.data.response;
}

export async function createInvite(values: { username: string, amount: number }): Promise<any> {
	await authClient.post('/admin/invite/create', JSON.stringify(values), token).then(({ data }) => {
		toast.success(data.response);
	});
}

export async function createGroupInvite(values: { role: string, amount: number }): Promise<any> {
	await authClient.post('/admin/invite/create/group', JSON.stringify(values), token).then(({ data }) => {
		toast.success(data.response);
	});
}

export async function getTypes(): Promise<any> {
	const data = await authClient.get('/admin/type/get', token);
	return data.data;
}

export async function createType(values: { text: string, color: string }, reload: any): Promise<any> {
	await authClient.post('admin/type/create', JSON.stringify(values), token).then(({ data }) => {
		toast.success(data.response);
		reload(Math.random());
	});
}

export async function deleteType(id: string, reload: any): Promise<any> {
	await authClient.delete(`/admin/type/${id}/delete`, token).then(({ data }) => {
		toast.success(data.response);
		reload(Math.random());
	});
}

export async function editType(id: string, values: {oldTypeName: string, newTypeName: string, newTypeColor: string}, reload: any): Promise<any> {
	await authClient.put(`/admin/type/${id}/edit`, JSON.stringify(values), token).then(({ data }) => {
		toast.success(data.response);
		reload(Math.random());
	});
}

export async function createAnnouncement(values: { title: string, text: string, typeName: string, typeColor: string }): Promise<any> {
	await authClient.post(
		'/admin/announcement/create',
		JSON.stringify(values),
		token,
	).then(({ data }) => {
		toast.success(data.response);
	});
}

export async function deleteAnnouncement(id: string, reload: any): Promise<any> {
	await authClient.delete(`/admin/announcement/${id}/delete`, token).then(({ data }) => {
		toast.success(data.response);
		reload(Math.random());
	});
}

export async function createFAQGroup(values: { name: string }, reload: any): Promise<any> {
	await authClient.post('/admin/group/create', JSON.stringify(values), token).then(({ data }) => {
		toast.success(data.response);
		reload(Math.random());
	});
}

export async function deleteFAQGroup(id: string, reload: any): Promise<any> {
	await authClient.delete(`/admin/group/${id}/delete`, token).then(({ data }) => {
		toast.success(data.response);
		reload(Math.random());
	});
}

export async function editFAQGroup(values: { newName: string, oldName: string }, reload: any): Promise<any> {
	await authClient.put('/admin/group/edit', JSON.stringify(values), token).then(({ data }) => {
		toast.success(data.response);
		reload(Math.random());
	});
}

export async function createFAQ(values: {
	question: string,
	answer: string,
	group: string
}): Promise<any> {
	await authClient.post('/admin/faq/create', JSON.stringify(values), token).then(({ data }) => {
		toast.success(data.response);
	});
}

export async function deleteFAQ(id: string, reload: any): Promise<any> {
	await authClient.delete(`/admin/faq/${id}/delete`, token).then(({ data }) => {
		toast.success(data.response);
		reload(Math.random());
	});
}

export async function deleteShout(id: string, reload: any): Promise<any> {
	await authClient.delete(`/admin/shout/${id}/delete`, token).then(({ data }) => {
		toast.success(data.response);
		reload(Math.random());
	});
}

export async function deleteShouts(reload: any): Promise<any> {
	await authClient.delete('/admin/shout/delete', token).then(({ data }) => {
		toast.success(data.response);
		reload(Math.random());
	});
}

export async function getFAQs(): Promise<any> {
	const data = await authClient.get('/admin/faq/get', token);
	return data.data;
}

export async function editFAQ(id: string, values: { question: string, answer: string, group: string }, reload: any): Promise<any> {
	await authClient.put(`/admin/faq/${id}/edit`, JSON.stringify(values), token).then(({ data }) => {
		toast.success(data.response);
		reload(Math.random());
	});
}

export async function createBan(username: string, values: { reason?: string }): Promise<void> {
	await authClient.post(`/admin/user/${username}/ban`, JSON.stringify(values), token)
		.then(({ data }) => {
			toast.success(data.response);
		});
}

export async function deleteBan(username: string): Promise<void> {
	await authClient.delete(`/admin/user/${username}/ban`, token)
		.then(({ data }) => {
			toast.success(data.response);
		});
}

export async function setPassword(username: string, values: { password: string }): Promise<void> {
	await authClient.put(`/admin/user/${username}/password`, JSON.stringify(values), token)
		.then(({ data }) => {
			toast.success(data.response);
		});
}

export async function getCheats(): Promise<any> {
	const data = await authClient.get('/admin/cheat/get', token);
	return data.data.response;
}

export async function createCheat(values: { game: string; version: string, status: string }, reload: any): Promise<void> {
	await authClient.post('/admin/cheat/create', JSON.stringify(values), token).then(({ data }) => {
		toast.success(data.response);
		reload(Math.random());
	});
}

export async function deleteCheat(id: string, reload: any): Promise<void> {
	await authClient.delete(`/admin/cheat/${id}/delete`, token).then(({ data }) => {
		toast.success(data.response);
		reload(Math.random());
	});
}

export async function editCheat(id: number, values: { game: string; version: string, status: string }, reload: any): Promise<void> {
	await authClient.put(`/admin/cheat/${id}/edit`, JSON.stringify(values), token).then(({ data }) => {
		toast.success(data.response);
		reload(Math.random());
	});
}

export async function setEmail(username: string, values: { email: string }): Promise<void> {
	await authClient.put(`/admin/user/${username}/email`, JSON.stringify(values), token)
		.then(({ data }) => {
			toast.success(data.response);
		});
}

export async function setRole(username: string, values: { role: string }): Promise<void> {
	await authClient.put(`/admin/user/${username}/role`, JSON.stringify(values), token)
		.then(({ data }) => {
			toast.success(data.response);
		});
}

export async function setVerified(username:string, values: { isVerified: boolean }): Promise<void> {
	await authClient.put(`/admin/user/${username}/verified`, JSON.stringify(values), token)
		.then(({ data }) => {
			toast.success(data.response);
		});
}

export async function extendSubscription(username:string, values: { time: number }): Promise<void> {
	await authClient.put(`/admin/user/${username}/subscription`, JSON.stringify(values), token)
		.then(({ data }) => {
			toast.success(data.response);
		});
}

export async function getPanel(): Promise<any> {
	const data = await authClient.get('/admin/panel', token);
	return data.data.response;
}

export async function editPanel(id: string, values: { invites: boolean }): Promise<void> {
	await authClient.put(`/admin/panel/${id}/edit`, JSON.stringify(values), token)
		.then(({ data }) => {
			toast.success(data.response);
		});
}
