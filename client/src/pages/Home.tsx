import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/store/auth";

const Home = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		if (user?.role === "admin") {
			navigate("/admin/dashboard");
		} else {
			navigate("/customer/menu");
		}
	}, []);

	return <div>Home</div>;
};

export default Home;
