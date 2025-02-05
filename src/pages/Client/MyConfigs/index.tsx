import React, { useEffect, useState, useRef } from 'react';
import { getMemberConfigs, deleteConfig } from '../../../api/client';
import Badge from '../../../components/Badge';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import * as Card from '../../../components/Card';
import * as PageTitle from '../../../components/Typography/PageTitle';
import formatDate from '../../../utils/formatDate';
import EditConfig from './EditConfig';

function MyConfigs(): JSX.Element {
	document.title = 'User Panel';
	const [data, setData] = useState([]);
	const [reload, setReload] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const configToEdit = useRef({});

	useEffect(() => {
		async function getData(): Promise<any> {
			const fetchedData = await getMemberConfigs();
			setData(fetchedData);
		}
		getData();
	}, [setData, reload]);

	const setClose = (): void => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Modal isOpen={isModalOpen} setIsOpen={setClose} title="Edit config" lazy>
				<EditConfig
					currentConfig={configToEdit.current}
					isOpen={isModalOpen}
					setIsOpen={setClose}
					setReload={setReload}
				/>
			</Modal>
			<PageTitle.Container>
				<PageTitle.Body title="My Configs" description="Here you can see your configs." />
			</PageTitle.Container>
			<Card.Card>
				{data.map((config: any) => (
					<div key={config.id} className="p-6 items-center animate-fade-in">
						<div className="flex-1 flex flex-row">
							<div>
								<div className="flex flex-row mb-2 items-center">
									<div className="flex-shrink-0 mr-2">
										<img
											className="h-10 w-10 rounded-full"
											src={`https://www.gravatar.com/avatar/${config.author.avatar}?d=retro`}
											alt="user profile picture"
										/>
									</div>
									<div className="col-span-3 flex flex-row items-center">
										<h6 className="text-white mr-2 mb-0">{config.author.username}</h6>
										<div className="mr-2 text-center">
											<Badge color="#D6BCFA">{config.type}</Badge>
										</div>
										<p className="text-sm text-cove">{formatDate(config.createdAt)}</p>
									</div>
								</div>
								<div className="flex flex-row items-center mb-2">
									<h5 className="text-white mb-0">{config.name}</h5>
								</div>
							</div>
							<div className="flex-1 flex items-center justify-end">
								<Button
									className="mr-2"
									size="base"
									onClick={() => {
										setIsModalOpen(true);
										configToEdit.current = config;
									}}
								>
									Edit
								</Button>
								<Button
									size="base"
									onClick={() => {
										deleteConfig(config.id, setReload);
									}}
								>
									Delete
								</Button>
							</div>
						</div>
					</div>
				))}
			</Card.Card>
			<div className="pb-7" />
		</>
	);
}

export default MyConfigs;
