import { Button, TextField } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginPage: FC = () => {
	const navigate = useNavigate();
	const login = () => navigate('/s/home');

	return (
		<div className="flex flex-col justify-center items-center bg-slate-200 h-screen">
			<div className="flex flex-col items-center gap-4 bg-white p-10 h-min shadow-lg w-1/3 min-w-[400px] rounded">
				<h1 className="text-5xl font-bold mb-4">Sintra</h1>
				<form className="flex flex-col items-center gap-4 w-4/5">
					<TextField placeholder="Email" fullWidth />
					<TextField placeholder="Password" fullWidth />
					<Button onClick={login} className="px-10">
						Login
					</Button>
				</form>
				<div className="flex items-center gap-2">
					<div className="h-px bg-gray-300 w-14"></div>
					<p className="text-sm opacity-50 mb-1">or</p>
					<div className="h-px bg-gray-300 w-14"></div>
				</div>
				<Button variant="outlined" className="w-4/5">
					Login with Google
					<i className="fa-brands fa-google ms-2"></i>
				</Button>
			</div>
			<div className="mt-5 mb-60">
				<p className="text-sm opacity-50">© 2023 Sintra. All rights reserved.</p>
			</div>
		</div>
	);
};
