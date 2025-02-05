import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik, FormikHelpers } from 'formik';
import { Checkbox, Input } from '../../../components/Form';
import Button from '../../../components/Button';
import Schema, { SchemaNoInvite } from './Schema';
import { signUp, getPanel } from '../../../api/auth';

interface Values {
	username: string;
	email: string;
	password: string;
	code: string;
	acceptedTos: boolean;
}

function SignUp(): JSX.Element {
	document.title = 'Sign-up';
	const navigate = useNavigate();
	const [panel, setPanel] = useState({});

	useEffect(() => {
		const getData: any = async () => {
			const fetchedData = await getPanel();
			setPanel(fetchedData.invites);
		};
		getData();
	}, [setPanel]);

	return (
		<Formik
			initialValues={{
				username: '',
				email: '',
				password: '',
				code: '',
				acceptedTos: false,
			}}
			validationSchema={panel ? Schema : SchemaNoInvite}
			onSubmit={async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
				await signUp(values, navigate, !panel);
				resetForm();
				setSubmitting(false);
			}}
		>
			{({ isSubmitting }) => (
				<Form className="w-full max-w-sm http://localhost:3000/">
					<Input label="Username" name="username" type="text" />
					<Input label="Email" name="email" type="email" />
					<Input label="Password" name="password" type="password" />
					<Input label="Invite Code" name="code" type="text" disabled={!panel} />
					<Checkbox id="acceptedTos" name="acceptedTos">
						I accept the{' '}
						<Link to="tos" className="underline">
							terms of service
						</Link>
					</Checkbox>
					<div className="flex justify-end pt-2">
						<Button size="lg" isSubmitting={isSubmitting} type="submit">
							Sign Up
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}

export default SignUp;
