/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { getSubscribedConfigs, deleteSubscribedConfig } from '../../../../api/client';
import Badge from '../../../../components/Badge';
import Button from '../../../../components/Button';
import * as Card from '../../../../components/Card';
import formatDate from '../../../../utils/formatDate';

function Subscribed(): JSX.Element {
	document.title = 'User Panel';
	const [data, setData] = useState([]);
	const [reload, setReload] = useState(0);

	useEffect(() => {
		async function getData(): Promise<any> {
			const fetchedData = await getSubscribedConfigs();
			setData(fetchedData);
		}
		getData();
	}, [setData, reload]);

	return (
		<>
			<Card.Card>
				{data.map((config: any) => (
					<div key={config.id} className="p-6 items-center">
						<div className="flex-1 flex flex-row">
							<div>
								<div className="flex flex-row mb-2 items-center">
									<div className="flex-shrink-0 mr-2">
										<img
											className="h-10 w-10 rounded-full"
											src={`https://www.gravatar.com/avatar/${config.config.author.avatar}?d=retro`}
											alt="user profile picture"
										/>
									</div>
									<div className="col-span-3 flex flex-row items-center">
										<h6 className="text-white mr-2 mb-0">{config.config.author.username}</h6>
										<div className="mr-2 text-center">
											<Badge color="#D6BCFA">{config.config.type}</Badge>
										</div>
										<p className="text-sm text-cove">{formatDate(config.createdAt)}</p>
									</div>
								</div>
								<div className="flex flex-row items-center mb-2">
									<h5 className="text-white mb-0">{config.config.name}</h5>
								</div>
							</div>
							<div className="flex-1 flex items-center justify-end">
								<Button
									size="base"
									onClick={() => {
										deleteSubscribedConfig(config.id, setReload);
									}}
								>
									Unsubscribe
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

export default Subscribed;
