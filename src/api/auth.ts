import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { NavigateFunction } from 'react-router-dom';
import authClient from './axiosClient';

interface ISignIn {
	username: string;
	password: string;
}
interface ISignUp extends ISignIn {
	email: string;
	code?: string;
}

export async function getPanel(): Promise<any> {
	const data = await authClient.get('/auth/panel');
	return data.data.response;
}

export async function signIn(values: ISignIn, navigate: NavigateFunction): Promise<void> {
	await authClient.post('/auth/signIn', JSON.stringify(values)).then(({ data }) => {
		toast.success('Logged in!');
		Cookies.set('access_token', data.response);
		return navigate('/');
	});
}

export async function signUp(values: ISignUp, navigate: NavigateFunction, enabled: boolean): Promise<void> {
	await authClient.post('/auth/signUp', JSON.stringify(values)).then(({ data }) => {
		toast.success('Account created!');
		Cookies.set('access_token', data.response);
		return navigate('/');
	});
}
