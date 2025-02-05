import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import * as PageTitle from '../../components/Typography/PageTitle';
import { useUser } from '../../hooks/user';
import classNames from '../../utils/classNames';
import * as Tabs from './Tabs';

const tabs = [
	{ name: 'Account Info', key: 'info' },
	{ name: 'Settings', key: 'settings' },
];

function Account(): JSX.Element {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [selectedTab, setSelectedTab] = useState('info');
	const { user, setUser } = useUser();

	return (
		<>
			<PageTitle.Container>
				<PageTitle.Body title="Manage Account" description="You have full control to manage your own account setting." />
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
							<Tabs.Info user={user} />
						</Tab.Panel>

						<Tab.Panel>
							<Tabs.Settings setUser={setUser} />
						</Tab.Panel>

					</Tab.Panels>

				</Tab.Group>
			</div>
		</>
	);
}

export default Account;
