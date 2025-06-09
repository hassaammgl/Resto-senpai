import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
	title: string;
	value: string | number;
	icon: LucideIcon;
	trend?: string;
	trendUp?: boolean;
	className?: string;
}

const StatCard = ({
	title,
	value,
	icon: Icon,
	trend,
	trendUp,
	className,
}: StatCardProps) => {
	return (
		<div
			className={cn(
				"bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 hover:border-amber-200",
				className
			)}
		>
			<div className="flex items-center justify-between">
				<div>
					<p className="text-gray-600 text-sm font-medium">{title}</p>
					<p className="text-3xl font-bold text-gray-900 mt-2">
						{value}
					</p>
					{trend && (
						<p
							className={cn(
								"text-sm mt-2 flex items-center gap-1",
								trendUp ? "text-green-600" : "text-red-600"
							)}
						>
							{trend}
						</p>
					)}
				</div>
				<div className="bg-amber-100 p-3 rounded-lg">
					<Icon className="h-8 w-8 text-amber-600" />
				</div>
			</div>
		</div>
	);
};

export default StatCard;
