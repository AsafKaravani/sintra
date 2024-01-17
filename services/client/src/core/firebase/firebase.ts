// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
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
export const useAuthId = () => {
	const [user] = useAuth();
	return user?.uid ? sdbm(user?.uid) : undefined;
};
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

export async function checkAuthStatus(): Promise<User | null> {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			firebaseAuth,
			user => {
				unsubscribe(); // Unsubscribe after receiving the initial status
				resolve(user); // Resolve with the user object if authenticated
			},
			error => {
				unsubscribe(); // Unsubscribe on error as well
				reject(error); // Reject the promise if there's an error
			}
		);
	});
}

const sdbm = (str: string): number => {
	const arr = str.split('');
	return arr.reduce(
		(hashCode: number, currentVal: string) =>
			(hashCode = currentVal.charCodeAt(0) + (hashCode << 6) + (hashCode << 16) - hashCode),
		0
	);
};
