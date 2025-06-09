import Layout from "@/layout/AppLayout";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Plus,
	Edit,
	Trash2,
	Percent,
	Gift,
	Calendar,
	Users,
	TrendingUp,
} from "lucide-react";

const PromotionsPage = () => {
	const promotions = [
		{
			id: "1",
			title: "Happy Hour Special",
			description: "50% off on all appetizers from 4-6 PM",
			type: "percentage",
			value: 50,
			category: "appetizers",
			startDate: "2024-06-01",
			endDate: "2024-06-30",
			status: "active",
			usageCount: 156,
			maxUsage: 500,
			code: "HAPPY50",
		},
		{
			id: "2",
			title: "Free Delivery Weekend",
			description: "Free delivery on orders over $25 during weekends",
			type: "free_delivery",
			value: 0,
			category: "delivery",
			startDate: "2024-06-01",
			endDate: "2024-12-31",
			status: "active",
			usageCount: 89,
			maxUsage: 1000,
			code: "FREEDEL",
		},
		{
			id: "3",
			title: "Student Discount",
			description: "15% off for students with valid ID",
			type: "percentage",
			value: 15,
			category: "all",
			startDate: "2024-01-01",
			endDate: "2024-12-31",
			status: "active",
			usageCount: 234,
			maxUsage: null,
			code: "STUDENT15",
		},
		{
			id: "4",
			title: "Buy 2 Get 1 Free Pizza",
			description: "Get one free pizza when you order 2 pizzas",
			type: "bogo",
			value: 1,
			category: "pizza",
			startDate: "2024-05-15",
			endDate: "2024-05-31",
			status: "expired",
			usageCount: 67,
			maxUsage: 100,
			code: "PIZZA321",
		},
		{
			id: "5",
			title: "New Customer Special",
			description: "$10 off your first order over $30",
			type: "fixed_amount",
			value: 10,
			category: "all",
			startDate: "2024-06-01",
			endDate: "2024-12-31",
			status: "active",
			usageCount: 45,
			maxUsage: 200,
			code: "WELCOME10",
		},
	];

	const getStatusColor = (status: string) => {
		switch (status) {
			case "active":
				return "bg-green-100 text-green-800";
			case "expired":
				return "bg-red-100 text-red-800";
			case "scheduled":
				return "bg-blue-100 text-blue-800";
			case "paused":
				return "bg-yellow-100 text-yellow-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getTypeIcon = (type: string) => {
		switch (type) {
			case "percentage":
				return <Percent className="h-4 w-4" />;
			case "fixed_amount":
				return <Gift className="h-4 w-4" />;
			case "free_delivery":
				return <TrendingUp className="h-4 w-4" />;
			case "bogo":
				return <Users className="h-4 w-4" />;
			default:
				return <Gift className="h-4 w-4" />;
		}
	};

	const activePromotions = promotions.filter((p) => p.status === "active");
	const totalUsage = promotions.reduce((sum, p) => sum + p.usageCount, 0);

	return (
		<Layout>
			<div className="space-y-8">
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 mb-2">
							Promotions & Offers
						</h1>
						<p className="text-gray-600">
							Create and manage promotional campaigns to boost
							sales
						</p>
					</div>
					<Button className="bg-amber-600 hover:bg-amber-700">
						<Plus className="h-4 w-4 mr-2" />
						Create Promotion
					</Button>
				</div>

				{/* Summary Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Active Promotions
							</CardTitle>
							<Gift className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{activePromotions.length}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Usage
							</CardTitle>
							<Users className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{totalUsage}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Most Popular
							</CardTitle>
							<TrendingUp className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-lg font-bold">
								Student Discount
							</div>
							<div className="text-sm text-gray-600">
								234 uses
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Revenue Impact
							</CardTitle>
							<TrendingUp className="h-4 w-4 text-green-500" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-green-600">
								+12.5%
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Create New Promotion Form */}
				<Card>
					<CardHeader>
						<CardTitle>Quick Create Promotion</CardTitle>
						<CardDescription>
							Create a new promotional offer
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div>
								<Label htmlFor="promo-title">
									Promotion Title
								</Label>
								<Input
									id="promo-title"
									placeholder="e.g., Weekend Special"
								/>
							</div>
							<div>
								<Label htmlFor="promo-type">Type</Label>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Select type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="percentage">
											Percentage Discount
										</SelectItem>
										<SelectItem value="fixed_amount">
											Fixed Amount Off
										</SelectItem>
										<SelectItem value="free_delivery">
											Free Delivery
										</SelectItem>
										<SelectItem value="bogo">
											Buy One Get One
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div>
								<Label htmlFor="promo-value">Value</Label>
								<Input
									id="promo-value"
									placeholder="e.g., 20"
									type="number"
								/>
							</div>
						</div>
						<div className="mt-4">
							<Label htmlFor="promo-description">
								Description
							</Label>
							<Textarea
								id="promo-description"
								placeholder="Describe your promotion..."
							/>
						</div>
						<div className="flex justify-end mt-4">
							<Button className="bg-amber-600 hover:bg-amber-700">
								Create Promotion
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Promotions List */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{promotions.map((promo) => (
						<Card
							key={promo.id}
							className="hover:shadow-lg transition-shadow"
						>
							<CardHeader>
								<div className="flex justify-between items-start">
									<div className="flex items-center gap-2">
										{getTypeIcon(promo.type)}
										<CardTitle className="text-lg">
											{promo.title}
										</CardTitle>
									</div>
									<Badge
										className={getStatusColor(promo.status)}
									>
										{promo.status}
									</Badge>
								</div>
								<CardDescription>
									{promo.description}
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-600">
										Promo Code:
									</span>
									<code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
										{promo.code}
									</code>
								</div>

								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-600">
										Value:
									</span>
									<span className="font-medium">
										{promo.type === "percentage" &&
											`${promo.value}% off`}
										{promo.type === "fixed_amount" &&
											`$${promo.value} off`}
										{promo.type === "free_delivery" &&
											"Free delivery"}
										{promo.type === "bogo" &&
											`Buy 2 Get ${promo.value} Free`}
									</span>
								</div>

								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-600">
										Usage:
									</span>
									<span className="font-medium">
										{promo.usageCount}
										{promo.maxUsage &&
											` / ${promo.maxUsage}`}
									</span>
								</div>

								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-600">
										Valid Until:
									</span>
									<span className="font-medium">
										{new Date(
											promo.endDate
										).toLocaleDateString()}
									</span>
								</div>

								{promo.maxUsage && (
									<div className="w-full bg-gray-200 rounded-full h-2">
										<div
											className="bg-amber-600 h-2 rounded-full"
											style={{
												width: `${
													(promo.usageCount /
														promo.maxUsage) *
													100
												}%`,
											}}
										></div>
									</div>
								)}

								<div className="flex gap-2 pt-2">
									<Button
										variant="outline"
										size="sm"
										className="flex-1"
									>
										<Edit className="h-4 w-4 mr-1" />
										Edit
									</Button>
									<Button
										variant="outline"
										size="sm"
										className="flex-1"
									>
										<Calendar className="h-4 w-4 mr-1" />
										Schedule
									</Button>
									<Button
										variant="outline"
										size="sm"
										className="text-red-600 hover:text-red-700"
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default PromotionsPage;
