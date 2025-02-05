import React from 'react';
import Cookies from 'js-cookie';
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import toast from 'react-hot-toast';

type roleType = 'ADMIN' | 'USER' | 'BETA';

interface iCookie {
	role: roleType;
	subscription: Date;
}

interface Props {
	children?: React.ReactNode;
	hasRole: string[];
	hasSubscription: boolean;
	fallback: string;
}

function ProtectedPage({ children, hasRole, hasSubscription, fallback }: Props): JSX.Element {
	const Context = useOutletContext();
	const currentDate = new Date();
	try {
		const cookie = Cookies.get('access_token');
		if (!cookie) return <Navigate to="/auth/sign-in" />;
		const user: iCookie = jwt_decode(cookie);
		if (user.role !== 'ADMIN' && !hasRole.includes(user.role)) {
			toast.error('Missing permissions.');
			return <Navigate to={fallback} />;
		}
		return children ? (children as JSX.Element) : <Outlet context={Context} />;
	} catch (e) {
		Cookies.remove('access_token');
		return <Navigate to="/auth/sign-up" />;
	}
}

export default ProtectedPage;
