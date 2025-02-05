import React, { useState } from 'react';
import * as Card from '../../../components/Card';
import SectionTitle from '../../../components/Typography/SectionTitle';
import Modal from '../../../components/Modal';

const ChangePassword = React.lazy(() => import('../Forms/ChangePassword'));
const ChangeEmail = React.lazy(() => import('../Forms/ChangeEmail'));

function Settings({ setUser }: any): JSX.Element {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalTitle, setModalTitle] = useState('Unknown');
	const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
	const [isChangeEmailOpen, setIsChangeEmailOpen] = useState(false);

	const ActionData = [
		{
			id: 1,
			title: 'Change Password',
			description: 'Set a unique password to protect your account.',
			onClick: () => {
				setModalTitle('Change Password');
				setIsModalOpen(true);
				setIsChangePasswordOpen(true);
			},
		},
		{
			id: 2,
			title: 'Change Email',
			description: 'Set a unique email to protect your account.',
			onClick: () => {
				setModalTitle('Change Email');
				setIsModalOpen(true);
				setIsChangeEmailOpen(true);
			},
		},
	];

	const setClose = () => {
		setIsModalOpen(false);
		setIsChangePasswordOpen(false);
		setIsChangeEmailOpen(false);
	};

	return (
		<>
			<Modal isOpen={isModalOpen} setIsOpen={setClose} title={modalTitle} lazy>
				<ChangePassword isOpen={isChangePasswordOpen} setIsOpen={setClose} />
				<ChangeEmail isOpen={isChangeEmailOpen} setIsOpen={setClose} setUser={setUser} />
			</Modal>

			<SectionTitle title="Security Settings" description="These settings are helps you keep your account secure." />

			<Card.Card>
				{ActionData.map((item) => (
					<Card.Container key={item.id}>
						<Card.Body title={item.title} description={item.description} />
						<Card.Action type="button" onClick={item.onClick}>{item.title}</Card.Action>
					</Card.Container>
				))}
			</Card.Card>
		</>
	);
}

export default Settings;
