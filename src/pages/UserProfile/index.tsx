import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import UserInfo from './UserInfo';
import AdminActions from './AdminActions';
import { getProfile } from '../../api/panel';
import UserBanned from './UserBanned';
import UserComments from './UserComments/UserComments';
import { useUser } from '../../hooks/user';

function UserProfile(): JSX.Element {
	const { username } = useParams();
	const { user } = useUser();
	const navigate = useNavigate();

	const [profileInfo, setProfileInfo] = useState(
		{
			isLoading: true,
			id: 'Loading',
			username: 'Loading',
			role: 'Loading',
			ban: { reason: 'Loading' },
			avatar: 'Loading',
			invitedBy: 'Loading',
			createdAt: 'Loading',
		},
	);

	useEffect(() => {
		if (username) getProfile(username, setProfileInfo, navigate);
	}, [username]);

	return (
		<div className="flex flex-col space-y-7 animate-fade-in">
			<UserBanned profileInfo={profileInfo} />

			<div className="grid grid-cols-3">
				<UserInfo profileInfo={profileInfo} />
				{!user.isLoading && user.role === 'ADMIN' && <AdminActions profileInfo={profileInfo} />}
			</div>

			<UserComments username={username} />
			{/* <UserComments /> */}
		</div>
	);
}

export default UserProfile;
