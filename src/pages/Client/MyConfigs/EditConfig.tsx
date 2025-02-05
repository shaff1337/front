/* eslint-disable max-len */
import React, { useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { RadioGroup } from '@headlessui/react';
import Input from '../../../components/Form/Input';
import Button from '../../../components/Button';
import Schema from './Schema';
import { editConfig } from '../../../api/client';
import classNames from '../../../utils/classNames';

interface Values {
	name: string;
}

function EditConfig({ isOpen, setIsOpen, currentConfig, setReload }: any): JSX.Element {
	document.title = 'User Panel';
	const statuses = ['PUBLIC', 'PRIVATE'];
	const [selectedStatus, setSelectedStatus] = useState(currentConfig.status);

	return (
		isOpen && (
			<Formik
				initialValues={currentConfig}
				validationSchema={Schema}
				onSubmit={async (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
					const name = values.name === '' ? currentConfig.text : values.name;
					editConfig(currentConfig.id, { name, data: currentConfig.data, status: selectedStatus }, setReload);
					resetForm();
					setSubmitting(false);
					setIsOpen(false);
				}}
			>
				{({ isSubmitting }) => (
					<Form className="w-full max-w-sm">
						<Input label="Name" name="name" type="text" />
						<RadioGroup
							value={selectedStatus}
							onChange={setSelectedStatus}
							className="flex-1 flex flex-row"
						>
							{statuses.map((status) => (
								<RadioGroup.Option value={status} key={status} className={`flex-1 ${status === 'PUBLIC' ? 'mr-1' : ''}`}>
									{({ checked }: any) => (
										<div className={classNames(checked ? 'active' : 'inactive', 'radio')}>
											<div className={checked ? 'flex justify-between items-center' : ''}>
												<div className="text-sm">
													<h5
														className={classNames(
															checked ? 'active' : 'inactive',
															'capitalize mb-0',
														)}
													>
														{status}
													</h5>
												</div>
											</div>
										</div>
									)}
								</RadioGroup.Option>
							))}
						</RadioGroup>
						<div className="flex justify-end pt-2">
							<Button size="lg" type="submit" isSubmitting={isSubmitting}>
								Edit
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		)
	);
}

export default EditConfig;
