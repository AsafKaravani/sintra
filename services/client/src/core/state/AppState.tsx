import React, { ReactElement, FC } from 'react';
import { RecoilRoot } from 'recoil';

interface AppStateProps extends React.PropsWithChildren {
	children: ReactElement | ReactElement[];
}

export const AppState: FC<AppStateProps> = React.memo(props => {
	return (
		<>
			<RecoilRoot>{props.children}</RecoilRoot>
		</>
	);
});
