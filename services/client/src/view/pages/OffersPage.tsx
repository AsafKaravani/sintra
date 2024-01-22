import React, { useCallback, useEffect, useState } from 'react';
import { FC } from 'react';
import { useTranslate } from '../../core/translations/useTranslate';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import { ColDef, GridOptions } from 'ag-grid-community';
import { Button } from '@mui/material';
import {
	Offer,
	useMutation_CreateOffer,
	useMutation_UpdateOffer,
	useQuery_CurrentUserOffers,
	useMutation_DeleteOffer
} from '../../core/api/api';
import moment from 'moment';

export const OffersPage: FC = React.memo(() => {
	const t = useTranslate();
	const query_MyOffers = useQuery_CurrentUserOffers();
	const mutation_CreateOffer = useMutation_CreateOffer();
	const mutation_UpdateOffer = useMutation_UpdateOffer();
	const mutation_deleteOffer = useMutation_DeleteOffer();

	// Row Data: The data to be displayed.
	const [inputRowData, setInputRowData] = useState<Offer | undefined>();

	const newOffer = useCallback(() => {
		setInputRowData({
			active: true
		});
	}, []);

	const cancelNewOffer = useCallback(() => {
		setInputRowData(undefined);
	}, []);

	// Column Definitions: Defines & controls grid columns.
	const [colDefs, setColDefs] = useState<ColDef<Offer>[]>([
		{ field: 'Product.name', editable: false, flex: 2 },
		{ field: 'product_id', cellDataType: 'number' },
		{
			field: 'harvest_date',
			cellDataType: 'date',
			cellRenderer: (data: any) => {
				return data.value ? `${moment(data.value).format('DD/MM/YYYY')} (${moment(data.value).fromNow()})` : '';
			},
			flex: 2
		},
		{ field: 'quantity', cellDataType: 'number' },
		{ field: 'packaging', cellDataType: 'number' },
		{ field: 'price_per_unit', cellDataType: 'number', cellEditorParams: { placeholder: 'Price per unit' } },
		{ field: 'active', cellDataType: 'boolean' },
		{
			editable: false,

			cellRenderer: (context: any) => (
				<i
					className="fas fa-trash text-red-500 cursor-pointer"
					onClick={() => mutation_deleteOffer.mutate(context.data)}
				></i>
			)
		}
	]);

	const defaultColDef: ColDef = {
		editable: !mutation_CreateOffer.isPending,
		sortable: true,
		filter: true,
		resizable: true,
		flex: 1,
		minWidth: 100
	};

	// type CellEditingStoppedEvent = Parameters<GridOptions<Offer>['onCellEditingStopped']>[0];
	const isPinnedRowDataCompleted = (event: any) => {
		let dataInputCompleted = true;

		const requiredFields = [
			'product_id',
			'harvest_date',
			'quantity',
			'packaging',
			'price_per_unit',
			'active'
		];

		if (requiredFields.some(field => event.data?.[field] === undefined || event.data?.[field] === null)) {
			dataInputCompleted = false;
		}

		return dataInputCompleted;
	};

	const gridOptions: GridOptions<Offer> = {
		defaultColDef: defaultColDef,
		columnDefs: colDefs,
		rowData: query_MyOffers.data?.Offer || [],
		pinnedTopRowData: inputRowData ? [inputRowData] : [],

		onCellEditingStopped: event => {
			if (event.data && isPinnedRowDataCompleted(event)) {
				if (event.data.id) {
					mutation_UpdateOffer.mutate(event.data);
				} else {
					mutation_CreateOffer.mutate(event.data);
				}
				setInputRowData(undefined);
			}
		}
	};

	return (
		<>
			<div className="flex gap-2 mb-2">
				<h1 className="text-xl mb-2">{t('Manage Offers')}</h1>
				{!inputRowData ? (
					<Button onClick={newOffer} variant="contained" size="small" color="primary">
						<i className="fas fa-plus mr-2" />
						New Offer
					</Button>
				) : (
					<Button onClick={cancelNewOffer} variant="contained" size="small" color="error">
						<i className="fas fa-times mr-2" />
						Canel
					</Button>
				)}
			</div>

			<div className="h-1/2">
				<AgGridReact {...gridOptions} className="ag-theme-quartz" />
			</div>
		</>
	);
});

function isEmptyPinnedCell({ node, value }) {
	return (node.rowPinned === 'top' && value == null) || (node.rowPinned === 'top' && value == '');
}
