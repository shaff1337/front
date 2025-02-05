import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { Input } from '../../../../components/Form';
import { setEmail } from '../../../../api/user';
import { refreshUser } from '../../../../hooks/user';
import Button from '../../../../components/Button';
import Schema from './Schema';

interface Values {
	email: string;
	confirmEmail: string;
}

function ChangeEmail({ isOpen, setIsOpen, setUser }: any): JSX.Element {
	return (isOpen
		&& (
			<Formik
				initialValues={{
					email: '',
					confirmEmail: '',
				}}
				validationSchema={Schema}
				onSubmit={async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
					await setEmail(values);
					refreshUser(setUser);
					resetForm();
					setSubmitting(false);
					setIsOpen(false); // Close modal
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Input label="New email" name="email" type="text" />
						<Input label="Confirm new email" name="confirmEmail" type="text" />
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
