import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import type { MenuState } from "@/types";

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

export const useMenu = create<MenuState>()(
	persist(
		(set) => ({
			menuItems: [],
			isLoading: false,
			error: null,
			addDishToMenu: async (itemdata) => {
				try {
					set({ isLoading: true, error: null });

					const { data } = await axiosInstance.post(
						"/api/menu/add-dish",
						{
							...itemdata,
						}
					);

					set({ menuItems: [...data.data] });
				} catch (err: any) {
					const errorMessage = getErrorMessage(err);
					set({ error: errorMessage });
					throw new Error(errorMessage);
				} finally {
					set({ isLoading: false });
				}
			},
			getAllDishes: async () => {
				try {
					set({ isLoading: true, error: null });
					const { data } = await axiosInstance.get(
						"/api/menu/get-all-dishes"
					);
					set({ menuItems: [...data.data] });
				} catch (err: any) {
					const errorMessage = getErrorMessage(err);
					set({ error: errorMessage });
					throw new Error(errorMessage);
				} finally {
					set({ isLoading: false });
				}
			},
			updateDishDetails: async (itemdata) => {
				try {
					set({ isLoading: true, error: null });

					const { data } = await axiosInstance.post(
						"/api/menu/update-dish",
						{
							...itemdata,
						}
					);
					set({ menuItems: [...data.data] });
				} catch (err: any) {
					const errorMessage = getErrorMessage(err);
					set({ error: errorMessage });
					throw new Error(errorMessage);
				} finally {
					set({ isLoading: false });
				}
			},
			deleteDish: async (_id) => {
				try {
					set({ isLoading: true, error: null });

					const { data } = await axiosInstance.delete(
						`/api/menu/delete-dish/${_id}`
					);
					set({ menuItems: [...data.data] });
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
			name: "menu-storage",
			partialize: (state) => ({
				cart: state.menuItems,
			}),
		}
	)
);
