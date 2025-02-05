/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, getUsersPages } from '../api/panel';
import * as Card from '../components/Card';
import formatDate from '../utils/formatDate';
import Badge from '../components/Badge';
import * as PageTitle from '../components/Typography/PageTitle';
import classNames from '../utils/classNames';
import Skeleton from '../components/Skeleton';

function Announcements(): JSX.Element {
	const pageCount = useRef(0);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);

	useEffect(() => {
		async function getData(): Promise<any> {
			const fetchedData = await getUsers(page);
			setData(fetchedData);
		}
		getData();
	}, [setData, page]);
	useEffect(() => {
		const getData: any = async () => {
			const pages = await getUsersPages();
			pageCount.current = pages;
		};
		getData();
	}, [pageCount]);

	return (
		<>
			<PageTitle.Container>
				<PageTitle.Body title="Members" description="Here you can see all members." />
			</PageTitle.Container>
			<Card.Card>
				{data.map((user: any) => (
					<div
						className="flex items-center p-6 animate-fade-in"
						key={user.id}
						onClick={() => {
							window.location.replace(`/id/${user.username}/`);
						}}
					>
						<div className="flex-shrink-0">
							<Skeleton isLoading={user.isLoading} type="image" className="h-10 w-10">
								<img className="h-10 w-10 rounded-full" src={`https://www.gravatar.com/avatar/${user.avatar}?d=retro`} alt="user profile picture" />
							</Skeleton>
						</div>

						<div className="ml-3 space-y-0.5 flex-grow">
							<div className={classNames(user.isLoading ? 'w-1/3' : '', 'text-base font-medium flex items-center')}>
								<Skeleton isLoading={user.isLoading}>
									<h5 className="title text-xl inline-block mb-0 mr-2">{user.username}</h5>
									{user.ban
										? (<Badge color="#FFCCCC">BANNED</Badge>) : (<Badge color="#D6BCFA">{user.role}</Badge>)}
								</Skeleton>
							</div>
							<div className={classNames(user.isLoading ? 'w-3/5' : '', 'text-sm font-medium text-cove')}>
								<Skeleton isLoading={user.isLoading}>
									<p className="text-sm">
										UID:
										{' '}
										{user.id}
										{' '}
										/
										{' '}
										{formatDate(user.createdAt)}
									</p>
								</Skeleton>
							</div>
						</div>
					</div>
				))}
			</Card.Card>
			<nav
				className="py-3 flex items-center justify-between text-cove"
				aria-label="Pagination"
			>
				<div className="hidden sm:block">
					<p className="text-sm">
						Showing page
						{' '}
						<span className="font-medium">{page + 1}</span>
						{' '}
						of
						{' '}
						<span className="font-medium">{pageCount.current + 1}</span>
						{' '}
						pages
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

export default Announcements;
