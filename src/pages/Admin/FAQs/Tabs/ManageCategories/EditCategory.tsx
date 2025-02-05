/* eslint-disable max-len */
import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import Input from '../../../../../components/Form/Input';
import Schema from './Schema';
import Button from '../../../../../components/Button';
import { editFAQGroup } from '../../../../../api/admin';

interface Values {
	name: string;
}

function EditCategory({ isOpen, setIsOpen, currentCategory, setReload }: any): JSX.Element {
	document.title = 'Admininstration';
	return (
		isOpen && (
			<Formik
				initialValues={currentCategory}
				validationSchema={Schema}
				onSubmit={async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
					const name = values.name === '' ? currentCategory.text : values.name;
					editFAQGroup(
						{ newName: name, oldName: currentCategory.name },
						setReload,
					);
					resetForm();
					setSubmitting(false);
					setIsOpen(false);
				}}
			>
				{({ isSubmitting }) => (
					<Form className="w-full max-w-sm">
						<Input label="Name" name="name" type="text" />
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

export default EditCategory;
