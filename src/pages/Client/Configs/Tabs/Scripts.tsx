/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getConfigs, getConfigPages, createSubscribedConfig } from '../../../../api/client';
import Badge from '../../../../components/Badge';
import Button from '../../../../components/Button';
import * as Card from '../../../../components/Card';
import formatDate from '../../../../utils/formatDate';

function Scripts(): JSX.Element {
	document.title = 'User Panel';
	const pageCount = useRef(0);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);

	useEffect(() => {
		async function getData(): Promise<any> {
			const fetchedData = await getConfigs(page, 'SCRIPT');
			setData(fetchedData);
		}
		getData();
	}, [setData, page]);
	useEffect(() => {
		const getData: any = async () => {
			const pages = await getConfigPages();
			pageCount.current = pages;
		};
		getData();
	}, [pageCount]);

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
											src={`https://www.gravatar.com/avatar/${config.author.avatar}?d=retro`}
											alt="user profile picture"
										/>
									</div>
									<div className="col-span-3 flex flex-row items-center">
										<h6 className="text-white mr-2 mb-0">{config.author.username}</h6>
										<div className="mr-2 text-center">
											<Badge color="#D6BCFA">{config.type}</Badge>
										</div>
										<p className="text-sm text-cove">{formatDate(config.updatedAt)}</p>
									</div>
								</div>
								<div className="flex flex-row items-center mb-2">
									<h5 className="text-white mb-0">{config.name}</h5>
								</div>
							</div>
							<div className="flex-1 flex items-center justify-end">
								<Button
									size="base"
									onClick={() => {
										createSubscribedConfig({ id: config.id });
									}}
								>
									Subscribe
								</Button>
							</div>
						</div>
					</div>
				))}
			</Card.Card>
			<nav className="py-3 flex items-center justify-between text-cove" aria-label="Pagination">
				<div className="hidden sm:block">
					<p className="text-sm">
						Showing page <span className="font-medium">{page + 1}</span> of{' '}
						<span className="font-medium">{pageCount.current + 1}</span> pages
					</p>
				</div>
				<div className="flex-1 flex justify-between sm:justify-end">
					<Link
						to="#"
						onClick={() => {
							setPage((prevState) => {
								if (prevState !== 0) {
									return prevState - 1;
								}
								return 0;
							});
						}}
						className="relative inline-flex items-center px-4 py-2 text-sm font-medium hover:no-underline"
					>
						Previous
					</Link>
					<Link
						to="#"
						onClick={() => {
							setPage((prevState) => {
								if (prevState < pageCount.current) {
									return prevState + 1;
								}
								return prevState;
							});
						}}
						className="text-cove section ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium hover:no-underline"
					>
						Next
					</Link>
				</div>
			</nav>
		</>
	);
}

export default Scripts;
