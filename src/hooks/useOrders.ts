import {useMutation} from '@tanstack/react-query';
import {supabase} from '@/integrations/supabase/client';
import type {CreateOrderInput, CreateOrderItemInput, DBOrder, DBOrderItem} from '@/types/database';

interface CreateOrderWithItemsInput {
	order: CreateOrderInput;
	items: Omit<CreateOrderItemInput, 'order_id'>[];
}

export const useCreateOrder = () => {
	return useMutation({
		mutationFn: async ({order, items}: CreateOrderWithItemsInput) => {
			// Create order first
			const {data: orderData, error: orderError} = await supabase
					.from('orders')
					.insert([{
						customer_name: order.customer_name,
						customer_phone: order.customer_phone,
						customer_email: order.customer_email,
						shipping_address: order.shipping_address,
						shipping_province: order.shipping_province,
						note: order.note,
						subtotal: order.subtotal,
						shipping_fee: order.shipping_fee,
						total: order.total,
						order_number: 'TB' + Date.now(), // Will be overwritten by trigger
					}])
					.select()
					.single();
			
			if (orderError) throw orderError;
			
			const createdOrder = orderData as DBOrder;
			
			// Create order items
			const orderItems = items.map(item => ({
				...item,
				order_id: createdOrder.id,
			}));
			
			const {data: itemsData, error: itemsError} = await supabase
					.from('order_items')
					.insert(orderItems)
					.select();
			
			if (itemsError) throw itemsError;
			
			return {
				order: createdOrder,
				items: itemsData as DBOrderItem[],
			};
		},
	});
};
