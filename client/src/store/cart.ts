import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import type { CartState } from "@/types";

// const axiosInstance = axios.create({
// 	baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
// 	withCredentials: true,
// });

// const getErrorMessage = (err: any): string => {
// 	return (
// 		err?.response?.data?.message ||
// 		err?.message ||
// 		"Something went wrong. Please try again."
// 	);
// };

// export const useCart = create<CartState>()(
// 	persist(
// 		(set, get) => ({
// 			cartItems: [],
// 			dishes: [],
// 			isLoading: false,
// 			pricings: 0,
// 			error: null,
// 			getDishes: async () => {
// 				try {
// 					set({ isLoading: true, error: null });
// 					const { data } = await axiosInstance.get(
// 						"/api/menu/get-all-dishes"
// 					);
// 					set({ dishes: [...data.data] });
// 				} catch (err: any) {
// 					const errorMessage = getErrorMessage(err);
// 					set({ error: errorMessage });
// 					throw new Error(errorMessage);
// 				} finally {
// 					set({ isLoading: false });
// 				}
// 			},
// 			addToCart: (item) => {
// 				const { cartItems } = get();
// 				const existingItem = cartItems.find((i) => i._id === item._id);

// 				if (existingItem) {
// 				} else {
// 				}
// 			},
// 			clearError: () => set({ error: null }),
// 		}),
// 		{
// 			name: "cart-items-storage",
// 			partialize: (state) => ({
// 				cartItems: state.cartItems,
// 			}),
// 		}
// 	)
// );

import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";


// === Axios Setup ===

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
	withCredentials: true,
});

// === Error Extractor ===

const getErrorMessage = (err: any): string => {
	return (
		err?.response?.data?.message ||
		err?.message ||
		"Something went wrong. Please try again."
	);
};

// === Zustand Store ===

export const useCart = create<CartState>()(
	persist(
		(set, get) => ({
			cartItems: [],
			dishes: [],
			isLoading: false,
			pricings: 0,
			error: null,
			getDishes: async () => {
				try {
					set({ isLoading: true, error: null });
					const { data } = await axiosInstance.get(
						"/api/menu/get-all-dishes"
					);
					set({ dishes: data.data });
				} catch (err: any) {
					const errorMessage = getErrorMessage(err);
					set({ error: errorMessage });
					throw new Error(errorMessage);
				} finally {
					set({ isLoading: false });
				}
			},
			addToCart: (item) => {
				if (!item._id) return;
				const { cartItems, calculateTotal } = get();

				const existingItem = cartItems.find((i) => i._id === item._id);

				let updatedCart: CartStore[] = [];

				if (existingItem) {
					updatedCart = cartItems.map((i) =>
						i._id === item._id
							? {
									...i,
									quantity: i.quantity + 1,
									totalPrice:
										i.priceOfEach * (i.quantity + 1),
							  }
							: i
					);
				} else {
					updatedCart = [
						...cartItems,
						{ ...item, quantity: 1, totalPrice: item.priceOfEach },
					];
				}

				set({
					cartItems: updatedCart,
					pricings: calculateTotal(updatedCart),
				});
			},
			removeFromCart: (id) => {
				const updatedCart = get().cartItems.filter(
					(item) => item._id !== id
				);
				set({
					cartItems: updatedCart,
					pricings: get().calculateTotal(updatedCart),
				});
			},
			updateQuantity: (id, newQuantity) => {
				if (newQuantity < 1) {
					get().removeFromCart(id);
					return;
				}

				const updatedCart = get().cartItems.map((item) =>
					item._id === id
						? {
								...item,
								quantity: newQuantity,
								totalPrice: item.priceOfEach * newQuantity,
						  }
						: item
				);

				set({
					cartItems: updatedCart,
					pricings: get().calculateTotal(updatedCart),
				});
			},
			clearCart: () => {
				set({ cartItems: [], pricings: 0 });
			},
			calculateTotal: (items = get().cartItems) => {
				return items.reduce((sum, item) => sum + item.totalPrice, 0);
			},
			hasItemInCart: (id) => {
				return get().cartItems.some((item) => item._id === id);
			},
			clearError: () => set({ error: null }),
		}),
		{
			name: "cart-items-storage",
			partialize: (state) => ({
				cartItems: state.cartItems,
				pricings: state.pricings,
			}),
		}
	)
);
