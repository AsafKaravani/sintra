// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
	SignOutHook,
	useAuthState,
	useCreateUserWithEmailAndPassword,
	useSignInWithEmailAndPassword,
	useSignInWithGoogle,
	useSignOut
} from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
const env = import.meta.env;

const firebaseConfig = {
	apiKey: env.VITE_FB_API_KEY,
	authDomain: env.VITE_FB_AUTH_DOMAIN,
	projectId: env.VITE_FB_PROJECT_ID,
	storageBucket: env.VITE_FB_STORAGE_BUCKET,
	messagingSenderId: env.VITE_FB_MESSAGING_SENDER_ID,
	appId: env.VITE_FB_APP_ID
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

export const useAuth = () => useAuthState(firebaseAuth);
export const useSignInGoogle = () => useSignInWithGoogle(firebaseAuth);
export const useSignInPassword = () => useSignInWithEmailAndPassword(firebaseAuth);
export const useCreateUser = () => useCreateUserWithEmailAndPassword(firebaseAuth);
export const useLogout = () => {
	const [
		signOut,
		loading,
		error
	] = useSignOut(firebaseAuth);

	const naviate = useNavigate();

	return [
		() => {
			return signOut().then(() => {
				naviate('/login');
			});
		},
		loading,
		error
	] as SignOutHook;
};
