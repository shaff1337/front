import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ToasterWrapper from './components/ToasterWrapper';


// === Middlewares
const ProtectedPage = React.lazy(() => import('./middlewares/ProtectedPage'));
const AuthPage = React.lazy(() => import('./middlewares/AuthPage'));
// === Layouts
const ShellLayout = React.lazy(() => import('./layouts/Shell'));
const AuthLayout = React.lazy(() => import('./layouts/Auth'));

// === Pages
const Home = React.lazy(() => import('./pages/Home'));
const Account = React.lazy(() => import('./pages/Account'));
const Invites = React.lazy(() => import('./pages/Invites'));
const Subscription = React.lazy(() => import('./pages/Subscription'));
const Tickets = React.lazy(() => import('./pages/Tickets'));
const TicketPage = React.lazy(() => import('./pages/Tickets/TicketPage'));
const UserProfile = React.lazy(() => import('./pages/UserProfile'));
const Faq = React.lazy(() => import('./pages/Faq'));
const Members = React.lazy(() => import('./pages/Members'));
// === Pages/Auth
const SignIn = React.lazy(() => import('./pages/Auth/SignIn'));
const SignUp = React.lazy(() => import('./pages/Auth/SignUp'));
// === Pages/Client
const ClientHome = React.lazy(() => import('./pages/Client/Shoutbox'));
const ClientAnnouncements = React.lazy(() => import('./pages/Client/Announcements'));
const ClientConfigs = React.lazy(() => import('./pages/Client/Configs'));
const MyConfigs = React.lazy(() => import('./pages/Client/MyConfigs'));
// === Pages/Admin
const AdminUsers = React.lazy(() => import('./pages/Admin/Users'));
const AdminInvites = React.lazy(() => import('./pages/Admin/Invites'));
const AdminAnnouncements = React.lazy(() => import('./pages/Admin/Announcements'));
const AdminFAQ = React.lazy(() => import('./pages/Admin/FAQs'));
const AdminSubscriptions = React.lazy(() => import('./pages/Admin/Subscriptions'));
const AdminCheats = React.lazy(() => import('./pages/Admin/Cheats'));
const AdminPanel = React.lazy(() => import('./pages/Admin/Panel'));
// === Pages/Errors
const NotFound = React.lazy(() => import('./pages/Errors/NotFound'));

function App(): JSX.Element {
	return (
		<Suspense fallback={<>Loading</>}>
			<ToasterWrapper />
			<Routes>
				{/* Layout: Shell */}
				<Route path="/" element={<ShellLayout />}>
					<Route path="/" element={<ProtectedPage hasRole={['USER']} hasSubscription={false} fallback="/auth/sign-up" />}>
						<Route path="/" element={<Home />} />
						<Route path="account" element={<Account />} />
						<Route path="invites" element={<Invites />} />
						<Route path="subscription" element={<Subscription />} />
						<Route path="faq" element={<Faq />} />
						<Route path="tickets" element={<Tickets />} />
						<Route path="members" element={<Members />} />
						<Route path="id/:username" element={<UserProfile />} />
						<Route path="ticket/:id" element={<TicketPage />} />
					</Route>
					<Route path="/client" element={<ProtectedPage hasRole={['USER']} hasSubscription fallback="/" />}>
						<Route path="" element={<ClientHome />} />
						<Route path="announcements" element={<ClientAnnouncements />} />
						<Route path="configs" element={<ClientConfigs />} />
						<Route path="myconfigs" element={<MyConfigs />} />
					</Route>
					<Route path="/admin" element={<ProtectedPage hasRole={['ADMIN']} hasSubscription={false} fallback="/" />}>
						<Route path="users" element={<AdminUsers />} />
						<Route path="invites" element={<AdminInvites />} />
						<Route path="announcements" element={<AdminAnnouncements />} />
						<Route path="faq" element={<AdminFAQ />} />
						<Route path="subscriptions" element={<AdminSubscriptions />} />
						<Route path="cheats" element={<AdminCheats />} />
						<Route path="panel" element={<AdminPanel />} />
					</Route>
				</Route>

				{/* Layout: Auth */}
				<Route path="/auth" element={(<AuthPage><AuthLayout /></AuthPage>)}>
					<Route path="sign-in" element={<SignIn />} />
					<Route path="sign-up" element={<SignUp />} />
				</Route>

				{/* Layout: None */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	);
}

export default App;
