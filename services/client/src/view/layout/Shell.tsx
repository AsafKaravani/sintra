import { Button, Popover } from '@mui/material';
import React, { ReactElement, FC } from 'react';
import { useLogout } from '../../core/firebase/firebase';
import { ProfileButton } from './ProfileButton';
import { LanguagePicker } from '../../core/translations/LanguagePicker';

interface CompProps extends React.PropsWithChildren {
	children: ReactElement | ReactElement[];
}

export const Shell: FC<CompProps> = props => {
	return (
		<div className="flex h-screen">
			<div className="flex flex-col flex-1">
				<div className="h-12 bg-slate-200 flex justify-between items-center py-0 px-4">
					<span className=" flex items-center h-full gap-2">
						<Button variant="text" className="text-slate-500 rounded-none min-w-0 h-full">
							<i className="fa-solid fa-bars"></i>
						</Button>
						<Button variant="text" className="text-slate-500 rounded-none min-w-0 h-full">
							<i className="fa-solid fa-bell"></i>
						</Button>
						<LanguagePicker />
					</span>
					<span className="text-slate-500 font-bold">Sintra</span>
					<ProfileButton />
				</div>
				<div className="flex-1 p-4 overflow-y-auto">{props.children}</div>
			</div>
		</div>
	);
};
