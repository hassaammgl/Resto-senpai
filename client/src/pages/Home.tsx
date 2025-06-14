import { useNavigate } from "react-router";
import { useAuth } from "@/store/auth";
import { useToast } from "@/hooks/useToast";
import { useEffect } from "react";

const Home = () => {
	const { user, isAuthenticated } = useAuth();
	const { message } = useToast();
	const redirect = useNavigate();

	useEffect(() => {
		if (isAuthenticated === null) return;
		if (isAuthenticated === false) {
			redirect("/login");
			return;
		}
		if (user?.role === "admin") {
			if (!user?.address) {
				message("kindly update your address");
				redirect("/admin/settings");
			} else {
				redirect("/admin/dashboard");
			}
		} else if (user?.role === "user") {
			if (!user?.address) {
				message("kindly update your address");
				redirect("/customer/profile");
			} else {
				redirect("/customer/menu");
			}
		}
	}, [isAuthenticated, user, message, redirect]);

	return null;
};

export default Home;
