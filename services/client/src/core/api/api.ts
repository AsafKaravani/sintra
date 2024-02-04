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
	const profileId = useQuery_ProfileId();
	return useQuery({
		enabled: !!profileId,
		queryKey: ['offers', 'current-user-offers'],
		queryFn: () =>
			chain('query', { scalars })({
				Offer: [{
					order_by: [{ created_at: order_by.desc }],
					where: {
						profile_id: { _eq: profileId }
					}
				}, {
					id: true,
					harvest_date: true,
					quantity: true,
					packaging: true,
					price_per_unit: true,
					active: true,
					product_id: true,
					appearance: true,
					texture: true,
					payment_terms: true,
					origin_country: true,
					end_date: true,
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

export const useQuery_CurrentUserBuyersRequests = () => {
	const profileId = useQuery_ProfileId();
	return useQuery({
		enabled: !!profileId,
		queryKey: ['offers', 'current-user-buyers-requests'],
		queryFn: () =>
			chain('query', { scalars })({
				Offer: [{
					order_by: [{ created_at: order_by.desc }],
					where: {
						Offer: {
							parent_id: { _is_null: true },
							profile_id: { _eq: profileId }
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
					appearance: true,
					texture: true,
					payment_terms: true,
					origin_country: true,
					end_date: true,
					delivery_due_date: true,
					free_text: true,
					destination_country: true,
					Product: {
						name: true,
						Category: {
							name: true
						}
					},
					Offer: {
						id: true,
						harvest_date: true,
						quantity: true,
						packaging: true,
						price_per_unit: true,
						active: true,
						product_id: true,
						appearance: true,
						texture: true,
						payment_terms: true,
						origin_country: true,
						end_date: true,
						delivery_due_date: true,
						free_text: true,
						destination_country: true
					}
				}]
			})
	});
};

export const useQuery_CurrentUserRequests = () => {
	const profileId = useQuery_ProfileId();
	return useQuery({
		enabled: !!profileId,
		queryKey: ['offers', 'current-user-requests'],
		queryFn: () =>
			chain('query', { scalars })({
				Offer: [{
					order_by: [{ created_at: order_by.desc }],
					where: {
						profile_id: { _eq: profileId },
						Offer: {
							parent_id: { _is_null: true }
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
					appearance: true,
					texture: true,
					payment_terms: true,
					origin_country: true,
					end_date: true,
					delivery_due_date: true,
					free_text: true,
					destination_country: true,
					Product: {
						name: true,
						Category: {
							name: true
						}
					},
					Offer: {
						id: true,
						harvest_date: true,
						quantity: true,
						packaging: true,
						price_per_unit: true,
						active: true,
						product_id: true,
						appearance: true,
						texture: true,
						payment_terms: true,
						origin_country: true,
						end_date: true,
						delivery_due_date: true,
						free_text: true,
						destination_country: true
					}
				}]
			})
	});
};

export const useQuery_OfferById = (id?: number) => {
	return useQuery({
		enabled: !!id,
		queryKey: ['offers', `offer-${id}`],
		queryFn: () =>
			chain('query', { scalars })({
				Offer_by_pk: [{
					id: id as number
				}, {
					id: true,
					profile_id: true,
					harvest_date: true,
					quantity: true,
					packaging: true,
					price_per_unit: true,
					active: true,
					product_id: true,
					appearance: true,
					texture: true,
					payment_terms: true,
					origin_country: true,
					end_date: true,
					delivery_due_date: true,
					free_text: true,
					destination_country: true,
					Profile: {
						id: true,
						first_name: true,
						last_name: true,
						picture_url: true
					},
					Product: {
						name: true,
						Category: {
							name: true
						}
					},
					Offer: {
						Profile: {
							id: true,
							first_name: true,
							last_name: true,
							picture_url: true
						},
						id: true,
						profile_id: true,
						harvest_date: true,
						quantity: true,
						packaging: true,
						price_per_unit: true,
						active: true,
						product_id: true,
						appearance: true,
						texture: true,
						payment_terms: true,
						origin_country: true,
						end_date: true,
						delivery_due_date: true,
						free_text: true,
						destination_country: true
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
						parent_id: { _is_null: true }, // Offers with parent_id are "counter offers" and not the original offer
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
	const profileId = useQuery_ProfileId();
	const toastIdRef = useRef<string>();
	return useMutation({
		mutationFn: (offer: Offer) => {
			toastIdRef.current = toast.loading('Creating offer...');
			return chain('mutation', { scalars })({
				insert_Offer_one: [{
					object: {
						...toInput(offer),
						profile_id: profileId
					}
				}, {
					id: true
				}]
			});
		},
		onSettled: (data, error, v, c) => {
			console.error(error);
			queryClient.invalidateQueries({ queryKey: ['offers'] });
			if (error) toast.error('Error creating offer', { id: toastIdRef.current });
			else toast.success('Offer created successfully', { id: toastIdRef.current });
		}
	});
};

export const useMutation_UpdateOffer = () => {
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
			error && console.error(error);
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

// ---- OfferMessage --------------------------------------------------------------------
export type OfferMessage = DeepPartial<ModelTypes['OfferMessage']>;

export const useQuery_MessagesByOfferId = (offerId?: number) => {
	return useQuery({
		enabled: !!offerId,
		queryKey: ['messages', `messages-by-offer-${offerId}`],
		queryFn: () =>
			chain('query', { scalars })({
				OfferMessage: [{
					order_by: [{ created_at: order_by.asc }],
					where: {
						offer_id: { _eq: offerId }
					}
				}, {
					id: true,
					offer_id: true,
					profile_id: true,
					message: true,
					created_at: true
				}]
			})
	});
};

export const useMutation_CreateOfferMessage = () => {
	const profileId = useQuery_ProfileId();
	return useMutation({
		mutationFn: (message: OfferMessage) => {
			return chain('mutation', { scalars })({
				insert_OfferMessage_one: [{
					object: {
						...toInput(message),
						profile_id: profileId
					}
				}, {
					id: true
				}]
			});
		},
		onSettled: (data, error) => {
			queryClient.invalidateQueries({ queryKey: ['messages'] });
		}
	});
};

// ---- Profile --------------------------------------------------------------------------
export type Profile = DeepPartial<ModelTypes['Profile']>;

export const useQuery_Profile = () => {
	const [user] = useAuth();
	return useQuery({
		enabled: !!user?.email,
		queryKey: ['profile'],
		queryFn: () =>
			chain('query', { scalars })({
				Profile: [{
					where: {
						email: { _eq: user!.email }
					}
				}, {
					id: true,
					email: true,
					first_name: true,
					last_name: true,
					phone: true,
					picture_url: true,
					updated_at: true,
					created_at: true
				}]
			})
	});
};

export const useQuery_ProfileId = () => {
	const query_Profile = useQuery_Profile();
	return query_Profile.data?.Profile?.[0]?.id;
};

export const useMutation_CreateProfile = () => {
	const [user] = useAuth();
	return useMutation({
		mutationFn: (profile: DeepPartial<ModelTypes['Profile']>) => {
			return chain('mutation', { scalars })({
				insert_Profile_one: [{
					object: {
						...toInput(profile),
						email: user!.email
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

export const useMutation_UpdateProfile = () => {
	const [user] = useAuth();
	const toastIdRef = useRef<string>();
	return useMutation({
		mutationFn: (profile: DeepPartial<ModelTypes['Profile']>) => {
			toastIdRef.current = toast.loading('Updating profile...');
			return chain('mutation', { scalars })({
				update_Profile: [{
					where: {
						email: { _eq: user!.email }
					},
					_set: {
						...profile,
						email: user!.email
					}
				}, {
					affected_rows: true,
					returning: {
						id: true
					}
				}]
			});
		},
		onSettled: (data, error) => {
			error && console.error(error);
			queryClient.invalidateQueries({ queryKey: ['profile'] });
			if (error) toast.error('Error updating profile', { id: toastIdRef.current });
			else toast.success('Profile updated successfully', { id: toastIdRef.current });
		}
	});
};

// ---- Utils ----------------------------------------------------------------------------
// A function that loop over keys of object and if the key's first latter is uppercase then nest the value in {data: value}
export const toInput = (obj: any) => {
	Object.keys(obj).forEach(key => obj[key] === '' && delete obj[key]);
	const newObj: any = {};
	for (const key in obj) {
		if (obj[key] === null) continue;
		const isFirstLatterUppercase = key[0] === key[0].toUpperCase();
		if (isFirstLatterUppercase) {
			newObj[key] = {};
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
