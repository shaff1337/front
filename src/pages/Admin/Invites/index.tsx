import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import * as PageTitle from '../../../components/Typography/PageTitle';
import classNames from '../../../utils/classNames';
import * as Tabs from './Tabs';

const tabs = [
	{ name: 'Invites', key: 'invites' },
	{ name: 'User handout', key: 'userHandout' },
	{ name: 'Group handout', key: 'groupHandout' },
];

function Invites(): JSX.Element {
	document.title = 'Admininstration';
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [selectedTab, setSelectedTab] = useState('invites');

	return (
		<>
			<PageTitle.Container>
				<PageTitle.Body title="Manage Invites" description="You have full control to manage invites." />
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
							<Tabs.Invites />
						</Tab.Panel>

						<Tab.Panel>
							<Tabs.UserHandout />
						</Tab.Panel>

						<Tab.Panel>
							<Tabs.GroupHandout />
						</Tab.Panel>

					</Tab.Panels>

				</Tab.Group>
			</div>
		</>
	);
}

export default Invites;
