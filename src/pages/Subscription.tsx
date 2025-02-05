import React, { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import classNames from '../utils/classNames';
import { createPayment } from '../api/user';
import * as PageTitle from '../components/Typography/PageTitle';

const SubscriptionData = [
	{ id: '0', label: 'basic', days: '30', value: '5' },
	{ id: '1', label: 'essential', days: '90', value: '9' },
	{ id: '2', label: 'premium', days: '365', value: '14' },
];

function Subscription(): JSX.Element {
	const [plan, setPlan] = useState('essential');

	const checkoutHandler = (): void => {
		const { id } = SubscriptionData.filter((item) => item.label === plan)[0];
		createPayment({ id });
	};

	return (
		<>
			<PageTitle.Container>
				<PageTitle.Body
					title="Purchase"
					description="By purchasing our service you are accepting our terms of service."
				/>
				<PageTitle.Action onClick={checkoutHandler}>Checkout</PageTitle.Action>
			</PageTitle.Container>

			<div className="flex flex-col space-y-7 animate-fade-in">
				<RadioGroup value={plan} onChange={setPlan} className="grid grid-cols-1 lg:grid-cols-3 gap-2">
					{SubscriptionData.map((subscription) => (
						<RadioGroup.Option value={subscription.label} key={subscription.label}>
							{({ checked }) => (
								<div className={classNames(checked ? 'active' : 'inactive', 'radio')}>
									<div className={checked ? 'flex justify-between items-center' : ''}>
										<div className="text-sm">
											<h5
												className={classNames(
													checked ? 'active' : 'inactive',
													'capitalize mb-0'
												)}
											>
												{subscription.label}
											</h5>
											<p className={classNames(checked ? 'active' : 'inactive')}>
												<span>${subscription.value}</span>
												<span aria-hidden="true"> · </span>
												<span>{subscription.days} days</span>
											</p>
										</div>
										{checked && (
											<div className="shrink-0 text-blue-300">
												<svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
													<circle cx="12" cy="12" r="12" fill="currentColor" opacity="1" />
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
		</>
	);
}

export default Subscription;
