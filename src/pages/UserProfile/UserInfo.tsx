import React from 'react';
import Skeleton from '../../components/Skeleton';
import formatDate from '../../utils/formatDate';
import classNames from '../../utils/classNames';
import Badge from '../../components/Badge';

function UserInfo({ profileInfo }: any): JSX.Element {
	return (
		<div className="col-span-2">
			<div className="flex items-center">
				<div className="flex-shrink-0">
					<Skeleton isLoading={profileInfo.isLoading} type="image" className="h-16 w-16">
						<img className="h-16 w-16 rounded-full" src={profileInfo.avatar} alt="user profile picture" />
					</Skeleton>
				</div>

				<div className="ml-3 space-y-0.5 flex-grow">
					<div className={classNames(profileInfo.isLoading ? 'w-1/3' : '', 'text-base font-medium flex items-center')}>
						<Skeleton isLoading={profileInfo.isLoading}>
							<h1 className="title text-2xl inline-block mb-0 mr-2">{profileInfo.username}</h1>
							{profileInfo.ban
								? (<Badge color="#FFCCCC">BANNED</Badge>) : (<Badge color="#D6BCFA">{profileInfo.role}</Badge>)}
						</Skeleton>
					</div>
					<div className={classNames(profileInfo.isLoading ? 'w-3/5' : '', 'text-sm font-medium text-cove')}>
						<Skeleton isLoading={profileInfo.isLoading}>
							<p className="text-sm">
								UID:
								{' '}
								{profileInfo.id}
								{' '}
								/ Invited By:
								{' '}
								{profileInfo.invitedBy}
								{' '}
								/
								{' '}
								{formatDate(profileInfo.createdAt)}
							</p>
						</Skeleton>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserInfo;
