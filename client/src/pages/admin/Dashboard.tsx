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
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Dashboard
					</h1>
					<p className="text-gray-600">
						Welcome back! Here's what's happening at your restaurant
						today.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{stats.map((stat, index) => (
						<StatCard key={index} {...stat} />
					))}
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-6">
							Recent Orders
						</h2>
						<div className="space-y-4">
							{recentOrders.map((order) => (
								<OrderCard key={order.id} {...order} />
							))}
						</div>
					</div>

					<div>
						<h2 className="text-2xl font-bold text-gray-900 mb-6">
							Quick Actions
						</h2>
						<div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
							<div className="space-y-4">
								<button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
									Add New Order
								</button>
								<button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors">
									Manage Tables
								</button>
								<button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors">
									View Menu
								</button>
								<button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors">
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
