import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import Schema from './Schema';
import Button from '../../../../components/Button';
import { Input } from '../../../../components/Form';
import { setPassword } from '../../../../api/user';

interface Values {
	currentPassword: string;
	password: string;
	confirmPassword: string;
}

function ChangePassword({ isOpen, setIsOpen }: any): JSX.Element {
	return (isOpen
		&& (
			<Formik
				initialValues={{
					currentPassword: '',
					password: '',
					confirmPassword: '',
				}}
				validationSchema={Schema}
				onSubmit={async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
					await setPassword(values);
					resetForm();
					setSubmitting(false);
					setIsOpen(false); // Close modal
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Input label="Your current password" name="currentPassword" type="password" />
						<Input label="New password" name="password" type="password" />
						<Input label="Confirm new password" name="confirmPassword" type="password" />
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
