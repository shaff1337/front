import React from 'react';
import { IUser } from './IUser';

const refreshUser = (setUser: React.Dispatch<React.SetStateAction<IUser>>): void => {
	setUser({
		updateUser: true,
		isLoading: true,
		id: 'Loading',
		username: 'Loading',
		email: 'Loading',
		role: 'Loading',
		ban: { reason: 'Loading' },
		avatar: 'Loading',
		invitedBy: 'Loading',
		createdAt: 'Loading',
		subscription: 'Loading',
	});
};

export default refreshUser;
