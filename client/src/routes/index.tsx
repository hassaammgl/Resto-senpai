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

const routes = [
	{
		path: "/",
		element: <Dashboard />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/signup",
		element: <SignupPage />,
	},
	{
		path: "/admin/orders",
		element: <OrdersPage />,
	},
	{
		path: "/admin/menu",
		element: <MenuPage />,
	},
	{
		path: "/admin/tables",
		element: <TablesPage />,
	},
	{
		path: "/admin/staff",
		element: <StaffPage />,
	},
	{
		path: "/admin/inventory",
		element: <InventoryPage />,
	},
	{
		path: "/admin/promotions",
		element: <PromotionsPage />,
	},
	{
		path: "/admin/settings",
		element: <SettingsPage />,
	},
	{
		path: "*",
		element: <NotFound />,
	},
];

export default routes;
