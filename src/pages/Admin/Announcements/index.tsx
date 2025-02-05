import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import * as PageTitle from '../../../components/Typography/PageTitle';
import classNames from '../../../utils/classNames';
import * as Tabs from './Tabs';

const tabs = [
	{ name: 'Announcements', key: 'announcements' },
	{ name: 'Create announcement', key: 'createAnnouncement' },
	{ name: 'Manage announcement types', key: 'manageTypes' },
];

function Announcements(): JSX.Element {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [selectedTab, setSelectedTab] = useState('announcements');
	document.title = 'Admininstration';
	return (
		<>
			<PageTitle.Container>
				<PageTitle.Body title="Manage Announcements" description="You have full control to manage announcements." />
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
							<Tabs.Announcements />
						</Tab.Panel>

						<Tab.Panel>
							<Tabs.CreateAnnouncement />
						</Tab.Panel>

						<Tab.Panel>
							<Tabs.ManageTypes />
						</Tab.Panel>

					</Tab.Panels>

				</Tab.Group>
			</div>
		</>
	);
}

export default Announcements;
