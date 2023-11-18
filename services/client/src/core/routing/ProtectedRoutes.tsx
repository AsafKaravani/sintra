import { RouteObject } from 'react-router-dom';
import { Outlet, redirect } from 'react-router-dom';
import { HomePage } from '../../view/pages/HomePage';
import { Shell } from '../../view/layout/Shell';

const sleep = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

const authGuard = async () => {
	const isAuthenticated = await checkAuth();
	if (!isAuthenticated) {
		throw redirect('/login');
	}

	return true;
};

const checkAuth = async () => {
	//await sleep(5000);
	return true;
};

export const ProtectedRoutes: RouteObject = {
	path: '/s',
	element: (
		<Shell>
			<Outlet />
		</Shell>
	),
	loader: authGuard,
	children: [{ path: 'home', element: <HomePage /> }]
};
