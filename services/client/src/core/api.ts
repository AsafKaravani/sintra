import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { chain } from '../generated/zeus/chain';
import { ModelTypes, ValueTypes, order_by } from '../generated/zeus';
import { useAuthId } from './firebase/firebase';
import toast from 'react-hot-toast';
import { useRef } from 'react';

export const queryClient = new QueryClient();

//--------------------------------------------------------------------------------------//
//                                       Auth API                                       //
//--------------------------------------------------------------------------------------//
export const useQuery_Auth = () => {};

//--------------------------------------------------------------------------------------//
//                                     Products API                                     //
//--------------------------------------------------------------------------------------//

export const useQuery_AllProducts = () => {
	return useQuery({
		queryKey: ['all-products'],
		queryFn: () =>
			chain('query')({
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

//--------------------------------------------------------------------------------------//
//                                        Offers                                        //
//--------------------------------------------------------------------------------------//
export type Offer = DeepPartial<ModelTypes['Offer']>;
export const useQuery_AllOffers = () => {
	return useQuery({
		queryKey: ['offers', 'all-offers'],
		queryFn: () =>
			chain('query')({
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
			chain('query')({
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
		queryKey: [
			'offers',
			'find-offers',
			search
		],
		queryFn: () =>
			chain('query')({
				Offer: [{
					order_by: [{ created_at: order_by.desc }],
					where: {
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
			return chain('mutation')({
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
			console.log(offer);

			toastIdRef.current = toast.loading('Updating offer...');
			return chain('mutation')({
				update_Offer_by_pk: [{
					pk_columns: {
						id: offer.id
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
			console.log(offer);

			toastIdRef.current = toast.loading('Deleting offer...');
			return chain('mutation')({
				delete_Offer_by_pk: [{
					id: offer.id
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
