import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as PageTitle from '../../components/Typography/PageTitle';
import Badge from '../../components/Badge';
import { useUser } from '../../hooks/user';
import useWindowSize, { Size } from '../../utils/useWindowSize';
import formatDate from '../../utils/formatDate';
import CreateMessageForm from './CreateMessageForm';
import Skeleton from '../../components/Skeleton';

const data = [
	{
		id: 0,
		author: { username: 'bativ', avatar: 'd28dc4cc7a70b9ad6bd7dac75184dc1d' },
		message: 'Hello',
		createdAt: '2023-02-09T17:49:20.263Z',
	},
	{
		id: 1,
		author: { username: '4e4i', avatar: 'a1cdc65a54049e25457ddb46486b02cf' },
		message: 'Allo',
		createdAt: '2023-02-09T17:49:20.263Z',
	},
	{
		id: 2,
		author: { username: 'bativ', avatar: 'd28dc4cc7a70b9ad6bd7dac75184dc1d' },
		message:
			'Fuck of you black homeless nigger suck my big black cock you little piece of shit you bastard you can jump of a roof and still no one will care about you.',
		createdAt: '2023-02-09T17:49:20.263Z',
	},
	{
		id: 3,
		author: { username: '4e4i', avatar: 'a1cdc65a54049e25457ddb46486b02cf' },
		message: "I'm sorry for any inconvenience or confusion caused. Is there anything else I can help you with?",
		createdAt: '2023-02-09T17:49:20.263Z',
	},
	{
		id: 4,
		author: { username: 'bativ', avatar: 'd28dc4cc7a70b9ad6bd7dac75184dc1d' },
		message: 'No.',
		createdAt: '2023-02-09T17:49:20.263Z',
	},
	{
		id: 5,
		author: { username: '4e4i', avatar: 'a1cdc65a54049e25457ddb46486b02cf' },
		message: 'Ok then. Let me know if there is anything else I can help you with.',
		createdAt: '2023-02-09T17:49:20.263Z',
	},
];
const ticket = { status: 'open' };

function TicketPage(): JSX.Element {
	const [reload, setReload] = useState(0);
	const { id } = useParams();
	const { user } = useUser();
	const navigate = useNavigate();
	const size: Size = useWindowSize();

	// useEffect(() => {
	// 	const getData: any = async () => {
	// 		const fetchedData = await getChat();
	// 		console.log(fetchedData);
	// 		setData(fetchedData);
	// 	};
	// 	getData();
	// }, [setData, reload]);
	useEffect(() => {
		const reloadInterval = setInterval(() => {
			setReload(Math.random());
		}, 3000);

		return () => clearInterval(reloadInterval);
	}, [setReload]);

	return (
		<>
			<PageTitle.Container>
				<PageTitle.Body title={`Ticket ${id}`} description="Here is your conversatione with the admins." />
			</PageTitle.Container>
			<div
				className="space-y-4 container overflow-scroll pr-2"
				style={{ height: `${size.height - (63 + 25 + 92 + 112)}px` }} // height: toolbar height + box padding + title height + create comment form height
			>
				{data.map((message: any) => (
					<div className="flex" key={message.id}>
						<div className="space-y-0.5 flex flex-grow flex-row">
							<div className="flex-shrink-0 mr-2">
								<img
									className="h-10 w-10 rounded-full"
									src={`https://www.gravatar.com/avatar/${message.author.avatar}?d=retro`}
									alt="user profile picture"
								/>
							</div>
							<div>
								<div className="font-medium flex items-center">
									<h6 className="text-white inline-block mb-0 mr-2">{message.author.username}</h6>
									<p className="text-xs text-cove">{formatDate(message.createdAt)}</p>
								</div>
								<div>{message.message}</div>
							</div>
						</div>
					</div>
				))}
			</div>
			<CreateMessageForm setReload={setReload} />
		</>
	);
}

export default TicketPage;
