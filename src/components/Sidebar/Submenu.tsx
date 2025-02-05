import React from 'react';
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';
import {
	DocumentAddIcon,
	UserGroupIcon,
	TemplateIcon,
	QuestionMarkCircleIcon,
	UserIcon,
	UsersIcon,
	MailIcon,
	BellIcon,
	ChipIcon,
	CogIcon,
	TicketIcon,
	SupportIcon,
	NewspaperIcon,
	ChatIcon,
	ShoppingCartIcon,
	AdjustmentsIcon,
} from '@heroicons/react/outline';
import classNames from '../../utils/classNames';
import { IUser } from '../../hooks/user/IUser';

interface SideMenuProp extends LinkProps {
	Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const userNavigation = [
	{ key: 1, name: 'Dashboard', href: '/', icon: TemplateIcon },
	{ key: 2, name: 'My Account', href: '/account', icon: UserIcon },
	{ key: 3, name: 'Invites', href: '/invites', icon: MailIcon },
	{ key: 4, name: 'Subscriptions', href: '/subscription', icon: DocumentAddIcon },
	{ key: 5, name: 'Members', href: '/members', icon: UserGroupIcon },
	{ key: 6, name: 'FAQ', href: '/faq', icon: MailIcon },
	{ key: 7, name: 'Tickets', href: '/tickets', icon: TicketIcon },
];

const clientNavigation = [
	{ key: 1, name: 'Shoutbox', href: '/client/', icon: ChatIcon },
	{ key: 2, name: 'Announcements', href: '/client/announcements/', icon: NewspaperIcon },
	{ key: 3, name: 'Marketplace', href: '/client/configs/', icon: ShoppingCartIcon },
	{ key: 3, name: 'My Configs', href: '/client/myconfigs/', icon: CogIcon },
	
	];

const adminNavigation = [
	{ key: 1, name: 'Users', href: '/admin/users', icon: UsersIcon },
	{ key: 2, name: 'Invites', href: '/admin/invites', icon: MailIcon },
	{ key: 3, name: 'Subscriptions', href: '/admin/subscriptions', icon: DocumentAddIcon },
	{ key: 4, name: 'Cheats', href: '/admin/cheats', icon: AdjustmentsIcon },
	{ key: 5, name: 'FAQ', href: '/admin/faq', icon: MailIcon },
	{ key: 6, name: 'Announcements', href: '/admin/announcements', icon: NewspaperIcon },
];

/* eslint-disable react/jsx-props-no-spreading */
function SidebarLink({ children, to, Icon, ...props }: SideMenuProp): JSX.Element {
	const resolved = useResolvedPath(to);
	const match = useMatch({ path: resolved.pathname, end: true });

	return (
		<Link
			to={to}
			className={classNames(
				match ? 'text-blue-300' : '',
				'flex items-center text-sm hover:text-blue-300 hover:no-underline group'
			)}
			{...props}
		>
			<Icon
				className={classNames(
					match ? 'text-blue-200' : 'group-hover:text-blue-200',
					'mr-3 flex-shrink-0 h-6 w-6'
				)}
				aria-hidden="true"
			/>

			<span className="tracking-wide">{children}</span>
		</Link>
	);
}

function Submenu({ user }: { user: IUser }): JSX.Element {
	const currentDate = new Date();

	return (
		<div className="space-y-4">
			<div>
				<span className="text-xs uppercase tracking-widest">menu</span>
				<div className="font-medium text-cove pt-4 space-y-4">
					{userNavigation.map((item) => (
						<SidebarLink to={item.href} key={item.key} Icon={item.icon}>
							{item.name}
						</SidebarLink>
					))}
				</div>
			</div>
				<div>
					<span className="text-xs uppercase tracking-widest">client</span>
					<div className="font-medium text-cove pt-4 space-y-4">
						{clientNavigation.map((item) => (
							<SidebarLink to={item.href} key={item.key} Icon={item.icon}>
								{item.name}
							</SidebarLink>
						))}
					</div>
				</div>
			{user.role === 'ADMIN' && (
				<div>
					<span className="text-xs uppercase tracking-widest">admin</span>
					<div className="font-medium text-cove pt-4 space-y-4">
						{adminNavigation.map((item) => (
							<SidebarLink to={item.href} key={item.key} Icon={item.icon}>
								{item.name}
							</SidebarLink>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default Submenu;
