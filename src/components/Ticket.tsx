import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/outline';
import * as Table from './Table';
import Badge from './Badge';

function Ticket({ ticket }: any): JSX.Element {
	return (
		<Table.Tr key={ticket.id}>
			<Table.Td className="font-medium">{ticket.id}</Table.Td>
			<Table.Td className="text-blue-100">{ticket.subject}</Table.Td>
			<Table.Td>{ticket.createdAt}</Table.Td>
			<Table.Td className="text-center">
				<Badge color={ticket.status === 'open' ? '#9AE6B4' : '#FFCCCC'}>{ticket.status}</Badge>
			</Table.Td>
			<Table.Td>
				<Link to={`/ticket/${ticket.id}`}>
					<ChevronRightIcon className="h-5 ml-auto" />
				</Link>
			</Table.Td>
		</Table.Tr>
	);
}

export default Ticket;
