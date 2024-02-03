import React from 'react';
import { FC } from 'react';
import { useQuery_CurrentUserRequests } from '../../core/api/api';
import moment from 'moment';

export const RequestsPage: FC = React.memo(() => {
	const query_CurrentUserRequests = useQuery_CurrentUserRequests();
	return (
		<>
			<h1>My requests</h1>
			{query_CurrentUserRequests.data?.Offer.map(request => (
				<div key={request.id} className="flex gap-2">
					<div>{request.Product.name}</div>
					<div>{request.price_per_unit}</div>
					<div>{request.quantity}</div>
					<div>{request.payment_terms}</div>
					<div>{request.packaging}</div>
					<div>{moment(request.delivery_due_date).format('DD/MM/YYYY')}</div>
					<div>{request.destination_country}</div>
					<div>{request.free_text}</div>
				</div>
			))}
		</>
	);
});
