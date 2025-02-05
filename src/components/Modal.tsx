import React, { Fragment, Suspense } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import SectionTitle from './Typography/SectionTitle';

interface Props {
	children: React.ReactNode;
	title: string;
	lazy?: boolean;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal(
	{
		children,
		title,
		lazy = false,
		isOpen,
		setIsOpen,
	} : Props,
): JSX.Element {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>

				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300 transform transition-transform"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-200 transform transition-transform"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300 transform transition-transform"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200 transform transition-transform"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="section w-full max-w-md transform px-6 py-4 text-left align-middle shadow-xl transition-all">
								<Dialog.Title as="div">
									<SectionTitle title={title} />
								</Dialog.Title>
								<div>
									{(lazy) ? (
										<Suspense fallback={<>Loading...</>}>
											{ children }
										</Suspense>
									) : (children)}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}

export default Modal;
