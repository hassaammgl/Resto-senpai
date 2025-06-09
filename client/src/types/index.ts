import type { ReactNode } from "react";

export interface AppLayoutProps {
	children: ReactNode;
}

type AuthUser = {
	_id: string;
	name: string;
	email: string;
	role: string;
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
