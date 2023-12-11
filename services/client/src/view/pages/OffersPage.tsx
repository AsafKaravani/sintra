import React, { useCallback, useState } from 'react';
import { FC } from 'react';
import { useTranslate } from '../../core/translations/useTranslate';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import { ColDef, GridOptions } from 'ag-grid-community';
import { Button } from '@mui/material';

type Offer = {
	name: string;
	harvestDate: Date;
	quantity: number;
	packaging: string;
	measurementUnit: string;
	pricePerUnit: number;
	active: boolean;
};

export const OffersPage: FC = React.memo(() => {
	const t = useTranslate();

	// Row Data: The data to be displayed.
	const [inputRowData, setInputRowData] = useState<Offer[]>([]);

	const newOffer = useCallback(() => {
		setInputRowData([{
			name: '-',
			harvestDate: new Date(),
			quantity: 0,
			packaging: '-',
			measurementUnit: '-',
			pricePerUnit: 0,
			active: false
		}]);
	}, []);

	// Row Data: The data to be displayed.
	const [rowData, setRowData] = useState([{
		name: 'Carrots',
		harvestDate: new Date(),
		quantity: 100,
		packaging: '15kg',
		measurementUnit: 'kg',
		pricePerUnit: 1.5,
		active: true
	}, {
		name: 'Potatoes',
		harvestDate: new Date(),
		quantity: 100,
		packaging: '7kg',
		measurementUnit: 'kg',
		pricePerUnit: 1.5,
		active: true
	}]);

	// Column Definitions: Defines & controls grid columns.
	const [colDefs, setColDefs] = useState<ColDef<Offer>[]>([
		{ field: 'name' },
		{ field: 'harvestDate' },
		{ field: 'quantity' },
		{ field: 'packaging' },
		{ field: 'measurementUnit' },
		{ field: 'pricePerUnit' },
		{ field: 'active' }
	]);

	const defaultColDef: ColDef = {
		editable: true,
		sortable: true,
		filter: true,
		resizable: true,
		flex: 1,
		minWidth: 100
	};

	//@ts-expect-error external function
	function isPinnedRowDataCompleted(params) {
		if (params.rowPinned !== 'top') return;
		return colDefs.every(def => def.field && inputRowData[0][def.field]);
	}

	const gridOptions: GridOptions<Offer> = {
		defaultColDef: defaultColDef,
		columnDefs: colDefs,
		rowData: rowData,
		pinnedTopRowData: inputRowData,

		onCellEditingStopped: event => {
			if (event.data && isPinnedRowDataCompleted(event)) {
				// save data
				setRowData([event.data, ...rowData]);
				//reset pinned row
				setInputRowData([]);
			}
		}
	};

	return (
		<>
			<div className="flex gap-2 mb-2">
				<h1 className="text-xl mb-2">{t('Manage Offers')}</h1>
				<Button onClick={newOffer} variant="contained" size="small" color="primary">
					New Offer
				</Button>
			</div>

			<div style={{ height: '50vh' }}>
				<AgGridReact {...gridOptions} className="ag-theme-quartz" />
			</div>
		</>
	);
});

//@ts-expect-error external function
function isEmptyPinnedCell({ node, value }) {
	return (node.rowPinned === 'top' && value == null) || (node.rowPinned === 'top' && value == '');
}
