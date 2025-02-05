import React, { Fragment } from 'react';
import { MenuAlt2Icon } from '@heroicons/react/outline';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { Menu, Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from '../utils/classNames';
import Skeleton from './Skeleton';
import {Command} from 'lucide-react';
import { signOut } from '../api/user';
import { IUser } from '../hooks/user/IUser';

interface Prop {
	setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
	user: IUser;
}

function Navbar({ setSidebarOpen, user }: Prop): JSX.Element {
	const navigate = useNavigate();

	const userNavigation = [
		{ name: 'Your Profile', href: `/id/${user.username}` },
		{ name: 'My Account', href: '/account' },
	];

	return (
		<div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-main bg-opacity-50 backdrop-blur backdrop-filter firefox:bg-opacity-90 border-b border-accent">
			<div className="max-w-7xl mx-auto flex-1 px-4 flex justify-between">

				<button
					type="button"
					className="text-cove md:hidden"
					onClick={() => setSidebarOpen(true)}
				>
					<span className="sr-only">Open sidebar</span>
					<MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
				</button>

				<div className="flex items-center">
					<Command />
					
				</div>

				<div className="flex items-center">
					{/* Profile dropdown */}
					<Menu as="div" className="relative">
						<div>
							<Menu.Button className="max-w-xs bg-secondary flex items-center text-sm rounded-full">
								<span className="sr-only">Open user menu</span>
								<Skeleton isLoading={user.isLoading} type="image" className="h-8 w-8">
									<img
										className="h-8 w-8 rounded-full"
										src={user.avatar}
										alt="user-icon"
									/>
								</Skeleton>
							</Menu.Button>
						</div>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg p-2 bg-secondary">
								{/* User Info Section */}
								<div className="px-3 py-2 border-b border-gray-700/50">
									<div className="flex items-center space-x-2">
										<img
											className="h-6 w-6 rounded-full"
											src={user?.avatar || 'https://ui-avatars.com/api/?name=' + user?.email}
											alt=""
										/>
										<p className="text-xs font-medium text-gray-200 truncate">
											{user?.username}
										</p>
									</div>
								</div>

								{/* Navigation Items */}
								{userNavigation.map((item) => (
									<Menu.Item key={item.name}>
										{({ active }) => (
											<Link
												to={item.href}
												className={classNames(
													active ? 'bg-accent text-white' : 'text-cove',
													'rounded-md hover:no-underline block p-2 text-sm font-medium',
												)}
											>
												{item.name}
											</Link>
										)}
									</Menu.Item>
								))}

								<button
									type="button"
									onClick={() => signOut(navigate)}
									className="w-full inline-flex justify-between items-center rounded-md hover:no-underline block p-2 font-medium text-sm text-left text-cove hover:bg-accent hover:text-white"
								>
									Sign Out
									<ChevronRightIcon className="ml-2 w-4" />
								</button>
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
