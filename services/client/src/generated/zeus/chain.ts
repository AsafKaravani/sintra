import { Chain, ZeusScalars } from './index';

export const scalars: any = ZeusScalars({
	timestamp: {
		decode: (e: unknown) => new Date(e as string),
		encode: (e: unknown) => (e ? `"${(e as Date)?.toISOString()}"` : null)
	},
	float8: {
		decode: (e: unknown) => parseFloat(e as string),
		encode: (e: unknown) => e as string
	}
});

export const chain = Chain(import.meta.env.VITE_HASURA_GQL_ENDPOINT);
