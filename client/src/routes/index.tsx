import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import Dashboard from "@/pages/admin/Dashboard";
import NotFound from "@/pages/admin/NotFound";
import OrdersPage from "@/pages/admin/OrdersPage";
import MenuPage from "@/pages/admin/MenuPage";
import TablesPage from "@/pages/admin/TablesPage";
import StaffPage from "@/pages/admin/StaffPage";
import InventoryPage from "@/pages/admin/InventoryPage";
import PromotionsPage from "@/pages/admin/PromotionsPage";
import SettingsPage from "@/pages/admin/SettingsPage";
// import CustomerCartPage from "@/pages/customer/CustomerCartPage";
// import CustomerMenuPage from "@/pages/customer/CustomerMenuPage";
// import CustomerOrdersPage from "@/pages/customer/CustomerOrdersPage";
// import CustomerProfilePage from "@/pages/customer/CustomerProfilePage";
import Home from "@/pages/Home";
import { AuthGuard } from "./AuthGuard";

const routes = [
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/signup",
		element: <SignupPage />,
	},
	{
		path: "/",
		element: (
			<AuthGuard>
				<Home />
			</AuthGuard>
		),
	},
	{
		path: "/admin/dashboard",
		element: (
			<AuthGuard>
				<Dashboard />
			</AuthGuard>
		),
	},
	{
		path: "/admin/orders",
		element: (
			<AuthGuard>
				<OrdersPage />
			</AuthGuard>
		),
	},
	{
		path: "/admin/menu",
		element: (
			<AuthGuard>
				<MenuPage />
			</AuthGuard>
		),
	},
	{
		path: "/admin/tables",
		element: (
			<AuthGuard>
				<TablesPage />
			</AuthGuard>
		),
	},
	{
		path: "/admin/staff",
		element: (
			<AuthGuard>
				<StaffPage />
			</AuthGuard>
		),
	},
	{
		path: "/admin/inventory",
		element: (
			<AuthGuard>
				<InventoryPage />
			</AuthGuard>
		),
	},
	{
		path: "/admin/promotions",
		element: (
			<AuthGuard>
				<PromotionsPage />
			</AuthGuard>
		),
	},
	{
		path: "/admin/settings",
		element: (
			<AuthGuard>
				<SettingsPage />
			</AuthGuard>
		),
	},
	// {
	// 	path: "/customer/cart",
	// 	element: (
	// 		<AuthGuard>
	// 			<CustomerCartPage />
	// 		</AuthGuard>
	// 	),
	// },
	// {
	// 	path: "/customer/menu",
	// 	element: (
	// 		<AuthGuard>
	// 			<CustomerMenuPage />
	// 		</AuthGuard>
	// 	),
	// },
	// {
	// 	path: "/customer/orders",
	// 	element: (
	// 		<AuthGuard>
	// 			<CustomerOrdersPage />
	// 		</AuthGuard>
	// 	),
	// },
	// {
	// 	path: "/customer/profile",
	// 	element: (
	// 		<AuthGuard>
	// 			<CustomerProfilePage />
	// 		</AuthGuard>
	// 	),
	// },
	{
		path: "*",
		element: <NotFound />,
	},
];

export default routes;
