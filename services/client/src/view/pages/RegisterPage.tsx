import { Button, CircularProgress, TextField } from '@mui/material';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateUser } from '../../core/firebase/firebase';

type RegisterFormFields = {
	email: string;
	password: string;
	password2: string;
};

export const RegisterPage: FC = () => {
	const navigate = useNavigate();
	const [
		createUserWithEmailAndPassword,
		user,
		loading
	] = useCreateUser();

	const { register, handleSubmit } = useForm<RegisterFormFields>();
	const onSubmit: SubmitHandler<RegisterFormFields> = form => {
		if (form.password !== form.password2) {
			return;
		}
		createUserWithEmailAndPassword(form.email, form.password);
	};

	useEffect(() => {
		if (user) {
			navigate('/login');
		}
	}, [user, navigate]);

	return (
		<div className="flex flex-col justify-center items-center bg-slate-200 h-screen">
			<div className="flex flex-col items-center gap-4 bg-white p-10 h-min shadow-lg w-1/3 min-w-[400px] rounded">
				<h1 className="text-5xl font-bold mb-4">Sintra</h1>
				<form className="flex flex-col items-center gap-4 w-4/5" onSubmit={handleSubmit(onSubmit)}>
					<TextField {...register('email')} placeholder="Email" fullWidth />
					<TextField {...register('password')} type="password" placeholder="Password" fullWidth />
					<TextField {...register('password2')} type="password" placeholder="Verify password" fullWidth />
					<Button type="submit" className="px-10" disabled={loading}>
						Register
					</Button>
					{loading && <CircularProgress color="inherit" size={24} />}
				</form>
				<Button onClick={() => navigate('/login')} variant="text" color="inherit" className="text-slate-400 w-4/5">
					I already have an account
				</Button>
			</div>
			<div className="mt-5 mb-60">
				<p className="text-sm opacity-50">© 2023 Sintra. All rights reserved.</p>
			</div>
		</div>
	);
};
