import React from 'react';
import * as DescriptionList from '../../../components/DescriptionList';
import SectionTitle from '../../../components/Typography/SectionTitle';
import formatDate from '../../../utils/formatDate';
import Skeleton from '../../../components/Skeleton';

interface IUserInfo {
	isLoading: boolean,
	id: string | number,
	username: string,
	email: string,
	role: string,
	createdAt: string,
}

function Info({ user }: { user: IUserInfo }): JSX.Element {
	return (
		<>
			<SectionTitle title="Personal Information" description="Basic info, like your username and email address." />

			<DescriptionList.Dl>

				<DescriptionList.Container>
					<DescriptionList.Dt key={1}>ID</DescriptionList.Dt>
					<DescriptionList.Dd>
						<Skeleton isLoading={user.isLoading}>{user.id}</Skeleton>
					</DescriptionList.Dd>
				</DescriptionList.Container>

				<DescriptionList.Container>
					<DescriptionList.Dt key={2}>Username</DescriptionList.Dt>
					<DescriptionList.Dd>
						<Skeleton isLoading={user.isLoading}>{user.username}</Skeleton>
					</DescriptionList.Dd>
				</DescriptionList.Container>

				<DescriptionList.Container>
					<DescriptionList.Dt key={3}>Email</DescriptionList.Dt>
					<DescriptionList.Dd>
						<Skeleton isLoading={user.isLoading}>{user.email}</Skeleton>
					</DescriptionList.Dd>
				</DescriptionList.Container>

				<DescriptionList.Container>
					<DescriptionList.Dt key={4}>Role</DescriptionList.Dt>
					<DescriptionList.Dd>
						<Skeleton isLoading={user.isLoading}>{user.role}</Skeleton>
					</DescriptionList.Dd>
				</DescriptionList.Container>

				<DescriptionList.Container>
					<DescriptionList.Dt key={5}>Member since</DescriptionList.Dt>
					<DescriptionList.Dd>
						<Skeleton isLoading={user.isLoading}>{formatDate(user.createdAt)}</Skeleton>
					</DescriptionList.Dd>
				</DescriptionList.Container>

			</DescriptionList.Dl>

		</>
	);
}

export default Info;
