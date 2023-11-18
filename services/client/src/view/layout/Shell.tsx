import { Button, Popover } from '@mui/material';
import React, { ReactElement, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../core/firebase/firebase';

interface CompProps extends React.PropsWithChildren {
	children: ReactElement | ReactElement[];
}

export const Shell: FC<CompProps> = props => {
	const [logout] = useLogout();
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
		<div className="flex h-screen">
			<div className="flex flex-col flex-1">
				<div className="h-12 bg-slate-200 flex justify-between items-center py-0 px-4">
					<span className=" flex h-full gap-2">
						<Button variant="text" className="text-slate-500 rounded-none min-w-0 h-full">
							<i className="fa-solid fa-bars"></i>
						</Button>
						<Button variant="text" className="text-slate-500 rounded-none min-w-0 h-full">
							<i className="fa-solid fa-bell"></i>
						</Button>
					</span>
					<span className="text-slate-500 font-bold">Sintra</span>
					<Button
						onClick={handleClick}
						variant="text"
						className="text-slate-500 rounded-none h-full flex gap-2 items-center"
					>
						<i className="fa-solid fa-user-circle text-xl"></i>
						<span>Nir Vaida</span>
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
				</div>
				<div className="flex-1 p-4 overflow-y-auto">{props.children}</div>
			</div>
		</div>
	);
};
