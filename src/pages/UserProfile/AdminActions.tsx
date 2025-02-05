import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Button from '../../components/Button';
import classNames from '../../utils/classNames';
import Modal from '../../components/Modal';
import ChangePassword from './Forms/ChangePassword';
import ChangeEmail from './Forms/ChangeEmail';
import ChangeRole from './Forms/ChangeRole';
import ChangeVerification from './Forms/ChangeVerification';
import BanUnban from './Forms/BanUnban';

function AdminActions({ profileInfo }: any): JSX.Element {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalTitle, setModalTitle] = useState('Unknown');
	const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
	const [isChangeEmailOpen, setIsChangeEmailOpen] = useState(false);
	const [isChangeRoleOpen, setIsChangeRoleOpen] = useState(false);
	const [isChangeVerificationOpen, setIsChangeVerificationOpen] = useState(false);
	const [isBanUnbanOpen, setIsBanUnbanOpen] = useState(false);

	// const adminActionList = [
	// 	{ name: 'Set Subscription', href: '/account' },
	// 	{ name: 'Reset HWID', href: '/account' },
	// 	{ name: 'Ban', href: '#' },
	// 	{ name: 'Unban', href: '#' },
	// ];

	const adminActionList = [
		{
			id: 1,
			name: 'Change Password',
			onClick: () => {
				setModalTitle('Change Password');
				setIsModalOpen(true);
				setIsChangePasswordOpen(true);
			},
		},
		{
			id: 2,
			name: 'Change Email',
			onClick: () => {
				setModalTitle('Change Email');
				setIsModalOpen(true);
				setIsChangeEmailOpen(true);
			},
		},
		{
			id: 3,
			name: 'Change Role',
			onClick: () => {
				setModalTitle('Change Role');
				setIsModalOpen(true);
				setIsChangeRoleOpen(true);
			},
		},
		{
			id: 4,
			name: 'Change Verification',
			onClick: () => {
				setModalTitle('Change Verification');
				setIsModalOpen(true);
				setIsChangeVerificationOpen(true);
			},
		},
		{
			id: 5,
			name: 'Ban/Unban',
			onClick: () => {
				setModalTitle('Ban/Unban');
				setIsModalOpen(true);
				setIsBanUnbanOpen(true);
			},
		},
	];

	const setClose = () => {
		setIsModalOpen(false);
		setIsChangePasswordOpen(false);
		setIsChangeEmailOpen(false);
		setIsChangeRoleOpen(false);
		setIsChangeVerificationOpen(false);
		setIsBanUnbanOpen(false);
	};

	return (
		<>
			<Modal isOpen={isModalOpen} setIsOpen={setClose} title={modalTitle} lazy>
				<ChangePassword
					username={profileInfo.username}
					isOpen={isChangePasswordOpen}
					setIsOpen={setClose}
				/>
				<ChangeEmail
					username={profileInfo.username}
					isOpen={isChangeEmailOpen}
					setIsOpen={setClose}
				/>
				<ChangeRole
					username={profileInfo.username}
					isOpen={isChangeRoleOpen}
					setIsOpen={setClose}
				/>
				<ChangeVerification
					username={profileInfo.username}
					isOpen={isChangeVerificationOpen}
					setIsOpen={setClose}
				/>
				<BanUnban
					username={profileInfo.username}
					banned={profileInfo.ban}
					isOpen={isBanUnbanOpen}
					setIsOpen={setClose}
				/>
			</Modal>

			<div className="flex justify-end items-center">
				<Menu as="div" className="relative">
					<Menu.Button as="div">
						<Button size="base" disabled={profileInfo.isLoading} className="inline-flex">
							Actions
							<ChevronDownIcon className="ml-2 h-5 w-5" />
						</Button>
					</Menu.Button>
					<Menu.Items className="absolute z-10 right-0 mt-2 w-48 rounded-md border border-accent shadow-lg bg-secondary p-2">
						{adminActionList.map((item) => (
							<Menu.Item key={item.id}>
								{({ active }) => (
									<button
										type="button"
										onClick={item.onClick}
										className={classNames(
											active ? 'bg-accent text-white' : 'text-cove',
											'rounded-md hover:no-underline block p-2 text-sm text-left font-medium w-full',
										)}
									>
										{item.name}
									</button>
								)}
							</Menu.Item>
						))}
					</Menu.Items>
				</Menu>
			</div>
		</>

	);
}

export default AdminActions;
