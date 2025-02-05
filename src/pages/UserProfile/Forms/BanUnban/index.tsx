import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import Schema from './Schema';
import Button from '../../../../components/Button';
import Textarea from '../../../../components/Form/Textarea';
import { createBan, deleteBan } from '../../../../api/admin';

interface Values {
	reason?: string;
}

function BanUnban({ isOpen, setIsOpen, banned, username }: any): JSX.Element {
	return (
		isOpen && (
			<Formik
				initialValues={{}}
				validationSchema={Schema}
				onSubmit={async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
					if (!banned) {
						await createBan(username, values);
					} else {
						await deleteBan(username);
					}
					resetForm();
					setSubmitting(false);
					setIsOpen(false); // Close modal
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						{!banned ? <Textarea label="Reason" name="reason" rows={4} /> : null}
						<div className="flex justify-end pt-2 animate-fade-in">
							<Button size="lg" type="submit" isSubmitting={isSubmitting}>
								{banned ? 'Unban' : 'Ban'}
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		)
	);
}

export default BanUnban;
