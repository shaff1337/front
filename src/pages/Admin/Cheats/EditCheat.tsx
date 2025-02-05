/* eslint-disable max-len */
import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { Input, Select } from '../../../components/Form';
import Schema from './Schema';
import Button from '../../../components/Button';
import { editCheat } from '../../../api/admin';

interface Values {
	game: string;
	version: string;
	status: string;
}

function EditCheat({ isOpen, setIsOpen, currentCheat, setReload }: any): JSX.Element {
	
	document.title = 'Admininstration';
	const statuses = ['Undetected', 'Detected', 'Updating', 'Offline'];

	return (
		isOpen && (
			<Formik
				initialValues={currentCheat}
				validationSchema={Schema}
				onSubmit={async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
					const game = values.game === '' ? currentCheat.game : values.game;
					const version = values.version === '' ? currentCheat.version : values.version;
					editCheat(currentCheat.id, { game, version, status: values.status }, setReload);
					resetForm();
					setSubmitting(false);
					setIsOpen(false);
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
								Edit
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		)
	);
}

export default EditCheat;
