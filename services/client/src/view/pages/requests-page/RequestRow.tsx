import React, { FC } from 'react';
import { Offer } from '../../../core/api/api';
import moment from 'moment';

interface RequestRowProps extends React.PropsWithChildren {
	parentOffer?: Offer;
	request?: Offer;
}

export const RequestRow: FC<RequestRowProps> = React.memo(props => {
	return (
		<div className="p-4 w-full h-32 bg-slate-200 flex gap-4 rounded-md">
			<div className="flex items-center flex-col justify-center">
				<img src="/placeholder.webp" className="h-4/5 rounded-lg" alt="product" />
				<div className="h-1/5 mt-1">
					<b>{props.request?.Product?.name}</b>
				</div>
			</div>
			<div className="flex flex-col">
				<div className="flex-1 flex items-center justify-end">
					<span className="underline underline-offset-4 scale-90">Offer</span>
				</div>
				<div className="flex-1 flex items-center"></div>
				<div className="flex-1 flex items-center justify-end">
					<span className="underline underline-offset-4 scale-90">Request</span>
				</div>
			</div>
			<div className="flex gap-10">
				<CompareBlock name="Price per kg" a={props.parentOffer?.price_per_unit} b={props.request?.price_per_unit} />
				<CompareBlock
					name="Quantity"
					a={props.parentOffer?.quantity}
					b={props.request?.quantity}
					comperator={textComperator}
				/>
				<CompareBlock
					name="Packaging"
					a={props.parentOffer?.packaging}
					b={props.request?.packaging}
					comperator={textComperator}
				/>
				<CompareBlock
					name="Payment terms"
					a={props.parentOffer?.payment_terms}
					b={props.request?.payment_terms}
					comperator={textComperator}
				/>
			</div>
		</div>
	);
});

type CompareBlockProps = {
	name?: string;
	a?: any;
	b?: any;
	comperator?: Comperator;
};
const CompareBlock: FC<CompareBlockProps> = props => {
	const comperator = props.comperator ?? numberComperator;
	const compareResult = comperator(props.a, props.b);
	console.log(props.name, props.a, props.b, compareResult);

	let aClass = '';
	let bClass = '';
	if (compareResult === 'a') {
		bClass = 'bg-red-200 text-red-700';
	}
	if (compareResult === 'b') {
		aClass = 'bg-red-200 text-red-700';
	}
	if (compareResult === 'different') {
		aClass = 'bg-orange-200 text-orange-700';
		bClass = 'bg-orange-200 text-orange-700';
	}
	return (
		<div className="flex flex-col">
			<div className="flex-1 flex items-center justify-center">
				<span className={`text-center ${aClass} px-2 rounded-sm`}>
					{props.a}
					{compareResult === 'b' && <i className="fas fa-arrow-down ms-1 text-red-400 scale-75"></i>}
				</span>
			</div>
			<div className="flex-1 flex items-center">
				<span className="flex-1 text-center text-sm opacity-50">{props.name}</span>
				{compareResult === 'different' && <i className="far fa-circle-exclamation ms-1 text-orange-400 "></i>}
			</div>
			<div className="flex-1 flex items-center justify-center">
				<span className={`text-center ${bClass} px-2 rounded-sm`}>
					{props.b ?? props.a}
					{compareResult === 'a' && <i className="fas fa-arrow-down ms-1 text-red-400 scale-75"></i>}
				</span>
			</div>
		</div>
	);
};

type Comperator = (a, b) => 'a' | 'b' | 'equal' | 'different';
const numberComperator: Comperator = (a, b) => {
	if (a === undefined || b === undefined || a === null || b === null) return 'equal';
	if (a > b) return 'a';
	if (a < b) return 'b';
	return 'equal';
};

const textComperator: Comperator = (a, b) => {
	if (a === undefined || b === undefined || a === null || b === null) return 'equal';
	if (a !== b) return 'different';
	return 'equal';
};
