// workin on Add to cart func

import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import type { CartState } from "@/types";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
	withCredentials: true,
});

const getErrorMessage = (err: any): string => {
	return (
		err?.response?.data?.message ||
		err?.message ||
		"Something went wrong. Please try again."
	);
};

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
					set({ dishes: [...data.data] });
				} catch (err: any) {
					const errorMessage = getErrorMessage(err);
					set({ error: errorMessage });
					throw new Error(errorMessage);
				} finally {
					set({ isLoading: false });
				}
			},
			addToCart: (item) => {
				const cartItems = get().cartItems;
				const existingIndex = cartItems.findIndex(
					(cartItem) => cartItem._id === item._id
				);

				let updatedCart;
				if (existingIndex !== -1) {
					// If item exists, increase quantity
					updatedCart = cartItems.map((cartItem, idx) =>
						idx === existingIndex
							? {
									...cartItem,
									itemQuantity:
										(cartItem.itemQuantity || 1) + 1,
							  }
							: cartItem
					);
				} else {
					// If item doesn't exist, add with quantity 1
					updatedCart = [...cartItems, { ...item, quantity: 1 }];
				}
				set({ cartItems: updatedCart,});
			},
			clearError: () => set({ error: null }),
		}),
		{
			name: "cart-storage",
			partialize: (state) => ({
				cartItems: state.cartItems,
			}),
		}
	)
);
