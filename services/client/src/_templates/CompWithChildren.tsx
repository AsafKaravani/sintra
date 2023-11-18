import React, { ReactElement, FC } from 'react';

interface CompProps extends React.PropsWithChildren {
	children: ReactElement | ReactElement[];
}

export const Comp: FC<CompProps> = props => {
	return (
		<>
			<h1>Comp Works.</h1>
			{props.children}
		</>
	);
};
