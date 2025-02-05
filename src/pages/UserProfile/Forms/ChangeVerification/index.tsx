import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import Button from '../../../../components/Button';
import Schema from './Schema';
import { Select } from '../../../../components/Form';
import { setVerified } from '../../../../api/admin';

interface Values {
	isVerified: boolean;
}

function ChangeVerification({ isOpen, setIsOpen, username }: any): JSX.Element {
	return (isOpen
		&& (
			<Formik
				initialValues={{ isVerified: false }}
				validationSchema={Schema}
				onSubmit={async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
					await setVerified(username, values);
					resetForm();
					setSubmitting(false);
					setIsOpen(false); // Close modal
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Select label="Verification" name="isVerified">
							<option value="false">Unverified</option>
							<option value="true">Verified</option>
						</Select>

						<div className="flex justify-end pt-2">
							<Button size="lg" type="submit" isSubmitting={isSubmitting}>
								Change Verification
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		)
	);
}

export default ChangeVerification;
