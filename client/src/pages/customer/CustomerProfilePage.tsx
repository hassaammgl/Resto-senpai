import CustomerLayout from "@/layout/CustomerLayout";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/store/auth";

const CustomerProfilePage = () => {
	const { user } = useAuth();

	return (
		<CustomerLayout>
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">
						My Profile
					</h1>
					<p className="text-gray-600 dark:text-white/60">
						Manage your account information
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<Card>
						<CardHeader>
							<CardTitle>Personal Information</CardTitle>
							<CardDescription>
								Update your personal details
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<Label htmlFor="name">Full Name</Label>
								<Input id="name" defaultValue={user?.name} />
							</div>
							<div>
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									defaultValue={user?.email}
								/>
							</div>
							<div>
								<Label htmlFor="phone">Phone</Label>
								<Input id="phone" defaultValue={user?.phone} />
							</div>
							<Button className="bg-green-600 hover:bg-green-700">
								Save Changes
							</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Delivery Address</CardTitle>
							<CardDescription>
								Manage your delivery addresses
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<Label htmlFor="address">Street Address</Label>
								<Input
									id="address"
									defaultValue={user?.address?.street}
									placeholder="Kalma Chowk..."
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label htmlFor="city">City</Label>
									<Input
										id="city"
										defaultValue={user?.address?.city}
										placeholder="Islamabad..."
									/>
								</div>
								<div>
									<Label htmlFor="zip">ZIP Code</Label>
									<Input
										id="zip"
										defaultValue={user?.address?.zipCode}
										placeholder="234..."
									/>
								</div>
							</div>
							<Button className="bg-green-600 hover:bg-green-700">
								Update Address
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</CustomerLayout>
	);
};

export default CustomerProfilePage;
