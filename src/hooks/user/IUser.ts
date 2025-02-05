export interface IUser {
	updateUser?: boolean;
	isLoading: boolean;
	id: string | number;
	username: string;
	email: string;
	role: string;
	ban: { reason: string; };
	avatar: string;
	invitedBy: string;
	createdAt: string;
	subscription: string;
}

export interface ISetUser {
	updateUser: boolean;
	isLoading: boolean;
}

export type UserContextType = { user: IUser, setUser: ISetUser };
