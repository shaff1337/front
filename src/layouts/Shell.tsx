import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { me } from '../api/user';
import { IUser } from '../hooks/user/IUser';
import * as Sidebar from '../components/Sidebar';

function ShellLayout(): JSX.Element {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const [user, setUser] = useState<IUser>(
		{
			updateUser: false,
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
		},
	);

	useEffect(() => { me(setUser); }, [user.updateUser]);

	return (
		<>
			<Sidebar.Mobile sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} />
			<Navbar setSidebarOpen={setSidebarOpen} user={user} />
			<div className="max-w-7xl mx-auto">
				<div>
					<Sidebar.Desktop user={user} />
					<main className="md:pl-64 flex flex-col flex-1">
						<div className="max-w-7xl pt-6 px-4 sm:px-6 md:px-8">
							{/* Rendered children */}
							<Outlet context={{ user, setUser }} />
							{/* // Rendered children */}
						</div>
					</main>
				</div>
			</div>
		</>
	);
}

export default ShellLayout;
