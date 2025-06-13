import AppLayout from "@/layout/AppLayout";
import StatCard from "@/components/shared/StatCard";
import OrderCard from "@/components/shared/OrderCard";
import { DollarSign, Users, ClipboardList, TrendingUp } from "lucide-react";

const Dashboard = () => {
	const stats = [
		{
			title: "Today's Revenue",
			value: "$2,847",
			icon: DollarSign,
			trend: "+12% from yesterday",
			trendUp: true,
		},
		{
			title: "Active Orders",
			value: 23,
			icon: ClipboardList,
			trend: "8 pending",
			trendUp: false,
		},
		{
			title: "Tables Occupied",
			value: "12/16",
			icon: Users,
			trend: "75% occupancy",
			trendUp: true,
		},
		{
			title: "Avg Order Value",
			value: "$34.50",
			icon: TrendingUp,
			trend: "+5% this week",
			trendUp: true,
		},
	];

	const recentOrders = [
		{
			id: "001",
			tableNumber: 5,
			customer: "John Smith",
			items: ["Caesar Salad", "Grilled Salmon", "Wine"],
			status: "preparing" as const,
			time: "12:30 PM",
			total: 45.99,
		},
		{
			id: "002",
			tableNumber: 3,
			customer: "Mary Johnson",
			items: ["Burger", "Fries", "Coke"],
			status: "ready" as const,
			time: "12:25 PM",
			total: 18.5,
		},
		{
			id: "003",
			tableNumber: 8,
			customer: "David Wilson",
			items: ["Pasta", "Garlic Bread"],
			status: "pending" as const,
			time: "12:35 PM",
			total: 22.75,
		},
	];

	return (
		<AppLayout>
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">
						Dashboard
					</h1>
					<p className="text-gray-600 dark:text-white/70">
						Welcome back! Here's what's happening at your restaurant
						today.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{stats.map((stat, index) => (
						<StatCard
							className="dark:bg-black border-accent"
							key={index}
							{...stat}
						/>
					))}
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-6 dark:text-white">
							Recent Orders
						</h2>
						<div className="space-y-4">
							{recentOrders.map((order) => (
								<OrderCard key={order.id} {...order} />
							))}
						</div>
					</div>

					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-6 dark:text-white">
							Quick Actions
						</h2>
						<div className="bg-white border-accent dark:bg-black rounded-lg shadow-md p-6 border">
							<div className="space-y-4">
								<button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
									Add New Order
								</button>
								<button className="w-full dark:bg-black bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors dark:text-white/70">
									Manage Tables
								</button>
								<button className="w-full dark:bg-black bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors dark:text-white/70">
									View Menu
								</button>
								<button className="w-full dark:bg-black bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors dark:text-white/70">
									Generate Report
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</AppLayout>
	);
};

export default Dashboard;
