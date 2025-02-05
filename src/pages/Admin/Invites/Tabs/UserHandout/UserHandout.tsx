import React, { useEffect, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import Schema from './Schema';
import { Select, Input } from '../../../../../components/Form';
import Button from '../../../../../components/Button';
import { createInvite, getAllUsers } from '../../../../../api/admin';

interface Values {
	username: string;
	amount: number;
}

const initialValues: Values = {
	username: 'Select user',
	amount: 0,
};

function UserHandout(): JSX.Element {
	document.title = 'Admininstration';
	const [data, setData] = useState([]);

	useEffect(() => {
		const getData: any = async () => {
			const fetchedData = await getAllUsers();
			initialValues.username = fetchedData[0].username;
			setData(fetchedData);
		};
		getData();
	}, [setData]);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={Schema}
			onSubmit={async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
				createInvite(values);
				resetForm();
				setSubmitting(false);
			}}
		>
			{({ isSubmitting }) => (
				<Form className="w-full max-w-sm">
					<Select label="User" name="username">
						{data.map((user: any) => <option key={user.id}>{user.username}</option>)}
					</Select>
					<Input label="Amount" name="amount" type="number" />
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

export default UserHandout;
