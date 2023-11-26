import { ListItem, ListItemButton, ListItemText, Avatar } from '@mui/material';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslate } from '../../core/translations/useTranslate';

interface SideMenuItemProps extends React.PropsWithChildren {
	to?: string;
	text: string;
	icon: string;
	notifications?: number;
	notificationsColor?: string;
	disabled?: boolean;
}

export const SideMenuItem: FC<SideMenuItemProps> = React.memo(props => {
	const navigate = useNavigate();

	let goto = () => {};
	if (typeof props.to === 'string') {
		goto = () => navigate(props.to as string);
	}

	return (
		<ListItem>
			<ListItemButton disabled={props.disabled} onClick={goto}>
				<i className={`fa-solid fa-${props.icon} w-5 me-4`} />
				<ListItemText primary={props.text} />
				{props.notifications && (
					<Avatar className={`w-6 h-6 text-xs bg-${props.notificationsColor}-600`}>{props.notifications}</Avatar>
				)}
			</ListItemButton>
		</ListItem>
	);
});
