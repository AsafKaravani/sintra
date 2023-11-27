import { Button } from '@mui/material';
import React, { FC } from 'react';
import lookup from 'country-code-lookup';

interface LiveRequestRowProps extends React.PropsWithChildren {
	productName: string;
	requestedArrivalDate: Date;
	totalKg: number;
	kgPerPack: number;
	pricePerKg: number;
	companyName: string;
	rating: number;
	destenation: string;
}

export const LiveRequestRow: FC<LiveRequestRowProps> = React.memo(props => {
	return (
		<>
			<div className="w-full bg-slate-100 border-slate-200 border rounded flex justify-between gap-2 p-2 px-4">
				<div className="flex gap-8 flex-1">
					<div className="flex flex-col h-full justify-center items-start gap-2 me-4">
						<h2 className="text-lg max-w-[200px] font-bold">{props.productName}</h2>
						<div className="flex gap-2">
							<span className="text-red-500 flex items-center gap-1 text-xs">
								<i className="fa-solid fa-circle"></i>
								Now
							</span>
							<span className="text-xs bg-slate-400 p-1 text-white text-opacity-80 rounded">15 minutes ago</span>
						</div>
					</div>
					<div className="flex flex-col items-center justify-center">
						<span className="text-xs text-slate-400">22 days</span>
						<span className="text-sm">{props.requestedArrivalDate.toLocaleString().split(',')[0]}</span>
						<span className="text-xs text-slate-400">Arival by</span>
					</div>
					<div className="flex flex-col items-center justify-center">
						<span className="text-xs text-slate-400 opacity-0">.</span>
						<span className="text-sm">{props.totalKg} kg</span>
						<span className="text-xs text-slate-400">total kg</span>
					</div>
					<div className="flex flex-col items-center justify-center">
						<span className="text-xs text-slate-400 opacity-0">.</span>
						<span className="text-sm">{props.kgPerPack} kg</span>
						<span className="text-xs text-slate-400">kg per pack</span>
					</div>
					<div className="flex flex-col items-center justify-center">
						<span className="text-xs text-slate-400 opacity-0">.</span>
						<span className="text-sm">{props.pricePerKg} $</span>
						<span className="text-xs text-slate-400">price per kg</span>
					</div>
					<div className="flex flex-col items-center justify-center">
						<span className="text-xs text-slate-400 opacity-0">.</span>
						<span className="text-sm">{props.totalKg * props.pricePerKg} $</span>
						<span className="text-xs text-slate-400">total price</span>
					</div>
					<div className="flex flex-col items-center justify-center">
						<span className="text-xs text-slate-400 opacity-0">.</span>
						<Button className="p-0" variant="text">
							<span className="text-sm">{props.companyName}</span>
						</Button>
						<span className="text-xs text-slate-400">company</span>
					</div>
					<div className="flex flex-col items-center justify-center">
						<span className="text-xs text-slate-400">{props.rating}</span>
						<span className="text-sm">
							<i className="fa-solid fa-star text-yellow-400 "></i>
							<i className="fa-solid fa-star text-yellow-400 "></i>
							<i className="fa-solid fa-star text-yellow-400 "></i>
							<i className="fa-solid fa-star text-yellow-400 "></i>
							<i className="fa-solid fa-star-half text-yellow-400 "></i>
						</span>
						<span className="text-xs text-slate-400">rating</span>
					</div>
					<div className="flex flex-col items-center justify-center">
						<span className="text-xs text-slate-400 opacity-0">.</span>
						<span className="text-sm flex gap-1 items-center">
							<img
								src={`https://flagsapi.com/${lookup.byCountry(props.destenation)?.iso2}/flat/32.png`}
								className="h-4"
							/>
							{props.destenation} ({props.destenation && lookup.byCountry(props.destenation)?.iso2})
						</span>
						<span className="text-xs text-slate-400">destenation</span>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Button>Accept</Button>
					<Button className="hover:text-red-500 text-red-400 p-2 min-w-0" variant="text" color="inherit">
						<i className="fa-solid fa-trash"></i>
					</Button>
				</div>
			</div>
		</>
	);
});
