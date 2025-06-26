import type { ReactNode } from "react";

export interface AppLayoutProps {
	children: ReactNode;
}

type UserAddress = {
	street: string | undefined;
	city: string | undefined;
	zipCode: string | undefined;
	state: string | undefined;
};

type AuthUser = {
	_id: string;
	name: string;
	email: string;
	role: string;
	phone: string;
	loyaltyPoints?: string | undefined;
	address?: UserAddress | null;
	restorantName?: string;
};

interface UpdateAddressInterface extends UserAddress {
	phone: string | undefined;
	restorantName: string | undefined;
}

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
	updateAddress: (data: UpdateAddressInterface) => Promise<void>;
	checkIsAuthenticated: () => Promise<void>;
	clearError: () => void;
};

export interface MenuState {
	menuItems: DishData[];
	isLoading: boolean;
	error: string | null;
	addDishToMenu: (data: DishData) => Promise<void>;
	updateDishDetails: (data: DishData) => Promise<void>;
	deleteDish: (_id: string | undefined) => Promise<void>;
	getAllDishes: () => Promise<void>;
	clearError: () => void;
}

export interface CartStore {
	_id?: string;
	name: string;
	priceOfEach: number;
	totalPrice: number;
	image: string;
	quantity: number;
	prepTime: string;
}

export interface DishData {
	_id?: string;
	name: string;
	description: string;
	price: number;
	category: string;
	image: string;
	available?: boolean;
	quantity?: number;
	calories: number;
	isVegetarian: boolean;
	isPopular: boolean;
	prepTime: string;
	rating: number;
}

export interface CartState {
	cartItems: CartStore[];
	dishes: DishData[];
	isLoading: boolean;
	error: string | null;
	pricings: number;
	getDishes: () => Promise<void>;
	addToCart: (item: CartStore) => void;
	removeFromCart: (id: string | undefined) => void;
	updateQuantity: (id: string | undefined, newQuantity: number) => void;
	clearCart: () => void;
	calculateTotal: (items?: CartStore[]) => number;
	hasItemInCart: (id: string) => boolean;
	clearError: () => void;
}
