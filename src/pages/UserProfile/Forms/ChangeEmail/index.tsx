import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import Schema from './Schema';
import Button from '../../../../components/Button';
import { Input } from '../../../../components/Form';
import { setEmail } from '../../../../api/admin';

interface Values {
	email: string;
}

function ChangeEmail({ isOpen, setIsOpen, username }: any): JSX.Element {
	return (isOpen
		&& (
			<Formik
				initialValues={{ email: '' }}
				validationSchema={Schema}
				onSubmit={async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
					await setEmail(username, values);
					resetForm();
					setSubmitting(false);
					setIsOpen(false); // Close modal
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Input label="New email" name="email" type="text" />
						<div className="flex justify-end pt-2">
							<Button size="lg" type="submit" isSubmitting={isSubmitting}>
								Change Email
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		)
	);
}

export default ChangeEmail;
