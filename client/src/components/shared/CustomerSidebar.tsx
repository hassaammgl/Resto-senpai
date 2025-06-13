import { Home, ClipboardList, User, ChefHat, ShoppingCart } from "lucide-react";
import { NavLink as Link, useLocation, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { useAuth } from "@/store/auth";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/useToast";
import { AxiosError } from "axios";

const CustomerSidebar = () => {
	const location = useLocation();
	const { logout } = useAuth();
	const { success, error } = useToast();

	const navigate = useNavigate();

	const menuItems = [
		{ icon: Home, label: "Browse Menu", path: "/customer/menu" },
		{
			icon: ShoppingCart,
			label: "Cart",
			path: "/customer/cart",
			badge: 1,
		},
		{ icon: ClipboardList, label: "My Orders", path: "/customer/orders" },
		{ icon: User, label: "Profile", path: "/customer/profile" },
	];

	const onClickLogout = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await logout();
			success("Good bye! 🎉");
			navigate("/login");
		} catch (err) {
			const message =
				(err as AxiosError<{ message?: string }>)?.response?.data
					?.message ??
				(err as Error)?.message ??
				"Logout Failed failed 😵";
			error(message);
		}
	};

	return (
		<div className="w-64 bg-gradient-to-b from-green-900 to-green-800 text-white h-screen fixed left-0 top-0 shadow-xl">
			<div className="p-6 border-b border-green-700">
				<h1 className="text-2xl font-bold flex items-center gap-2">
					<ChefHat className="h-8 w-8" />
					RestaurantOS
				</h1>
				<p className="text-green-200 text-sm mt-1">Customer Portal</p>
			</div>

			<nav className="mt-8 px-4">
				{menuItems.map((item) => {
					const Icon = item.icon;
					const isActive = location.pathname === item.path;

					return (
						<Link
							key={item.path}
							to={item.path}
							className={cn(
								"flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 hover:bg-green-700 hover:translate-x-1",
								isActive && "bg-green-700 shadow-lg"
							)}
						>
							<Icon className="h-5 w-5" />
							<span className="font-medium flex-1">
								{item.label}
							</span>
							{item.badge && (
								<Badge className="bg-orange-500 text-white">
									{item.badge}
								</Badge>
							)}
						</Link>
					);
				})}
			</nav>

			<div className="absolute bottom-4 left-4 right-4">
				<button
					onClick={onClickLogout}
					className="w-full bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors"
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default CustomerSidebar;
