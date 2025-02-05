import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import Schema from './Schema';
import Button from '../../../../components/Button';
import { Input } from '../../../../components/Form';
import { setPassword } from '../../../../api/admin';

interface Values {
	password: string;
}

function ChangePassword({ isOpen, setIsOpen, username }: any): JSX.Element {
	return (isOpen
		&& (
			<Formik
				initialValues={{ password: '' }}
				validationSchema={Schema}
				onSubmit={async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
					await setPassword(username, values);
					resetForm();
					setSubmitting(false);
					setIsOpen(false); // Close modal
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Input label="New password" name="password" type="password" />
						<div className="flex justify-end pt-2">
							<Button size="lg" type="submit" isSubmitting={isSubmitting}>
								Change Password
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		)
	);
}

export default ChangePassword;
