import React from 'react';
import { FC } from 'react';
import { useTranslate } from '../../../core/translations/useTranslate';
import { Button, Divider, MenuItem, Select, Switch, TextField, ToggleButton } from '@mui/material';
import { LiveRequestRow } from './LiveRequestRow';

export const LiveMarketPage: FC = React.memo(() => {
	const t = useTranslate();
	const [selected, setSelected] = React.useState(false);
	return (
		<>
			<div className="flex items-center gap-2">
				<h1 className="text-xl mb-2">{t('Live Requests')}</h1>
				<ToggleButton
					className="border-none p-0 px-3"
					color="primary"
					disableRipple
					value="check"
					selected={selected}
					onChange={() => {
						setSelected(!selected);
					}}
				>
					<div style={{ textTransform: 'none' }}>Show relevant only</div>
				</ToggleButton>
			</div>
			<div className="border rounded p-2 mb-2 flex items-center">
				<span className="me-2">Text search</span>
				<TextField
					className="overflow-hidden rounded-lg"
					inputProps={{
						style: { padding: '4px 14px', borderRadius: '40px' }
					}}
				/>
				<Divider orientation="vertical" className="mx-4 h-4" />

				<span className="me-2">Category</span>
				<Select defaultValue={0}>
					<MenuItem value={0}>All</MenuItem>
					<MenuItem value={10}>
						<i className="fa-solid fa-candy-bar me-2"></i>
						Cacao
					</MenuItem>
					<MenuItem value={20}>
						<i className="fa-solid fa-coffee-bean me-2"></i>
						Coffee
					</MenuItem>
					<MenuItem value={30}>
						<i className="fa-solid fa-acorn me-2"></i>
						Nuts
					</MenuItem>
				</Select>
				<Divider orientation="vertical" className="mx-4 h-4 " />

				<span className="me-2">Match my offers</span>
				<Switch />

				<Button variant="outlined" className="ms-auto">
					<i className="fa-solid fa-filter me-2"></i>
					Filter
				</Button>
			</div>
			<div className="mb-5 flex flex-col gap-2">
				<LiveRequestRow
					productName="Brazillian coffee bean"
					requestedArrivalDate={new Date('12/20/23')}
					totalKg={1000}
					kgPerPack={10}
					pricePerKg={2}
					companyName="Starbuck LTD"
					rating={4.5}
					destenation="Argentina"
				/>
				<LiveRequestRow
					productName="Cuban roasted coffee"
					requestedArrivalDate={new Date('01/3/24')}
					totalKg={1400}
					kgPerPack={28}
					pricePerKg={3.4}
					companyName="My Coffee LTD"
					rating={4.5}
					destenation="Germany"
				/>
			</div>
			<Divider className="mb-2" />
			<h1 className="text-xl">{t('Recent Activity')}</h1>
		</>
	);
});
