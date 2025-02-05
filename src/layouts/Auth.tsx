import React from 'react';
import {
	Link,
	LinkProps,
	Outlet,
	useMatch,
	useResolvedPath,
} from 'react-router-dom';
import {Command} from 'lucide-react';

interface AuthLinkProps extends LinkProps {
	to: string;
	key: string;
}

const pages = [
	{ key: 'signIn', to: '/auth/sign-in', text: 'Already have an account?' },
	{ key: 'signUp', to: '/auth/sign-up', text: 'Don\'t have an account?' },
];

function AuthLink({ children, to, ...props }: AuthLinkProps): JSX.Element {
	const resolved = useResolvedPath(to);
	const match = useMatch({ path: resolved.pathname, end: true });
	return (
		<>{!match && (<p className="mt-8 text-center text-cove"><Link to={to} className="text-sm font-medium" {...props}>{children}</Link></p>)}</>
	);
}

function Auth(): JSX.Element {
	return (
		<main className="relative flex flex-1 flex-col overflow-hidden py-8 px-4 sm:px-6 lg:px-8 h-screen">
			<div className="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16">
				<Command />
				<Outlet />
				{pages.map((page) => (
					<AuthLink to={page.to} key={page.key}>{page.text}</AuthLink>
				))}
			</div>
			<footer>
				<div
					className="text-sm text-cove flex items-center justify-center space-x-4"
				>
					<Link to="terms">Terms</Link>
					<Link to="privacy">Privacy</Link>
				</div>
			</footer>
		</main>
	);
}

export default Auth;
