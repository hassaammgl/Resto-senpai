import { Navigate } from "react-router";
import { useAuth } from "@/store/auth";
import { useToast } from "@/hooks/useToast";

const Home = () => {
	const { user, isAuthenticated } = useAuth();
	const { message } = useToast();
	if (isAuthenticated === false) {
		return <Navigate to={"login"} />;
	} else if (user?.role === "admin") {
		if (user?.address === undefined) {
			message("kindly update your address");
			return <Navigate to={"/admin/settings"} />;
		} else {
			return <Navigate to={"/admin/dashboard"} />;
		}
	} else if (user?.role === "user") {
		if (user?.address === undefined) {
			message("kindly update your address");
			return <Navigate to={"/customer/profile"} />;
		} else {
			return <Navigate to={"/customer/menu"} />;
		}
	// } else {
	// 	return <Navigate to={"login"} />;
	}
};

export default Home;

// if (isAuthenticated === false) {
// 	navigate("/login");
// } else if (user?.role === "admin") {
// 	if (user?.address === undefined) {
// 		message("kindly update your address");
// 		navigate("/admin/settings");
// 	} else {
// 		navigate("/admin/dashboard");
// 	}
// } else if (user?.role === "user") {
// 	if (user?.address === undefined) {
// 		message("kindly update your address");
// 		navigate("/customer/profile");
// 	} else {
// 		navigate("/customer/menu");
// 	}
// }
