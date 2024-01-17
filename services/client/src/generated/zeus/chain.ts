import { Chain, ZeusScalars } from './index';

export const scalars = ZeusScalars({
	timestamp: {
		decode: (e: unknown) => new Date(e as string),
		encode: (e: unknown) => `"${(e as Date).toISOString()}"`
	},
	float8: {
		decode: (e: unknown) => parseFloat(e as string),
		encode: (e: unknown) => e as string
	}
});

export const chain = Chain(import.meta.env.VITE_HASURA_GQL_ENDPOINT);
