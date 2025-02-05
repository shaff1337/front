import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import * as PageTitle from '../../../components/Typography/PageTitle';
import classNames from '../../../utils/classNames';
import * as Tabs from './Tabs';

const tabs = [
	{ name: 'FAQs', key: 'faqs' },
	{ name: 'Create FAQ', key: 'createFAQ' },
	{ name: 'Manage Categories', key: 'manageCategories' },
];

function FAQs(): JSX.Element {
	document.title = 'Admininstration';
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [selectedTab, setSelectedTab] = useState('faqs');

	return (
		<>
			<PageTitle.Container>
				<PageTitle.Body title="Manage FAQs" description="You have full control to manage FAQs." />
			</PageTitle.Container>

			<div className="flex flex-col space-y-7 animate-fade-in">
				<Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>

					<Tab.List className="tabs">
						{tabs.map((tab) => (
							<Tab
								key={tab.key}
								onClick={() => setSelectedTab(tab.key)}
								className={classNames(selectedTab === tab.key ? 'active' : 'inactive', 'tabs-header')}
							>
								{tab.name}
							</Tab>
						))}
					</Tab.List>

					<Tab.Panels>

						<Tab.Panel>
							<Tabs.FAQs />
						</Tab.Panel>

						<Tab.Panel>
							<Tabs.CreateFAQ />
						</Tab.Panel>

						<Tab.Panel>
							<Tabs.ManageCategories />
						</Tab.Panel>

					</Tab.Panels>

				</Tab.Group>
			</div>
		</>
	);
}

export default FAQs;
