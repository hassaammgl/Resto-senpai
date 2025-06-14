import Layout from "@/layout/AppLayout";
import TableCard from "@/components/shared/TableCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const TablesPage = () => {
	const tables = [
		{
			number: 1,
			capacity: 2,
			status: "occupied" as const,
			occupiedSince: "11:30 AM",
		},
		{ number: 2, capacity: 4, status: "available" as const },
		{
			number: 3,
			capacity: 6,
			status: "reserved" as const,
			reservedFor: "2:00 PM",
		},
		{
			number: 4,
			capacity: 2,
			status: "occupied" as const,
			occupiedSince: "12:15 PM",
		},
		{ number: 5, capacity: 4, status: "available" as const },
		{
			number: 6,
			capacity: 8,
			status: "occupied" as const,
			occupiedSince: "11:45 AM",
		},
		{ number: 7, capacity: 2, status: "available" as const },
		{
			number: 8,
			capacity: 4,
			status: "reserved" as const,
			reservedFor: "1:30 PM",
		},
	];

	const availableCount = tables.filter(
		(t) => t.status === "available"
	).length;
	const occupiedCount = tables.filter((t) => t.status === "occupied").length;
	const reservedCount = tables.filter((t) => t.status === "reserved").length;

	return (
		<Layout>
			<div className="space-y-8">
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">
							Table Management
						</h1>
						<p className="text-gray-600 dark:text-white/70">
							Monitor and manage your restaurant tables in
							real-time.
						</p>
					</div>
					<Button className="bg-amber-600 hover:bg-amber-700 dark:text-white">
						<Plus className="h-4 w-4 mr-2" />
						Add Table
					</Button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="bg-green-50 dark:bg-black  border border-accent rounded-lg p-6">
						<h3 className="text-lg font-semibold dark:text-green-600 text-green-800 mb-2">
							Available
						</h3>
						<p className="text-3xl font-bold text-green-600 dark:text-green-400">
							{availableCount}
						</p>
					</div>
					<div className="bg-red-50 dark:bg-black border border-accent rounded-lg p-6">
						<h3 className="text-lg font-semibold text-red-800 dark:text-red-600 mb-2">
							Occupied
						</h3>
						<p className="text-3xl font-bold text-red-600 dark:text-red-400">
							{occupiedCount}
						</p>
					</div>
					<div className="bg-yellow-50 dark:bg-black border border-accent rounded-lg p-6">
						<h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-600 mb-2">
							Reserved
						</h3>
						<p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
							{reservedCount}
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{tables.map((table) => (
						<TableCard key={table.number} {...table} />
					))}
				</div>
			</div>
		</Layout>
	);
};

export default TablesPage;
