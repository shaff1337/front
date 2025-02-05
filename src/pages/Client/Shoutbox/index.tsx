/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import { getShouts } from '../../../api/client';
import { deleteShout } from '../../../api/admin';
import Button from '../../../components/Button';
import { useUser } from '../../../hooks/user';
import formatDate from '../../../utils/formatDate';
import CreateShoutForm from './CreateShoutForm';
import * as PageTitle from '../../../components/Typography/PageTitle';
import useWindowSize, { Size } from '../../../utils/useWindowSize';

function Shoutbox({ username }: any): JSX.Element {
	document.title = 'User Panel';
	const [data, setData] = useState([]);
	const [reload, setReload] = useState(0);
	const { user } = useUser();
	const size: Size = useWindowSize();

	useEffect(() => {
		const getData: any = async () => {
			const fetchedData = await getShouts();
			console.log(fetchedData);
			setData(fetchedData);
		};
		getData();
	}, [setData, username, reload]);
	useEffect(() => {
		const reloadInterval = setInterval(() => {
			setReload(Math.random());
		}, 3000);

		return () => clearInterval(reloadInterval);
	}, [setReload]);

	return (
		<>
			<PageTitle.Container>
				<PageTitle.Body title="Shoutbox" description="Here you can message all users." />
			</PageTitle.Container>

			<div
				className="space-y-4 container overflow-scroll pr-2"
				style={{ height: `${size.height - (63 + 25 + 92 + 112)}px` }} // height: toolbar height + box padding + title height + create comment form height
			>
				{data.map((shout: any) => (
					<div className="flex" key={shout.id}>
						<div className="space-y-0.5 flex flex-grow flex-row">
							<div className="flex-shrink-0 mr-2">
								<img
									className="h-10 w-10 rounded-full"
									src={`https://www.gravatar.com/avatar/${shout.author.avatar}?d=retro`}
									alt="user profile picture"
								/>
							</div>
							<div>
								<div className="font-medium flex items-center mr-2">
									<h6 className="text-white inline-block mb-0 mr-2">{shout.author.username}</h6>
									<p className="text-xs text-cove">{formatDate(shout.createdAt)}</p>
								</div>
								<div>{shout.message}</div>
							</div>
							<div className="flex flex-1 justify-end">
								{user.role === 'ADMIN' ? (
									<Button
										size="base"
										onClick={() => {
											deleteShout(shout.id, setReload);
										}}
									>
										Delete
									</Button>
								) : null}
							</div>
						</div>
					</div>
				))}
			</div>
			<CreateShoutForm setReload={setReload} />
		</>
	);
}

export default Shoutbox;