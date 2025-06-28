import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/store/auth";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated, checkIsAuthenticated, isLoading } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		checkIsAuthenticated();
	}, [checkIsAuthenticated]);

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			navigate("/login");
		}
	}, [isLoading, isAuthenticated, navigate]);

	// if (isLoading) {
	// 	return (
	// 		<div className="min-h-screen flex items-center justify-center">
	// 			<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-solo-blue"></div>
	// 		</div>
	// 	);
	// }

	if (!isAuthenticated) {
		return null;
	}

	return <>{children}</>;
};
