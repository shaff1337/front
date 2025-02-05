import React from 'react';
import { useUser } from '../hooks/user';
import Skeleton from '../components/Skeleton';
import * as PageTitle from '../components/Typography/PageTitle';

function Home(): JSX.Element {
	const { user } = useUser();
	return (
		<>
			<PageTitle.Container>
				<PageTitle.Body
					title={(
						<Skeleton isLoading={user.isLoading}>
							Welcome,
							{' '}
							{user.username}
						</Skeleton>
					)}
					description={(
						<Skeleton isLoading={user.isLoading}>
							Welcome to our dashboard. Manage your account and your subscriptions.
						</Skeleton>
					)}
				/>
			</PageTitle.Container>
		</>
	);
}

export default Home;
