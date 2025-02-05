/* eslint-disable max-len */
import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import Input from '../../../../../components/Form/Input';
import Schema from './Schema';
import Button from '../../../../../components/Button';
import { editType } from '../../../../../api/admin';

interface Values {
	text: string;
	color: string;
}

function EditType({ isOpen, setIsOpen, currentType, setReload }: any): JSX.Element {
	document.title = 'Admininstration';
	return (
		isOpen && (
			<Formik
				initialValues={currentType}
				validationSchema={Schema}
				onSubmit={async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
					const text = values.text === '' ? currentType.text : values.text;
					const color = values.color === '' ? currentType.color : values.color;
					editType(currentType.id, { oldTypeName: currentType.text, newTypeColor: color, newTypeName: text }, setReload);
					resetForm();
					setSubmitting(false);
					setIsOpen(false);
				}}
			>
				{({ isSubmitting }) => (
					<Form className="w-full max-w-sm">
						<Input label="Text" name="text" type="text" />
						<Input label="Color" name="color" type="text" />
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

export default EditType;
