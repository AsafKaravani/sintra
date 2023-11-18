import { RouteObject } from 'react-router-dom';
import { Outlet, redirect } from 'react-router-dom';
import { HomePage } from '../../view/pages/HomePage';
import { Shell } from '../../view/layout/Shell';

const authGuard = async () => {
	const isAuthenticated = await checkAuth();
	if (!isAuthenticated) {
		throw redirect('/login');
	}

	return true;
};

const checkAuth = async () => {
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
