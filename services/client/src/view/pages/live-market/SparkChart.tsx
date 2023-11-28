import useDemoConfig from './useDemoConfig';
import React from 'react';
import { AxisOptions, Chart } from 'react-charts';

export default function Line() {
	const { data, randomizeData } = useDemoConfig({
		series: 1,
		dataType: 'time'
	});

	const primaryAxis = React.useMemo<AxisOptions<(typeof data)[number]['data'][number]>>(
		() => ({
			getValue: datum => datum.primary as unknown as Date,
			show: false
		}),
	[]
	);

	const secondaryAxes = React.useMemo<AxisOptions<(typeof data)[number]['data'][number]>[]>(
		() => [{
			getValue: datum => datum.secondary,
			show: false,
			showDatumElements: false
		}],
	[]
	);

	return (
		<>
			<button className="opacity-0" onClick={randomizeData}>
				Randomize Data
			</button>
			<br />
			<br />
			<Chart
				options={{
					data,
					primaryAxis,
					secondaryAxes
				}}
			/>
		</>
	);
}
