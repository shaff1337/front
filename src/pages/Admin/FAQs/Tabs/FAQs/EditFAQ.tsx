/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { Textarea, Select } from '../../../../../components/Form';
import Schema from './Schema';
import Button from '../../../../../components/Button';
import { editFAQ } from '../../../../../api/admin';
import { getFAQGroups } from '../../../../../api/panel';

interface Values {
	group: string;
	question: string;
	answer: string;
}

function EditFAQ({ isOpen, setIsOpen, currentFAQ, setReload }: any): JSX.Element {
	document.title = 'Admininstration';
	const [data, setData] = useState([]);

	useEffect(() => {
		const getData: any = async () => {
			const fetchedData = await getFAQGroups();
			setData(fetchedData);
		};
		getData();
	}, [setData]);

	return (
		isOpen && (
			<Formik
				initialValues={currentFAQ}
				validationSchema={Schema}
				onSubmit={async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
					const answer = values.answer === '' ? currentFAQ.answer : values.answer;
					const question = values.question === '' ? currentFAQ.question : values.question;
					editFAQ(currentFAQ.id, { question, answer, group: values.group }, setReload);
					resetForm();
					setSubmitting(false);
					setIsOpen(false);
				}}
			>
				{({ isSubmitting }) => (
					<Form className="w-full max-w-sm">
						<Select label="Category" name="group">
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
		)
	);
}

export default EditFAQ;
