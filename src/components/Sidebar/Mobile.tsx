import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Submenu from './Submenu';
import { IUser } from '../../hooks/user/IUser';

interface Prop {
	sidebarOpen: boolean;
	setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
	user: IUser;
}

function Mobile({ sidebarOpen, setSidebarOpen, user } : Prop): JSX.Element {
	return (
		<Transition.Root show={sidebarOpen} as={Fragment}>
			<Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
				<Transition.Child
					as={Fragment}
					enter="transition-opacity ease-linear duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75" />
				</Transition.Child>
				<Transition.Child
					as={Fragment}
					enter="transition ease-in-out duration-300 transform"
					enterFrom="-translate-x-full"
					enterTo="translate-x-0"
					leave="transition ease-in-out duration-300 transform"
					leaveFrom="translate-x-0"
					leaveTo="-translate-x-full"
				>
					<div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 bg-main">
						<Transition.Child
							as={Fragment}
							enter="ease-in-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in-out duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="absolute top-0 right-0 -mr-12 pt-2" />
						</Transition.Child>

						<div className="flex-1 h-0 overflow-y-auto">
							<nav className="px-4 space-y-1">
								{/* Render Sidebar links */}
								<Submenu user={user} />
							</nav>
						</div>

					</div>
				</Transition.Child>
				<div className="flex-shrink-0 w-14" aria-hidden="true">
					{/* Dummy element to force Sidebar to shrink to fit close icon */}
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export default Mobile;
