import React from 'react';
import Submenu from './Submenu';
import { IUser } from '../../hooks/user/IUser';

function Desktop({ user }: { user: IUser }): JSX.Element {
	return (
		<div className="hidden md:fixed md:flex md:w-64 md:pt-16 md:flex-col md:inset-y-0">
			<div className="flex flex-col flex-grow border-r border-accent overflow-y-auto">
				<div className="flex-grow flex flex-col text-base font-bold font-nunito">
					<nav className="flex-1 px-2 py-4 space-y-1">
						{/* Render Sidebar links */}
						<Submenu user={user} />
					</nav>
				</div>
			</div>
		</div>
	);
}

export default Desktop;
