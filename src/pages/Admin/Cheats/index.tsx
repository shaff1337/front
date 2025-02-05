/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as PageTitle from '../../../components/Typography/PageTitle';
import * as Table from '../../../components/Table';
import { Input, Select } from '../../../components/Form';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import { getCheats, deleteCheat, createCheat } from '../../../api/admin';
import Schema from './Schema';
import EditCheat from './EditCheat';

interface Values {
	game: string;
	version: string;
	status: string;
}

function ManageTypes(): JSX.Element {
	document.title = 'Admininstration';
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [cheats, setCheats] = useState([]);
	const [reload, setReload] = useState(0);
	const initialValues: Values = {
		game: 'Game',
		version: '1.0.0',
		status: 'Undetected',
	};
	const cheatToEdit = useRef({});
	const statuses = ['Undetected', 'Detected', 'Updating', 'Offline'];

	useEffect(() => {
		const getData: any = async () => {
			const fetchedData = await getCheats();
			setCheats(fetchedData);
		};
		getData();
	}, [setCheats, reload]);

	const setClose = (): void => {
		setIsModalOpen(false);
	};

	return (
		<>
			<PageTitle.Container>
				<PageTitle.Body
					title="Manage Cheats"
					description="You have full control to manage cheats."
				/>
			</PageTitle.Container>
			<Modal isOpen={isModalOpen} setIsOpen={setClose} title="Edit cheat" lazy>
				<EditCheat
					currentCheat={cheatToEdit.current}
					isOpen={isModalOpen}
					setIsOpen={setClose}
					setReload={setReload}
				/>
			</Modal>
			<div className="flex flex-row justify-between animate-fade-in">
				<div className="flex flex-col flex-1 space-y-7">
					<div>
						<Table.Table>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>Cheat</Table.Th>
									<Table.Th>Version</Table.Th>
									<Table.Th>Status</Table.Th>
									<Table.Th>Actions</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{cheats.map((cheat: any) => (
									<Table.Tr key={cheat.id}>
										<Table.Td>{cheat.game}</Table.Td>
										<Table.Td>{cheat.version}</Table.Td>
										<Table.Td>{cheat.status}</Table.Td>
										<Table.Td>
											<a
												className="mr-2"
												href="#"
												onClick={() => {
													deleteCheat(cheat.id, setReload);
												}}
											>
												Delete
											</a>
											<a
												href="#"
												onClick={() => {
													cheatToEdit.current = cheat;
													setIsModalOpen(true);
												}}
											>
												Edit
											</a>
										</Table.Td>
									</Table.Tr>
								))}
							</Table.Tbody>
						</Table.Table>
					</div>
				</div>
				<div className="ml-4">
					<Formik
						initialValues={initialValues}
						validationSchema={Schema}
						onSubmit={async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
							createCheat(values, setReload);
							resetForm();
							setSubmitting(false);
						}}
					>
						{({ isSubmitting }) => (
							<Form className="w-full max-w-sm">
								<Input label="Game" name="game" type="text" />
								<Input label="Version" name="version" type="text" />
								<Select label="Status" name="status">
									{statuses.map((status: string) => (
										<option key={status}>{status}</option>
									))}
								</Select>
								<div className="flex justify-end pt-2">
									<Button size="lg" type="submit" isSubmitting={isSubmitting}>
										Create
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</>
	);
}

export default ManageTypes;
