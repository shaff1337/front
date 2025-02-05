import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import * as PageTitle from '../../../components/Typography/PageTitle';
import classNames from '../../../utils/classNames';
import * as Tabs from './Tabs';

const tabs = [
	{ name: 'Configs', key: 'configs' },
	{ name: 'Scripts', key: 'scripts' },
	{ name: 'Subscribed', key: 'subscribed' },
];

function Invites(): JSX.Element {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [selectedTab, setSelectedTab] = useState('configs');

	return (
		<>
			<PageTitle.Container>
				<PageTitle.Body title="Configs" description="Here you can see all configs." />
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
							<Tabs.Configs />
						</Tab.Panel>

						<Tab.Panel>
							<Tabs.Scripts />
						</Tab.Panel>

						<Tab.Panel>
							<Tabs.Subscribed />
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
			</div>
		</>
	);
}

export default Invites;
