import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";

interface OrderCardProps {
	id: string;
	tableNumber: number;
	customer: string;
	items: string[];
	status: "pending" | "preparing" | "ready" | "delivered";
	time: string;
	total: number;
}

const OrderCard = ({
	id,
	tableNumber,
	customer,
	items,
	status,
	time,
	total,
}: OrderCardProps) => {
	const getStatusColor = (status: string) => {
		switch (status) {
			case "pending":
				return "bg-yellow-100 text-yellow-800";
			case "preparing":
				return "bg-blue-100 text-blue-800";
			case "ready":
				return "bg-green-100 text-green-800";
			case "delivered":
				return "bg-gray-100 text-gray-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className="bg-white dark:bg-black border-accent rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border">
			<div className="flex justify-between items-start mb-4">
				<div>
					<h3 className="font-bold text-lg">Order #{id}</h3>
					<div className="flex items-center gap-2 text-gray-600 dark:text-white/70 mt-1">
						<User className="h-4 w-4" />
						<span>{customer}</span>
						<span>• Table {tableNumber}</span>
					</div>
				</div>
				<Badge className={getStatusColor(status)}>
					{status.charAt(0).toUpperCase() + status.slice(1)}
				</Badge>
			</div>

			<div className="mb-4">
				<p className="text-gray-700 text-sm">{items.join(", ")}</p>
			</div>

			<div className="flex justify-between items-center">
				<div className="flex items-center gap-1 text-gray-500 text-sm">
					<Clock className="h-4 w-4" />
					<span>{time}</span>
				</div>
				<span className="font-bold text-lg text-amber-600">
					${total.toFixed(2)}
				</span>
			</div>
		</div>
	);
};

export default OrderCard;
