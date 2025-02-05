import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import Schema from './Schema';
import { Select, Input } from '../../../../../components/Form';
import Button from '../../../../../components/Button';
import { createGroupInvite } from '../../../../../api/admin';

interface Values {
	role: string;
	amount: number;
}

function GroupHandout(): JSX.Element {
	document.title = 'Admininstration';
	const data = ['USER', 'BETA', 'ADMIN'];
	const initialValues: Values = {
		role: 'USER',
		amount: 0,
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={Schema}
			onSubmit={async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
				createGroupInvite(values);
				resetForm();
				setSubmitting(false);
			}}
		>
			{({ isSubmitting }) => (
				<Form className="w-full max-w-sm">
					<Select label="Group" name="group">
						{data.map((role: string) => <option key={role}>{role}</option>)}
					</Select>
					<Input label="Amount" name="amount" />
					<div className="flex justify-end pt-2">
						<Button
							size="lg"
							type="submit"
							isSubmitting={isSubmitting}
						>
							Send
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}

export default GroupHandout;
