import { Button, Popover } from '@mui/material';
import { FC } from 'react';
import { useAuth, useLogout } from '../../core/firebase/firebase';
import React from 'react';

export const ProfileButton: FC = () => {
	const [logout] = useLogout();

	const [user] = useAuth();

	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	return (
		<>
			<Button
				onClick={handleClick}
				variant="text"
				className="text-slate-500 rounded-none h-full flex gap-2 items-center"
			>
				<i className="fa-solid fa-user-circle text-xl"></i>
				<span>{user?.displayName}</span>
			</Button>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
			>
				<Button variant="text" className="flex justify-between w-32">
					<span>Edit profile</span>
					<i className="fa-solid fa-pencil "></i>
				</Button>
				<Button onClick={logout} variant="text" color="error" className="text-red-500 flex justify-between w-32">
					<span>Sign out</span>
					<i className="fa-solid fa-sign-out "></i>
				</Button>
			</Popover>
		</>
	);
};
