import type { ReactNode } from "react";

export interface AppLayoutProps {
	children: ReactNode;
}

type UserAddress = {
	street: string;
	city: string;
	zipCode: string;
	state: string;
};

type AuthUser = {
	_id: string;
	name: string;
	email: string;
	role: string;
	phone: string;
	loyaltyPoints?: string;
	address?: UserAddress | null;
};

export type AuthState = {
	user: AuthUser | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
	login: (email: string, password: string) => Promise<void>;
	signup: (
		name: string,
		email: string,
		phoneNumber: string,
		role: string,
		password: string
	) => Promise<void>;
	logout: () => Promise<void>;
	checkIsAuthenticated: () => Promise<void>;
	clearError: () => void;
};

export interface DishData {
	_id?: string;
	name: string;
	description: string;
	price: number;
	category: string;
	image: string;
	available?: boolean;
	quantity?: number;
}

export interface MenuState {
	menuItems: DishData[];
	isLoading: boolean;
	error: string | null;
	addDishToMenu: (data: DishData) => Promise<void>;
	updateDishDetails: (data: DishData) => Promise<void>;
	deleteDish: (_id: string) => Promise<void>;
	getAllDishes: () => Promise<void>;
	clearError: () => void;
}
