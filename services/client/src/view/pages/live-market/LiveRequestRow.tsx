import { Button } from '@mui/material';
import React, { FC } from 'react';

interface LiveRequestRowProps extends React.PropsWithChildren {}

export const LiveRequestRow: FC<LiveRequestRowProps> = React.memo(props => {
	return (
		<>
			<div className="w-full bg-slate-100 border-slate-200 border rounded flex justify-between gap-2 p-2 px-4">
				<div className="flex gap-8 flex-1">
					<div className="flex flex-col h-full justify-center items-start gap-2 me-4">
						<h2 className="text-lg max-w-[200px] font-bold"> Brazillian coffee bean</h2>
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
						<span className="text-sm">20/12/23</span>
						<span className="text-xs text-slate-400">Arival by</span>
					</div>
					<div className="flex flex-col items-center justify-center">
						<span className="text-xs text-slate-400 opacity-0">.</span>
						<span className="text-sm">1,000 kg</span>
						<span className="text-xs text-slate-400">total kg</span>
					</div>
					<div className="flex flex-col items-center justify-center">
						<span className="text-xs text-slate-400 opacity-0">.</span>
						<span className="text-sm">10 kg</span>
						<span className="text-xs text-slate-400">kg per pack</span>
					</div>
					<div className="flex flex-col items-center justify-center">
						<span className="text-xs text-slate-400 opacity-0">.</span>
						<span className="text-sm">2 $</span>
						<span className="text-xs text-slate-400">price per kg</span>
					</div>
					<div className="flex flex-col items-center justify-center">
						<span className="text-xs text-slate-400 opacity-0">.</span>
						<span className="text-sm">2,000 $</span>
						<span className="text-xs text-slate-400">total price</span>
					</div>
					<div className="flex flex-col items-center justify-center">
						<span className="text-xs text-slate-400 opacity-0">.</span>
						<span className="text-sm flex gap-1 items-center">
							<img src="https://flagsapi.com/AR/flat/32.png" className="h-4" />
							Argentina
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
