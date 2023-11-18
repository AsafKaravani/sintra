import { RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { LoginPage } from '../../view/pages/LoginPage';

export const PublicRoutes: RouteObject = {
	path: '/',
	element: (
		<>
			<Outlet />
		</>
	),
	children: [{ path: 'login', element: <LoginPage /> }]
};
