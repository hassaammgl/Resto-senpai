import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import type { AuthState } from "@/types";

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

export const useAuth = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			isAuthenticated: false,
			isLoading: false,
			error: null,

			signup: async (email, name, password, phone, role) => {
				try {
					set({ isLoading: true, error: null });

					const { data } = await axiosInstance.post(
						"/api/auth/register",
						{
							email,
							password,
							name,
							phone,
							role,
						}
					);

					set({ user: data.data, isAuthenticated: true });
				} catch (err: any) {
					const errorMessage = getErrorMessage(err);
					set({ error: errorMessage });
					throw new Error(errorMessage);
				} finally {
					set({ isLoading: false });
				}
			},

			login: async (email, password) => {
				try {
					set({ isLoading: true, error: null });

					const { data } = await axiosInstance.post(
						"/api/auth/login",
						{
							email,
							password,
						}
					);

					set({ user: data.data, isAuthenticated: true });
				} catch (err: any) {
					const errorMessage = getErrorMessage(err);
					set({ error: errorMessage });
					throw new Error(errorMessage);
				} finally {
					set({ isLoading: false });
				}
			},

			logout: async () => {
				try {
					await axiosInstance.post("/api/auth/logout");
				} catch (err) {
					console.error("Logout error:", err);
				} finally {
					set({ user: null, isAuthenticated: false });
				}
			},
			updateAddress: async (data) => {
				
			},
			checkIsAuthenticated: async () => {
				try {
					set({ isLoading: true, error: null });

					const { data } = await axiosInstance.get(
						"/api/auth/profile"
					);

					set({
						user: data.data,
						isAuthenticated: true,
					});
				} catch (err) {
					set({
						user: null,
						isAuthenticated: false,
					});
				} finally {
					set({ isLoading: false });
				}
			},

			clearError: () => set({ error: null }),
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}),
		}
	)
);
