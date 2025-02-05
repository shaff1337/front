/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import Schema from './Schema';
import { Textarea, Select } from '../../../../../components/Form';
import Button from '../../../../../components/Button';
import { createFAQ } from '../../../../../api/admin';
import { getFAQGroups } from '../../../../../api/panel';

interface Values {
	group: string;
	question: string;
	answer: string;
}

const initialValues: Values = {
	group: 'Category',
	question: 'Question',
	answer: 'Answer',
};

function CreateFAQ(): JSX.Element {
	document.title = 'Admininstration';
	const [data, setData] = useState([]);

	useEffect(() => {
		const getData: any = async () => {
			const fetchedData = await getFAQGroups();
			initialValues.group = fetchedData[0].name;
			setData(fetchedData);
		};
		getData();
	}, [setData]);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={Schema}
			onSubmit={async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
				createFAQ(values);
				resetForm();
				setSubmitting(false);
			}}
		>
			{({ isSubmitting }) => (
				<Form className="w-full max-w-sm">
					<Select
						label="Category"
						name="group"
					>
						{data.map((group: any) => (
							<option key={group.id}>{group.name}</option>
						))}
					</Select>
					<Textarea rows={3} label="Question" name="question" type="text" />
					<Textarea rows={3} label="Answer" name="answer" type="text" />
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

export default CreateFAQ;
