/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Table from '../../../../../components/Table';
import Badge from '../../../../../components/Badge';
import Input from '../../../../../components/Form/Input';
import Button from '../../../../../components/Button';
import Modal from '../../../../../components/Modal';
import { getTypes, deleteType, createType } from '../../../../../api/admin';
import Schema from './Schema';
import EditType from './EditType';

interface Values {
	text: string;
	color: string;
}

function ManageTypes(): JSX.Element {
	document.title = 'Admininstration';
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [types, setTypes] = useState([]);
	const [reload, setReload] = useState(0);
	const initialValues: Values = {
		text: 'Text',
		color: '#FFCCCC',
	};
	const typeToEdit = useRef({});

	useEffect(() => {
		const getData: any = async () => {
			const fetchedData = await getTypes();
			setTypes(fetchedData);
		};
		getData();
	}, [setTypes, reload]);

	const setClose = (): void => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Modal isOpen={isModalOpen} setIsOpen={setClose} title="Edit type" lazy>
				<EditType
					currentType={typeToEdit.current}
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
									<Table.Th>Type</Table.Th>
									<Table.Th>Actions</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{types.map((type: any) => (
									<Table.Tr key={type.id}>
										<Table.Td>
											<Badge color={type.color}>{type.text}</Badge>
										</Table.Td>
										<Table.Td>
											<a
												className="mr-2"
												href="#"
												onClick={() => {
													deleteType(type.id, setReload);
												}}
											>
												Delete
											</a>
											<a
												href="#"
												onClick={() => {
													typeToEdit.current = type;
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
							createType(values, setReload);
							resetForm();
							setSubmitting(false);
						}}
					>
						{({ isSubmitting }) => (
							<Form className="w-full max-w-sm">
								<Input label="Text" name="text" type="text" />
								<Input label="Color" name="color" type="text" />
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
