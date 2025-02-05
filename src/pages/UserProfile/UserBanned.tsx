import React from 'react';
import { MinusIcon } from '@heroicons/react/solid';

function UserBanned({ profileInfo }: any): JSX.Element {
	const isBanned = profileInfo.isLoading === false && profileInfo.ban;
	return (isBanned
		&& (
			<div className="section px-6 py-3">
				<h6 className="text-white">User banned</h6>
				<p className="text-sm text-cove">
					{profileInfo.ban.reason}
					{' '}
					<MinusIcon className="w-4 inline" />
					{' '}
					<span className="font-medium">{profileInfo.ban.authorUser}</span>
				</p>
			</div>
		)
	);
}

export default UserBanned;
