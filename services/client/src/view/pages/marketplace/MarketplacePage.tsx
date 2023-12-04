import { TextField, Divider, Select, MenuItem, Switch, Button } from '@mui/material';
import React from 'react';
import { FC } from 'react';
import { useTranslate } from '../../../core/translations/useTranslate';
import { LiveRequestRow } from '../live-market/LiveRequestRow';
import { OfferRow } from './OfferRow';

export const MarketplacePage: FC = React.memo(() => {
	const t = useTranslate();
	return (
		<>
			<h1 className="text-xl mb-2">{t('Maketplace')}</h1>
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

				<span className="me-2">
					Quantity
					<span className="text-xs opacity-30"> (kg)</span>
				</span>
				<TextField
					type="number"
					className="overflow-hidden rounded-lg w-20"
					inputProps={{
						style: { padding: '4px 14px', borderRadius: '40px' }
					}}
				/>

				<Divider orientation="vertical" className="mx-4 h-4" />
				<span className="me-2">
					Packing
					<span className="text-xs opacity-30"> (kg)</span>
				</span>
				<TextField
					type="number"
					className="overflow-hidden rounded-lg w-20"
					inputProps={{
						style: { padding: '4px 14px', borderRadius: '40px' }
					}}
				/>
			</div>

			<h1 className="text-xl mb-2 mt-4">{t('Found Offers')}</h1>
			<div className="flex flex-col gap-4">
				<OfferRow
					productName="Brazillian coffee bean"
					timeToShip={22}
					totalKg={1000}
					kgPerPack={10}
					pricePerKg={2}
					companyName="Argintina Framer LTD"
					rating={4.5}
					origin="Argentina"
				/>
				<OfferRow
					productName="Brazillian coffee bean"
					timeToShip={22}
					totalKg={1000}
					kgPerPack={10}
					pricePerKg={2}
					companyName="Brazil Framer LTD"
					rating={3}
					origin="Brazil"
				/>
				<OfferRow
					productName="Brazillian coffee bean"
					timeToShip={22}
					totalKg={1000}
					kgPerPack={10}
					pricePerKg={2}
					companyName="Peru Framer LTD"
					rating={4.2}
					origin="Peru"
				/>
			</div>
		</>
	);
});
