/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as PageTitle from '../../../components/Typography/PageTitle';
import * as Table from '../../../components/Table';
import Badge from '../../../components/Badge';
import { getUsers, getUsersPages } from '../../../api/panel';
import formatDate from '../../../utils/formatDate';

function Users(): JSX.Element {
	document.title = 'Admininstration';

	const pageCount = useRef(0);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);

	useEffect(() => {
		const getData: any = async () => {
			const fetchedData = await getUsers(page);
			setData(fetchedData);
		};
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
				<PageTitle.Body title="User List" description="You have full control to manage users here." />
			</PageTitle.Container>

			<div className="flex flex-col space-y-7 animate-fade-in">
				<div>
					<Table.Table>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>User</Table.Th>
								<Table.Th>Role</Table.Th>
								<Table.Th>Subscription</Table.Th>
								<Table.Th className="relative"><span className="sr-only">View</span></Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{data.map((user: any) => (
								<Table.Tr key={user.id}>
									<Table.Td className="">
										<div className="flex">
											<img className="h-10 w-10 rounded-full" src={`https://www.gravatar.com/avatar/${user.avatar}?d=retro`} alt="" />
											<div className="ml-3 flex flex-col justify-center">
												<p className="text-sm font-medium text-blue-100">{user.username}</p>
												<p className="text-xs">{user.email}</p>
											</div>
										</div>
									</Table.Td>
									<Table.Td>{user.role}</Table.Td>
									<Table.Td>
										<p className="text-xs">{formatDate(user.subscription)}</p>
									</Table.Td>
									<Table.Td className="text-right">
										<Link to={`/id/${user.username}`} className="font-medium">View</Link>
									</Table.Td>
								</Table.Tr>
							))}
						</Table.Tbody>
					</Table.Table>
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
				</div>
			</div>
		</>
	);
}

export default Users;
