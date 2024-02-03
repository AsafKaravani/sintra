import { Checkbox, TextField } from '@mui/material';
import { ProductField } from './ProductField';

export const FieldMap = {
	text: ({ name, register, ...props }: any) => <TextField {...props} {...register(name)} />,
	number: ({ name, register, ...props }: any) => <TextField {...props} {...register(name)} type="number" />,
	boolean: ({ name, register, ...props }: any) => <Checkbox {...props} {...register(name)} />,
	date: ({ name, register, ...props }: any) => <TextField {...props} {...register(name)} />,
	product: (props: any) => <ProductField {...props} />
} as const;
