/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { RadioGroup } from '@headlessui/react';
import { editPanel, getPanel } from '../../../api/admin';
import classNames from '../../../utils/classNames';
import * as PageTitle from '../../../components/Typography/PageTitle';

function EditPanel(): JSX.Element {
	document.title = 'Admininstration';
	const states = ['ENABLED', 'DISABLED'];
	const [selectedState, setSelectedState] = useState('');
	const [panel, setPanel] = useState({ id: '0' });

	useEffect(() => {
		const getData: any = async () => {
			const fetchedData = await getPanel();
			setPanel(fetchedData);
			setSelectedState(fetchedData.invites ? 'ENABLED' : 'DISABLED');
		};
		getData();
	}, [setPanel]);

	const onChangeHandler: any = (item: string) => {
		editPanel(panel.id, { invites: selectedState === 'ENABLED' });
		setSelectedState(item);
	};

	return (
		<>
			<PageTitle.Container>
				<PageTitle.Body title="Manage Panel" description="You have full control to manage panel." />
			</PageTitle.Container>
			<div className="flex flex-row justify-between animate-fade-in">
				<div className="flex flex-col flex-1 space-y-7">
					<RadioGroup value={selectedState} onChange={onChangeHandler} className="flex-1 flex flex-row">
						{states.map((state) => (
							<RadioGroup.Option
								value={state}
								key={state}
								className={`flex flex-1 ${state === 'ENABLED' ? 'mr-1' : ''} justify-between`}
							>
								{({ checked }: any) => (
									<div className={classNames(checked ? 'active' : 'inactive', 'radio flex-1')}>
										<div className={checked ? 'flex justify-between items-center' : ''}>
											<div className="text-sm h-6 flex items-center">
												<h5
													className={classNames(
														checked ? 'active' : 'inactive',
														'capitalize mb-0',
													)}
												>
													{state}
												</h5>
											</div>
											{checked && (
												<div className="shrink-0 text-blue-300">
													<svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
														<circle
															cx="12"
															cy="12"
															r="12"
															fill="currentColor"
															opacity="1"
														/>
														<path
															d="M7 13l3 3 7-7"
															stroke="#fff"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
												</div>
											)}
										</div>
									</div>
								)}
							</RadioGroup.Option>
						))}
					</RadioGroup>
				</div>
			</div>
		</>
	);
}

export default EditPanel;
