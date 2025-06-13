import { create } from "zustand";
import { persist } from "zustand/middleware";
// import axios from "axios";
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

export const useAuth = create<CartState>()(
	persist(
		(set) => ({
			cart: null,
			error: null,
			clearError: () => set({ error: null }),
		}),
		{
			name: "cart-storage",
			partialize: (state) => ({
				cart: state.cart,
			}),
		}
	)
);
