import { Button, CircularProgress, TextField } from '@mui/material';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignInGoogle, useSignInPassword } from '../../core/firebase/firebase';
import { useForm, SubmitHandler } from 'react-hook-form';

type LoginFormFields = {
	email: string;
	password: string;
	password2: string;
};

export const LoginPage: FC = () => {
	const navigate = useNavigate();
	const [
		signInWithEmailAndPassword,
		_,
		loading_signInWithPassword,
		__
	] = useSignInPassword();

	const [
		signInWithGoogle,
		user_google,
		loading,
		error
	] = useSignInGoogle();
	useEffect(() => {
		if (user_google) {
			navigate('/s/home');
		}
	}, [user_google, navigate]);

	const { register, handleSubmit } = useForm<LoginFormFields>();
	const onSubmit: SubmitHandler<LoginFormFields> = async form => {
		const user = await signInWithEmailAndPassword(form.email, form.password);
		if (user) {
			navigate('/s/home');
		}
	};

	return (
		<div className="flex flex-col justify-center items-center bg-slate-200 h-screen">
			<div className="flex flex-col items-center gap-4 bg-white p-10 h-min shadow-lg w-1/3 min-w-[400px] rounded">
				<h1 className="text-5xl font-bold mb-4">Sintra</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4 w-4/5">
					<TextField {...register('email')} placeholder="Email" fullWidth />
					<TextField {...register('password')} type="password" placeholder="Password" fullWidth />
					<Button type="submit" className="px-10">
						Login
					</Button>
					{loading_signInWithPassword && <CircularProgress color="inherit" size={24} />}
				</form>
				<div className="flex items-center gap-2">
					<div className="h-px bg-gray-300 w-14"></div>
					<p className="text-sm opacity-50 mb-1">or</p>
					<div className="h-px bg-gray-300 w-14"></div>
				</div>
				<Button onClick={() => signInWithGoogle()} variant="outlined" className="w-4/5">
					Login with Google
					<i className="fa-brands fa-google ms-2"></i>
				</Button>
				<Button
					onClick={() => navigate('/register')}
					variant="outlined"
					color="inherit"
					className="text-slate-400 w-4/5"
				>
					Register with Email
				</Button>
			</div>
			<div className="mt-5 mb-60">
				<p className="text-sm opacity-50">© 2023 Sintra. All rights reserved.</p>
			</div>
		</div>
	);
};
