/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from 'react';
import { getFAQs, deleteFAQ } from '../../../../../api/admin';
import * as PageTitle from '../../../../../components/Typography/PageTitle';
import * as Table from '../../../../../components/Table';
import Modal from '../../../../../components/Modal';
import EditFAQ from './EditFAQ';

function FAQs(): JSX.Element {
	document.title = 'Admininstration';
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [data, setData] = useState([]);
	const [reload, setReload] = useState(0);
	const faqToEdit = useRef({});

	useEffect(() => {
		const getData: any = async () => {
			const fetchedData = await getFAQs();
			setData(fetchedData);
		};
		getData();
	}, [setData, reload]);

	const setClose = (): void => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Modal isOpen={isModalOpen} setIsOpen={setClose} title="Edit FAQ" lazy>
				<EditFAQ
					currentFAQ={faqToEdit.current}
					isOpen={isModalOpen}
					setIsOpen={setClose}
					setReload={setReload}
				/>
			</Modal>

			<PageTitle.Container>
				<PageTitle.Body title="FAQs list" description="Manage FAQs here." />
			</PageTitle.Container>

			<div className="flex flex-col space-y-7">
				<div>
					<Table.Table>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Question</Table.Th>
								<Table.Th>Answer</Table.Th>
								<Table.Th>Category</Table.Th>
								<Table.Th>Delete</Table.Th>
								<Table.Th>Edit</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{data.map((faq: any) => (
								<Table.Tr key={faq.id}>
									<Table.Td className="">
										<div className="flex">
											<div className="ml-3 flex flex-col justify-center">
												<p className="text-sm font-medium text-blue-100">{faq.question}</p>
											</div>
										</div>
									</Table.Td>
									<Table.Td>
										<div className="flex">
											<div className="ml-3 flex flex-col justify-center">
												<p className="text-sm font-medium text-blue-100">{faq.answer}</p>
											</div>
										</div>
									</Table.Td>
									<Table.Td>
										<div className="flex">
											<div className="ml-3 flex flex-col justify-center">
												<p className="text-sm font-medium text-blue-100">{faq.group}</p>
											</div>
										</div>
									</Table.Td>
									<Table.Td>
										<a
											href="#"
											onClick={() => {
												deleteFAQ(faq.id, setReload);
											}}
										>
											Delete
										</a>
									</Table.Td>
									<Table.Td>
										<a
											href="#"
											onClick={() => {
												faqToEdit.current = faq;
												setIsModalOpen(true);
											}}
										>
											Edit
										</a>
									</Table.Td>
								</Table.Tr>
							))}
						</Table.Tbody>
					</Table.Table>
				</div>
			</div>
		</>
	);
}

export default FAQs;
