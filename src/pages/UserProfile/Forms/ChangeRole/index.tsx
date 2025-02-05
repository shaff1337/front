import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import Schema from './Schema';
import Button from '../../../../components/Button';
import { Select } from '../../../../components/Form';
import { setRole } from '../../../../api/admin';

interface Values {
	role: 'USER' | 'BETA' | 'ADMIN';
}

function ChangeRole({ isOpen, setIsOpen, username }: any): JSX.Element {
	return (isOpen
		&& (
			<Formik
				initialValues={{ role: 'USER' }}
				validationSchema={Schema}
				onSubmit={async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
					await setRole(username, values);
					resetForm();
					setSubmitting(false);
					setIsOpen(false); // Close modal
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Select label="Role" name="role">
							<option>USER</option>
							<option>BETA</option>
							<option>ADMIN</option>
						</Select>

						<div className="flex justify-end pt-2">
							<Button size="lg" type="submit" isSubmitting={isSubmitting}>
								Change Role
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		)
	);
}

export default ChangeRole;
