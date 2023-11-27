import React from 'react';
import { FC } from 'react';
import { useTranslate } from '../../../core/translations/useTranslate';
import { Divider } from '@mui/material';
import { LiveRequestRow } from './LiveRequestRow';

export const LiveMarketPage: FC = React.memo(() => {
	const t = useTranslate();
	return (
		<>
			<h1 className="text-xl mb-2">{t('Live Requests')}</h1>
			<div className="mb-5 flex flex-col gap-2">
				<LiveRequestRow />
				<LiveRequestRow />
			</div>
			<Divider className="mb-2" />
			<h1 className="text-xl">{t('Recent Activity')}</h1>
		</>
	);
});
