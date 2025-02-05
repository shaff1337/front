/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { getFAQsByGroup, getFAQGroups } from '../api/panel';
import * as Card from '../components/Card';
import * as PageTitle from '../components/Typography/PageTitle';

function FAQs(): JSX.Element {
	const [faqs, setFaqs] = useState([]);
	const [groups, setGroups] = useState([{ id: 0, name: 'Name' }]);
	const [selectedGroup, setSelectedGroup] = useState('Name');

	useEffect(() => {
		async function getData(): Promise<any> {
			const fetchedData = await getFAQGroups();
			setSelectedGroup(fetchedData[0].name);
			setGroups(fetchedData);
		}
		getData();
	}, [setGroups]);
	useEffect(() => {
		async function getData(): Promise<any> {
			const fetchedData = await getFAQsByGroup(selectedGroup);
			setFaqs(fetchedData);
		}
		getData();
	}, [setFaqs, selectedGroup]);

	return (
		<>
			<PageTitle.Container>
				<PageTitle.Body title="FAQ" description="Here you can get answers to your questions." />
			</PageTitle.Container>
			<div className="flex flex-row animate-fade-in">
				<div className="w-52">
					{groups.map((group) => (
						<button
							type="button"
							key={group.id}
							onClick={() => setSelectedGroup(group.name)}
							className={`flex text-sm ${
								selectedGroup === group.name ? 'text-blue-300' : ''
							} hover:text-blue-300 hover:no-underline group mb-1 p-2 bg-secondary border-accent rounded w-full`}
							style={{ borderWidth: '1px' }}
						>
							<p className="tracking-wide">{group.name}</p>
						</button>
					))}
				</div>
				<div className="ml-3 flex-1">
					<Card.Card>
						{faqs.map((faq: any) => (
							<div key={faq.id} className="p-6 items-center">
								<div className="flex-1">
									<div className="flex flex-row mb-2">
										<p className="text-white mr-1">Q:</p>
										<p className="whitespace-pre-wrap text-white">{faq.question}</p>
									</div>
									<div className="flex flex-row">
										<p className="text-white mr-1">A:</p>
										<p className="whitespace-pre-wrap">{faq.answer}</p>
									</div>
								</div>
							</div>
						))}
					</Card.Card>
				</div>
			</div>
		</>
	);
}

export default FAQs;
