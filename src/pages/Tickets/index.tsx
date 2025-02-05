import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/outline';
import Badge1 from "../../components/Badge";
import * as Table1 from '../../components/Table';
import * as PageTitle1 from '../../components/Typography/PageTitle';
import { useUser } from '../../hooks/user';


 const data = [
 	{ id: '000000000001', subject: 'Can not purchase software', createdAt: '1 Jan 2022', status: 'open' },
 	{ id: '000000000002', subject: 'Changed PC, need hwid reset', createdAt: '21 Feb 2021', status: 'open' },
	{ id: '000000000003', subject: 'Software crashing on inject', createdAt: '9 Dec 2020', status: 'closed' },
];

function Tickets(): JSX.Element {

	return (
		<>
			<PageTitle1.Container>
				<PageTitle1.Body
					title="Ticket History"
					description="Here are all of your support request that you already sent."
				/>
				<PageTitle1.Action>Create</PageTitle1.Action>
			</PageTitle1.Container>
			<div className="flex flex-col space-y-7 animate-fade-in">
				<Table1.Table>
					<Table1.Thead>
						<Table1.Tr>
							<Table1.Th>Ticket ID</Table1.Th>
							<Table1.Th>Subject</Table1.Th>
							<Table1.Th>Submitted</Table1.Th>
							<Table1.Th className="text-center">Status</Table1.Th>
							<Table1.Th className="relative">
								<span className="sr-only">View</span>
							</Table1.Th>
						</Table1.Tr>
					</Table1.Thead>
					<Table1.Tbody>
					{data.map((ticket) => (
							<Table1.Tr key={ticket.id}>
								<Table1.Td className="font-medium">{ticket.id}</Table1.Td>
								<Table1.Td className="text-blue-100">{ticket.subject}</Table1.Td>
								<Table1.Td>{ticket.createdAt}</Table1.Td>
								<Table1.Td className="text-center">
									<Badge1 color={ticket.status === 'open' ? '#9AE6B4' : '#FFCCCC'}>
										{ticket.status}
									</Badge1>
								</Table1.Td>
								<Table1.Td>
									<Link to={`/ticket/${ticket.id}`}>
										<ChevronRightIcon className="h-5 ml-auto" />
									</Link>
								</Table1.Td>
							</Table1.Tr>
						))}
					</Table1.Tbody>
				</Table1.Table>
			</div>
		</>
	);
}

export default Tickets;
