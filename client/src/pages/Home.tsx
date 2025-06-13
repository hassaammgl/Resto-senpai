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
		} else {
			navigate("/customer/menu");
		}
	}, []);

	return <div>Home</div>;
};

export default Home;

/**
 * 
 * "name": "ratthedead",
	"email": "abc@xyz.com",
	"password": "En61n33r_8844",
	"role": "admin"
 */
