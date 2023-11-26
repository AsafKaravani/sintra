import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { atom_profileState } from '../../core/state/features/profile/profile-state';

export const HomePage: FC = () => {
	const state_profile = useRecoilValue(atom_profileState);
	console.log(state_profile);

	return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 20 }}></div>;
};
