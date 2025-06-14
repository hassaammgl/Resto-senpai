import { Navigate } from "react-router";
import { useAuth } from "@/store/auth";
import { useToast } from "@/hooks/useToast";
import { useState, useEffect } from "react";

const Home = () => {
	const { user, isAuthenticated } = useAuth();
	const { message } = useToast();
	const [myPath, setMyPath] = useState("/");

	useEffect(() => {
		if (isAuthenticated === false) {
			setMyPath("login");
		} else if (user?.role === "admin") {
			if (user?.address === undefined) {
				message("kindly update your address");
				setMyPath("/admin/settings");
			} else {
				setMyPath("/admin/dashboard");
			}
		} else if (user?.role === "user") {
			if (user?.address === undefined) {
				message("kindly update your address");
				setMyPath("/customer/profile");
			} else {
				setMyPath("/customer/menu");
			}
		}
	}, [isAuthenticated, user]);

	if (myPath !== "/") {
		return <Navigate to={myPath} />;
	}

	return null;
};

export default Home;
