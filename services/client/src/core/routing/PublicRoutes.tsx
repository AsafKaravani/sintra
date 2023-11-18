import { RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { LoginPage } from '../../view/pages/LoginPage';
import { RegisterPage } from '../../view/pages/RegisterPage';

export const PublicRoutes: RouteObject = {
	path: '/',
	element: (
		<>
			<Outlet />
		</>
	),
	children: [{ path: 'login', element: <LoginPage /> }, { path: 'register', element: <RegisterPage /> }]
};
