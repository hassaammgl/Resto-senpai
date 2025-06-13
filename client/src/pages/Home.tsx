import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/store/auth";

const Home = () => {
	const { user, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		console.log(isAuthenticated);
		console.log(user);

		if (isAuthenticated === false) {
			navigate("/login");
		} else if (user?.role === "admin") {
			navigate("/admin/dashboard");
		} else if (user?.role === "user") {
			navigate("/customer/menu");
		}
	}, []);

	return <div>Home</div>;
};

export default Home;
