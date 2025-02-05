/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import { getComments, deleteComment } from '../../../api/panel';
import Button from '../../../components/Button';
import { useUser } from '../../../hooks/user';
import formatDate from '../../../utils/formatDate';
import CreateCommentForm from './CreateCommentForm';

function UserComments({ username }: any): JSX.Element {
	const [data, setData] = useState([]);
	const [reload, setReload] = useState(0);
	const { user } = useUser();

	useEffect(() => {
		const getData: any = async () => {
			const fetchedData = await getComments(username);
			setData(fetchedData);
		};
		getData();
	}, [setData, username, reload]);

	return (
		<>
			<div className="relative">
				<div className="absolute inset-0 flex items-center" aria-hidden="true">
					<div className="w-full border-t border-accent" />
				</div>
				<div className="relative flex justify-center">
					<span className="px-3 bg-main text-sm font-medium text-cove">Comments</span>
				</div>
			</div>

			<div className="space-y-4 ">
				{data.map((comment: any) => (
					<div className="flex" key={comment.id}>
						<div className="space-y-0.5 flex flex-grow flex-row">
							<div className="flex-shrink-0 mr-2">
								<img className="h-10 w-10 rounded-full" src={`https://www.gravatar.com/avatar/${comment.author.avatar}?d=retro`} alt="user profile picture" />
							</div>
							<div>
								<div className="font-medium flex items-center">
									<h6 className="text-white inline-block mb-0 mr-2">{comment.author.username}</h6>
									<p className="text-xs text-cove">{formatDate(comment.createdAt)}</p>
								</div>
								<div>{comment.comment}</div>
							</div>
							<div className="flex flex-1 justify-end">
								{(user.role === 'ADMIN') ? (
									<Button
										size="base"
										onClick={() => {
											deleteComment(comment.id, setReload);
										}}
									>
										Delete
									</Button>
								) : null}
							</div>
						</div>
					</div>
				))}

				<CreateCommentForm username={username} setReload={setReload} />
			</div>
		</>
	);
}

export default UserComments;
