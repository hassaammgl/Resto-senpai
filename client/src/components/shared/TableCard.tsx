import { cn } from "@/lib/utils";
import { Users, Clock } from "lucide-react";

interface TableCardProps {
	number: number;
	capacity: number;
	status: "available" | "occupied" | "reserved";
	occupiedSince?: string;
	reservedFor?: string;
}

const TableCard = ({
	number,
	capacity,
	status,
	occupiedSince,
	reservedFor,
}: TableCardProps) => {
	const getStatusColor = (status: string) => {
		switch (status) {
			case "available":
				return "bg-green-50 border-accent text-green-800 dark:text-green-400 dark:bg-green-900  ";
			case "occupied":
				return "bg-red-50 border-accent text-red-800 dark:text-red-400 dark:bg-red-900";
			case "reserved":
				return "bg-yellow-50 border-accent dark:text-yellow-400 text-yellow-800 dark:bg-yellow-900";
			default:
				return "bg-gray-50 border-accent text-gray-800 dark:text-gray-400 dark:bg-gray-900";
		}
	};

	return (
		<div
			className={cn(
				"rounded-lg border-2 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer",
				getStatusColor(status)
			)}
		>
			<div className="text-center">
				<h3 className="text-2xl font-bold mb-2">Table {number}</h3>
				<div className="flex items-center justify-center gap-1 mb-3">
					<Users className="h-4 w-4" />
					<span className="text-sm">{capacity} seats</span>
				</div>

				<div className="text-xs uppercase font-semibold tracking-wide mb-2">
					{status}
				</div>

				{occupiedSince && (
					<div className="flex items-center justify-center gap-1 text-xs">
						<Clock className="h-3 w-3" />
						<span>Since {occupiedSince}</span>
					</div>
				)}

				{reservedFor && (
					<div className="text-xs">Reserved for {reservedFor}</div>
				)}
			</div>
		</div>
	);
};

export default TableCard;
