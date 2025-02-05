/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Table from '../../../../../components/Table';
import Input from '../../../../../components/Form/Input';
import Button from '../../../../../components/Button';
import Modal from '../../../../../components/Modal';
import { deleteFAQGroup, createFAQGroup } from '../../../../../api/admin';
import { getFAQGroups } from '../../../../../api/panel';
import Schema from './Schema';
import EditCategory from './EditCategory';

interface Values {
	name: string;
}

function ManageGroups(): JSX.Element {
	document.title = 'Admininstration';
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [groups, setGroups] = useState([]);
	const [reload, setReload] = useState(0);
	const initialValues: Values = { name: 'Name' };
	const categoryToEdit = useRef({});

	useEffect(() => {
		const getData: any = async () => {
			const fetchedData = await getFAQGroups();
			setGroups(fetchedData);
		};
		getData();
	}, [setGroups, reload]);

	const setClose = (): void => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Modal isOpen={isModalOpen} setIsOpen={setClose} title="Edit category" lazy>
				<EditCategory
					currentCategory={categoryToEdit.current}
					isOpen={isModalOpen}
					setIsOpen={setClose}
					setReload={setReload}
				/>
			</Modal>
			<div className="flex flex-row justify-between">
				<div className="flex flex-col flex-1 space-y-7">
					<div>
						<Table.Table>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>Category</Table.Th>
									<Table.Th>Actions</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{groups.map((category: any) => (
									<Table.Tr key={category.id}>
										<Table.Td>{category.name}</Table.Td>
										<Table.Td>
											<a
												className="mr-2"
												href="#"
												onClick={() => {
													deleteFAQGroup(category.id, setReload);
												}}
											>
												Delete
											</a>
											<a
												href="#"
												onClick={() => {
													categoryToEdit.current = category;
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
							createFAQGroup(values, setReload);
							resetForm();
							setSubmitting(false);
						}}
					>
						{({ isSubmitting }) => (
							<Form className="w-full max-w-sm">
								<Input label="Name" name="name" type="text" />
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

export default ManageGroups;
