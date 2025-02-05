/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import Schema from './Schema';
import { Select, Textarea, Input } from '../../../../../components/Form';
import Button from '../../../../../components/Button';
import { createAnnouncement, getTypes } from '../../../../../api/admin';

interface Values {
	type: string;
	title: string;
	text: string;
}

const initialValues: Values = {
	type: '#c22d2d',
	title: 'Title',
	text: 'Text',
};

function CreateAnnouncement(): JSX.Element {
	document.title = 'Admininstration';
	const [data, setData] = useState([{ text: 'default', color: '#c22d2d' }]);

	useEffect(() => {
		const getData: any = async () => {
			const fetchedData = await getTypes();
			initialValues.type = fetchedData[0].text;
			setData(fetchedData);
		};
		getData();
	}, [setData]);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={Schema}
			onSubmit={async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
				const type = data.filter((item) => item.text === values.type)[0];
				createAnnouncement({
					title: values.title,
					text: values.text,
					typeName: type.text,
					typeColor: type.color,
				});
				resetForm();
				setSubmitting(false);
			}}
		>
			{({ isSubmitting }) => (
				<Form className="w-full max-w-sm">
					<Select
						label="Type"
						name="type"
					>
						{data.map((type: any) => (
							<option key={type.id}>{type.text}</option>
						))}
					</Select>
					<Input label="Title" name="title" type="text" />
					<Textarea rows={3} label="Text" name="text" type="text" />
					<div className="flex justify-end pt-2">
						<Button size="lg" type="submit" isSubmitting={isSubmitting}>
							Create
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}

export default CreateAnnouncement;
