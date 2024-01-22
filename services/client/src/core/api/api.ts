import { useMutation, useQuery } from '@tanstack/react-query';
import { chain, scalars } from '../../generated/zeus/chain';
import { ModelTypes, ValueTypes, order_by } from '../../generated/zeus';
import { useAuth, useAuthId } from '../firebase/firebase';
import toast from 'react-hot-toast';
import { useRef } from 'react';
import { queryClient } from './query-client';

// ---- Auth API -------------------------------------------------------------------------

export const useQuery_Auth = () => {};

// ---- Products API ---------------------------------------------------------------------

export const useQuery_AllProducts = () => {
	return useQuery({
		queryKey: ['all-products'],
		queryFn: () =>
			chain('query', { scalars })({
				Product: [{}, {
					id: true,
					name: true,
					image_url: true,
					Category: {
						name: true
					}
				}]
			})
	});
};

// ---- Offers ---------------------------------------------------------------------------

export type Offer = DeepPartial<ModelTypes['Offer']>;
export const useQuery_AllOffers = () => {
	return useQuery({
		queryKey: ['offers', 'all-offers'],
		queryFn: () =>
			chain('query', { scalars })({
				Offer: [{ order_by: [{ created_at: order_by.desc }] }, {
					harvest_date: true,
					quantity: true,
					packaging: true,
					price_per_unit: true,
					active: true,
					product_id: true,
					Product: {
						name: true,
						Category: {
							name: true
						}
					}
				}]
			})
	});
};

export const useQuery_CurrentUserOffers = () => {
	const userId = useAuthId();
	return useQuery({
		enabled: !!userId,
		queryKey: ['offers', 'current-user-offers'],
		queryFn: () =>
			chain('query', { scalars })({
				Offer: [{
					order_by: [{ created_at: order_by.desc }],
					where: {
						business_id: {
							_eq: 1
						}
					}
				}, {
					id: true,
					harvest_date: true,
					quantity: true,
					packaging: true,
					price_per_unit: true,
					active: true,
					product_id: true,
					Product: {
						name: true,
						Category: {
							name: true
						}
					}
				}]
			})
	});
};

export const useQuery_FindOffers = (search: string) => {
	return useQuery({
		queryKey: ['offers', 'find-offers', search],
		queryFn: () =>
			chain('query', { scalars })({
				Offer: [{
					order_by: [{ created_at: order_by.desc }],
					where: {
						active: { _eq: true },
						_or: [{
							Product: {
								name: {
									_ilike: `%${search}%`
								}
							}
						}, {
							Product: {
								Category: {
									name: {
										_ilike: `%${search}%`
									}
								}
							}
						}]
					}
				}, {
					id: true,
					harvest_date: true,
					quantity: true,
					packaging: true,
					price_per_unit: true,
					active: true,
					product_id: true,
					Product: {
						name: true,
						Category: {
							name: true
						}
					}
				}]
			})
	});
};

export const useMutation_CreateOffer = () => {
	const userId = useAuthId();
	const toastIdRef = useRef<string>();
	return useMutation({
		mutationFn: (offer: Offer) => {
			toastIdRef.current = toast.loading('Creating offer...');
			return chain('mutation', { scalars })({
				insert_Offer_one: [{
					object: {
						...toInput(offer),
						business_id: 1
					}
				}, {
					id: true
				}]
			});
		},
		onSettled: (data, error, v, c) => {
			queryClient.invalidateQueries({ queryKey: ['offers'] });
			if (error) toast.error('Error creating offer', { id: toastIdRef.current });
			else toast.success('Offer created successfully', { id: toastIdRef.current });
		}
	});
};

export const useMutation_UpdateOffer = () => {
	const userId = useAuthId();
	const toastIdRef = useRef<string>();
	return useMutation({
		mutationFn: (offer: Offer) => {
			toastIdRef.current = toast.loading('Updating offer...');
			return chain('mutation', { scalars })({
				update_Offer_by_pk: [{
					pk_columns: {
						id: offer.id!
					},
					_set: {
						...toUpdate(offer)
					}
				}, {
					id: true
				}]
			});
		},
		onSettled: (data, error) => {
			queryClient.invalidateQueries({ queryKey: ['offers'] });
			if (error) toast.error('Error updating offer', { id: toastIdRef.current });
			else toast.success('Offer updated successfully', { id: toastIdRef.current });
		}
	});
};

export const useMutation_DeleteOffer = () => {
	const toastIdRef = useRef<string>();
	return useMutation({
		mutationFn: (offer: Offer) => {
			toastIdRef.current = toast.loading('Deleting offer...');
			return chain('mutation', { scalars })({
				delete_Offer_by_pk: [{
					id: offer.id!
				}, {
					id: true
				}]
			});
		},
		onSettled: (data, error) => {
			queryClient.invalidateQueries({ queryKey: ['offers'] });
			if (error) toast.error('Error deleting offer', { id: toastIdRef.current });
			else toast.success('Offer deleted successfully', { id: toastIdRef.current });
		}
	});
};

// ---- Profile --------------------------------------------------------------------------

export const useQuery_Profile = () => {
	const [user] = useAuth();
	return useQuery({
		enabled: !!user?.email,
		queryKey: ['profile'],
		queryFn: () =>
			chain('query', { scalars })({
				Profile: [{
					where: {
						email: { _eq: user.email }
					}
				}, {
					email: true,
					first_name: true,
					last_name: true,
					phone: true,
					pictureUrl: true,
					updated_at: true,
					created_at: true
				}]
			})
	});
};

export const useMutation_CreateProfile = () => {
	const [user] = useAuth();
	return useMutation({
		mutationFn: (profile: DeepPartial<ModelTypes['Profile']>) => {
			return chain('mutation', { scalars })({
				insert_Profile_one: [{
					object: {
						...toInput(profile),
						email: user.email
					}
				}, {
					id: true
				}]
			});
		},
		onSettled: (data, error) => {
			queryClient.invalidateQueries({ queryKey: ['profile'] });
		}
	});
};

// ---- Utils ----------------------------------------------------------------------------
// A function that loop over keys of object and if the key's first latter is uppercase then nest the value in {data: value}
export const toInput = (obj: any) => {
	const newObj: any = {};
	for (const key in obj) {
		const isFirstLatterUppercase = key[0] === key[0].toUpperCase();
		if (isFirstLatterUppercase) {
			newObj[key].data = obj[key];
		} else {
			newObj[key] = obj[key];
		}
	}
	return newObj;
};

export const toUpdate = (obj: any) => {
	const newObj: any = {};
	for (const key in obj) {
		const isFirstLatterUppercase = key[0] === key[0].toUpperCase();
		if (!isFirstLatterUppercase) newObj[key] = obj[key];
	}
	return newObj;
};

type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
	  }
	: T;
