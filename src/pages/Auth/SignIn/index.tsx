import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../components/Form';
import Button from '../../../components/Button';
import Schema from './Schema';
import { signIn } from '../../../api/auth';

interface Values {
	username: string;
	password: string;
}

function SignIn(): JSX.Element {
	document.title = 'Sign-in';
	const navigate = useNavigate();
	const initialValues: Values = {
		username: '',
		password: '',
	};
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={Schema}
			onSubmit={async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
				await signIn(values, navigate);
				resetForm();
				setSubmitting(false);
			}}
		>
			{({ isSubmitting }) => (
				<Form className="w-full max-w-sm animate-fade-in">
					<Input label="Username" name="username" type="text" />
					<Input label="Password" name="password" type="password" />
					<div className="flex justify-end pt-2">
						<Button
							size="lg"
							type="submit"
							isSubmitting={isSubmitting}
						>
							Sign In
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}

export default SignIn;
