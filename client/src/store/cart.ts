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
		(set) => ({
			cartItems: [],
			dishes: [],
			isLoading: false,
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
			clearError: () => set({ error: null }),
		}),
		{
			name: "cart-storage",
			partialize: (state) => ({
				cart: state.cartItems,
			}),
		}
	)
);
