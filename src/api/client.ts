import Cookies from 'js-cookie';
import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import authClient from './axiosClient';

const token = { headers: { Authorization: `Bearer ${Cookies.get('access_token')}` } };

export async function getShouts(): Promise<any> {
	const data = await authClient.get('/client/shout/get', token);
	return data.data;
}

export async function createShout(values: { message: string }, reload: any): Promise<any> {
	await authClient.post('/client/shout/create', JSON.stringify(values), token).then(({ data }) => {
		toast.success(data.response);
		reload(Math.random());
	});
}

export async function getAnnouncements(page: number): Promise<any> {
	const data = await authClient.get(`/client/announcement/${page}/get`, token);
	return data.data;
}

export async function getAnnouncementsPages(): Promise<any> {
	const data = await authClient.get('/client/announcement/pages', token);
	return data.data.response;
}

export async function getAnnouncement(id: string): Promise<any> {
	const data = await authClient.get(`/client/announcement/${id}/get`, token);
	return data.data;
}

export async function getConfigs(page: number, type: 'CONFIG' | 'SCRIPT'): Promise<any> {
	const data = await authClient.get(`/client/config/${page}/${type}/get`, token);
	return data.data.response;
}

export async function getConfigPages(): Promise<any> {
	const data = await authClient.get('/client/config/pages', token);
	return data.data.response;
}

export async function getConfig(id: string): Promise<any> {
	const data = await authClient.get(`/client/config/${id}`, token);
	return data.data.response;
}

export async function getMemberConfigs(): Promise<any> {
	const data = await authClient.get('/client/config/personal/get', token);
	return data.data.response;
}

export async function createConfig(values: {
	name: string;
	data: string;
	type: 'CONFIG' | 'SCRIPT';
	status: 'PUBLIC' | 'PRIVATE';
}): Promise<any> {
	await authClient.post('/client/config/create', JSON.stringify(values), token).then(({ data }) => {
		toast.success(data.response);
	});
}

export async function deleteConfig(id: string, reload: any): Promise<any> {
	await authClient.delete(`/client/config/${id}/delete`, token).then(({ data }) => {
		toast.success(data.response);
		reload(Math.random());
	});
}

export async function editConfig(
	id: string,
	values: { name: string, data: string, status: 'PUBLIC' | 'PRIVATE' },
	reload: any
): Promise<any> {
	await authClient.put(`/client/config/${id}/edit`, JSON.stringify(values), token).then(({ data }) => {
		toast.success(data.response);
		reload(Math.random());
	});
}

export async function getSubscribedConfigs(): Promise<any> {
	const data = await authClient.get('/client/subscription/get', token);
	return data.data.response;
}

export async function createSubscribedConfig(values: { id: string }): Promise<any> {
	await authClient.post('/client/subscription/create', JSON.stringify(values), token).then(({ data }) => {
		toast.success(data.response);
	});
}

export async function deleteSubscribedConfig(id: string, reload: any): Promise<any> {
	await authClient.delete(`/client/subscription/${id}/delete`, token).then(({ data }) => {
		toast.success(data.response);
		reload(Math.random());
	});
}
