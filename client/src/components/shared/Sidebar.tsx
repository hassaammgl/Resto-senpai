import {
	Home,
	Users,
	Menu,
	ClipboardList,
	Settings,
	ChefHat,
	LogOut,
	Package,
	Percent,
} from "lucide-react";
import { NavLink as Link, useLocation, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { useAuth } from "@/store/auth";
import { useToast } from "@/hooks/useToast";
import { AxiosError } from "axios";
import { ModeToggle } from "@/components/mode-toggle";

const Sidebar = () => {
	const location = useLocation();
	const { logout, user } = useAuth();
	const { success, error } = useToast();

	const navigate = useNavigate();

	const menuItems = [
		{ icon: Home, label: "Dashboard", path: "/admin/dashboard" },
		{ icon: ClipboardList, label: "Orders", path: "/admin/orders" },
		{ icon: Menu, label: "Menu", path: "/admin/menu" },
		{ icon: Users, label: "Tables", path: "/admin/tables" },
		{ icon: ChefHat, label: "Staff", path: "/admin/staff" },
		{ icon: Package, label: "Inventory", path: "/admin/inventory" },
		{ icon: Percent, label: "Promotions", path: "/admin/promotions" },
		{ icon: Settings, label: "Settings", path: "/admin/settings" },
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
		<div className="w-64 bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 from-amber-900 to-amber-600 text-white h-screen fixed left-0 top-0 shadow-xl">
			<div className="p-6 border-b border-amber-700">
				<h1 className="text-2xl font-bold flex items-center gap-2">
					<ChefHat className="h-8 w-8" />
					Resto-Senpai
				</h1>
				<p className="text-amber-200 text-sm mt-1 flex justify-between items-center">
					<span>
						{user?.name}
						<sup className="font-bold">(Admin)</sup>
					</span>
					<ModeToggle />
				</p>
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
								"flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 hover:bg-amber-700 hover:translate-x-1",
								isActive && "bg-amber-700 shadow-lg"
							)}
						>
							<Icon className="h-5 w-5" />
							<span className="font-medium">{item.label}</span>
						</Link>
					);
				})}
			</nav>

			<div className="absolute bottom-4 left-4 right-4">
				<button
					onClick={onClickLogout}
					className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-amber-700 hover:bg-amber-600 transition-colors"
				>
					<LogOut className="h-5 w-5" />
					<span className="font-medium">Logout</span>
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
