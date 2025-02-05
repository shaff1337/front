/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getAnnouncements, getAnnouncementsPages } from '../../../../api/client';
import { deleteAnnouncement } from '../../../../api/admin'; // eto botka
import * as PageTitle from '../../../../components/Typography/PageTitle';
import * as Table from '../../../../components/Table';
import formatDate from '../../../../utils/formatDate';
import Badge from '../../../../components/Badge';

function Announcements(): JSX.Element {
	document.title = 'Admininstration';
	const pageCount = useRef(0);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const [reload, setReload] = useState(0);

	useEffect(() => {
		const getData: any = async () => {
			const fetchedData = await getAnnouncements(page);
			setData(fetchedData);
		};
		getData();
	}, [page, setData, reload]);
	useEffect(() => {
		const getData: any = async () => {
			const pages = await getAnnouncementsPages();
			pageCount.current = pages;
		};
		getData();
	}, [pageCount]);

	return (
		<>
			<PageTitle.Container>
				<PageTitle.Body title="Announcements list" description="Manage announcements here." />
			</PageTitle.Container>

			<div className="flex flex-col space-y-7">
				<div>
					<Table.Table>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Type</Table.Th>
								<Table.Th>Title</Table.Th>
								<Table.Th>Author</Table.Th>
								<Table.Th>Creation date</Table.Th>
								<Table.Th>Actions</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{data.map((announcement: any) => (
								<Table.Tr key={announcement.id}>
									<Table.Td>
										<Badge color={announcement.typeColor}>
											{announcement.typeName}
										</Badge>
									</Table.Td>
									<Table.Td className="">
										<div className="flex">
											<div className="ml-3 flex flex-col justify-center">
												<p className="text-sm font-medium text-blue-100">{announcement.title}</p>
											</div>
										</div>
									</Table.Td>
									<Table.Td>
										<Link to={`/id/${announcement.author.username}`} className="font-medium">{announcement.author.username}</Link>
									</Table.Td>
									<Table.Td>{formatDate(announcement.createdAt)}</Table.Td>
									<Table.Td>
										<a
											href="#"
											onClick={() => {
												deleteAnnouncement(announcement.id, setReload);
											}}
										>
											Delete

										</a>
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

export default Announcements;
