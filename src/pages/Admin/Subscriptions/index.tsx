import React, { useEffect, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import Schema from './Schema';
import { Select, Input } from '../../../components/Form';
import * as PageTitle from '../../../components/Typography/PageTitle';
import Button from '../../../components/Button';
import { extendSubscription, getAllUsers } from '../../../api/admin';

interface Values {
	username: string;
	time: number;
}

const initialValues: Values = {
	username: 'Select user',
	time: 1,
};

function SubscriptionsHandout(): JSX.Element {
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
		<>
			<PageTitle.Container>
				<PageTitle.Body
					title="Handout subscriptions"
					description="You can handout subscriptions to users here."
				/>
			</PageTitle.Container>

			<Formik
				initialValues={initialValues}
				validationSchema={Schema}
				onSubmit={async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
					extendSubscription(values.username, { time: values.time });
					resetForm();
					setSubmitting(false);
				}}
			>
				{({ isSubmitting }) => (
					<Form className="w-full max-w-sm animate-fade-in">
						<Select label="User" name="username">
							{data.map((user: any) => (
								<option key={user.id}>{user.username}</option>
							))}
						</Select>
						<Input label="Days" name="time" type="number" />
						<div className="flex justify-end pt-2">
							<Button size="lg" type="submit" isSubmitting={isSubmitting}>
								Submit
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}

export default SubscriptionsHandout;
