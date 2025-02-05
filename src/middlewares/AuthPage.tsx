import React from 'react';
import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';

function AuthPage({ children }:{children?: React.ReactNode}): JSX.Element {
	try {
		const cookie = Cookies.get('access_token');
		if (cookie) return <Navigate to="/" />;
	} catch (e) {
		Cookies.remove('jwt');
	}
	return children ? children as JSX.Element : <Outlet />;
}

export default AuthPage;
