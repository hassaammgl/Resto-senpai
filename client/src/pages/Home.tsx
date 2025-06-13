import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/store/auth";
import { useToast } from "@/hooks/useToast";

const Home = () => {
	const { user, isAuthenticated } = useAuth();
	const { message } = useToast();
	const navigate = useNavigate();
	useEffect(() => {
		if (isAuthenticated === false) {
			navigate("/login");
		} else if (user?.role === "admin") {
			if (user?.address === undefined) {
				message("kindly update your address");
				navigate("/admin/settings");
			} else {
				navigate("/admin/dashboard");
			}
		} else if (user?.role === "user") {
			if (user?.address === undefined) {
				message("kindly update your address");
				navigate("/customer/profile");
			} else {
				navigate("/customer/menu");
			}
		}
	}, []);

	return <div>redirecting...</div>;
};

export default Home;
