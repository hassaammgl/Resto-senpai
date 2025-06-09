import CustomerLayout from "@/layout/CustomerLayout";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, Truck } from "lucide-react";

const CustomerOrdersPage = () => {
	const orders = [
		{
			id: "ORD-001",
			date: "2024-06-03",
			time: "2:30 PM",
			status: "preparing",
			items: ["Caesar Salad", "Grilled Salmon"],
			total: 37.98,
			estimatedTime: "15 minutes",
		},
		{
			id: "ORD-002",
			date: "2024-06-02",
			time: "7:45 PM",
			status: "delivered",
			items: ["Margherita Pizza", "Chocolate Cake"],
			total: 27.98,
			estimatedTime: "Delivered",
		},
		{
			id: "ORD-003",
			date: "2024-06-01",
			time: "1:15 PM",
			status: "ready",
			items: ["Caesar Salad", "Chocolate Cake"],
			total: 21.98,
			estimatedTime: "Ready for pickup",
		},
	];

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "preparing":
				return <Clock className="h-4 w-4" />;
			case "ready":
				return <CheckCircle className="h-4 w-4" />;
			case "delivered":
				return <Truck className="h-4 w-4" />;
			default:
				return <Clock className="h-4 w-4" />;
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "preparing":
				return "bg-yellow-100 text-yellow-800";
			case "ready":
				return "bg-green-100 text-green-800";
			case "delivered":
				return "bg-blue-100 text-blue-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<CustomerLayout>
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						My Orders
					</h1>
					<p className="text-gray-600">
						Track your order history and current orders
					</p>
				</div>

				<div className="space-y-4">
					{orders.map((order) => (
						<Card
							key={order.id}
							className="hover:shadow-lg transition-shadow"
						>
							<CardHeader>
								<div className="flex justify-between items-start">
									<div>
										<CardTitle className="flex items-center gap-2">
											Order {order.id}
											<Badge
												className={getStatusColor(
													order.status
												)}
											>
												{getStatusIcon(order.status)}
												<span className="ml-1 capitalize">
													{order.status}
												</span>
											</Badge>
										</CardTitle>
										<CardDescription>
											{order.date} at {order.time}
										</CardDescription>
									</div>
									<div className="text-right">
										<p className="text-2xl font-bold text-green-600">
											${order.total.toFixed(2)}
										</p>
										<p className="text-sm text-gray-600">
											{order.estimatedTime}
										</p>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<div>
									<h4 className="font-medium mb-2">Items:</h4>
									<ul className="text-gray-600">
										{order.items.map((item, index) => (
											<li
												key={index}
												className="flex justify-between"
											>
												<span>• {item}</span>
											</li>
										))}
									</ul>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</CustomerLayout>
	);
};

export default CustomerOrdersPage;
