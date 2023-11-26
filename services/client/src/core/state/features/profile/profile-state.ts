import { atom } from 'recoil';
import { Profile } from '@prisma/client';

type ProfileState = {
	profile?: Profile;
	shouldDoOnboarding?: boolean;
};
export const atom_profileState = atom<ProfileState>({
	key: 'profileState',
	default: {
		shouldDoOnboarding: false
	}
});
