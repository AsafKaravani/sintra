import React, { useEffect } from 'react';
import { FC } from 'react';
import { useMutation_CreateProfile, useQuery_Profile } from '../../../core/api/api';
import { useCreateProfileIfNoProfile } from './useCreateProfileIfNoProfile';

export const OnboardingPage: FC = React.memo(() => {
	const query_Profile = useQuery_Profile();
	const mutation_CreateProfile = useMutation_CreateProfile();

	useCreateProfileIfNoProfile();

	return (
		<>
			<h1>OnboardingPage Works.</h1>
		</>
	);
});
