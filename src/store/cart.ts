import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export interface CartItem {
	id: string;
	slug?: string;
	name: string;
	image: string;
	quantity: number;
	selectedWeight: string;
	selectedPrice: number;
}

interface CartState {
	items: CartItem[];
	isOpen: boolean;
	addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
	removeItem: (productId: string, selectedWeight: string) => void;
	updateQuantity: (productId: string, quantity: number, selectedWeight: string) => void;
	clearCart: () => void;
	toggleCart: () => void;
	openCart: () => void;
	closeCart: () => void;
	getTotalItems: () => number;
	getTotalPrice: () => number;
}

export const useCart = create<CartState>()(
		persist(
				(set, get) => ({
					items: [],
					isOpen: false,
					
					addItem: (item, quantity = 1) => {
						set((state) => {
							const existingItem = state.items.find(
									(i) => i.id === item.id && i.selectedWeight === item.selectedWeight
							);
							
							if (existingItem) {
								return {
									items: state.items.map((i) =>
											i.id === item.id && i.selectedWeight === item.selectedWeight
													? {...i, quantity: i.quantity + quantity}
													: i
									),
								};
							}
							
							return {
								items: [...state.items, {...item, quantity}],
							};
						});
					},
					
					removeItem: (productId, selectedWeight) => {
						set((state) => ({
							items: state.items.filter(
									(item) => !(item.id === productId && item.selectedWeight === selectedWeight)
							),
						}));
					},
					
					updateQuantity: (productId, quantity, selectedWeight) => {
						if (quantity <= 0) {
							get().removeItem(productId, selectedWeight);
							return;
						}
						
						set((state) => ({
							items: state.items.map((item) =>
									item.id === productId && item.selectedWeight === selectedWeight
											? {...item, quantity}
											: item
							),
						}));
					},
					
					clearCart: () => set({items: []}),
					
					toggleCart: () => set((state) => ({isOpen: !state.isOpen})),
					
					openCart: () => set({isOpen: true}),
					
					closeCart: () => set({isOpen: false}),
					
					getTotalItems: () => {
						return get().items.reduce((total, item) => total + item.quantity, 0);
					},
					
					getTotalPrice: () => {
						return get().items.reduce(
								(total, item) => total + item.selectedPrice * item.quantity,
								0
						);
					},
				}),
				{
					name: 'taybac-cart',
					partialize: (state) => ({items: state.items}),
				}
		)
);
