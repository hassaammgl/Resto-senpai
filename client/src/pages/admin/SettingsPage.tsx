import Layout from "@/layout/AppLayout";
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
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/store/auth";
import { useEffect } from "react";

const SettingsPage = () => {
	const { user } = useAuth();
	useEffect(() => {
		console.log(user);
	}, []);

	return (
		<Layout>
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">
						Settings
					</h1>
					<p className="text-gray-600">
						Configure your restaurant management system.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<Card>
						<CardHeader>
							<CardTitle>Restaurant Information</CardTitle>
							<CardDescription>
								Update your restaurant's basic information
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<Label htmlFor="restaurant-name">
									Restaurant Name
								</Label>
								<Input
									id="restaurant-name"
									defaultValue="The Golden Fork"
								/>
							</div>
							<div>
								<Label htmlFor="address">Address</Label>
								<div className="w-full flex justify-between flex-wrap">
									<div className="flex w-full justify-between items-center gap-2">
										<Input
											id="city"
											defaultValue={user?.address?.city}
											placeholder="Lahore..."
											className="w-1/2 my-2"
										/>
										<Input
											id="state"
											className="w-1/2 my-2"
											defaultValue={user?.address?.state}
											placeholder="Punjab..."
										/>
									</div>
									<div className="flex w-full justify-between items-center gap-2">
										<Input
											id="street"
											defaultValue={user?.address?.street}
											className="w-1/2 my-2"
											placeholder="Kalma Chowk..."
										/>
										<Input
											id="zip code"
											defaultValue={
												user?.address?.zipCode
											}
											className="w-1/2 my-2"
											placeholder="1234"
										/>
									</div>
								</div>
							</div>
							<div>
								<Label htmlFor="phone">Phone</Label>
								<Input id="phone" defaultValue={user?.phone} />
							</div>
							<div>
								<Label htmlFor="email">Email</Label>
								<Input id="email" defaultValue={user?.email} />
							</div>
							<Button className="bg-amber-600 hover:bg-amber-700">
								Save Changes
							</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Notifications</CardTitle>
							<CardDescription>
								Configure your notification preferences
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<Label htmlFor="new-orders">
										New Orders
									</Label>
									<p className="text-sm text-gray-600">
										Get notified when new orders arrive
									</p>
								</div>
								<Switch id="new-orders" defaultChecked />
							</div>
							<div className="flex items-center justify-between">
								<div>
									<Label htmlFor="low-stock">
										Low Stock Alerts
									</Label>
									<p className="text-sm text-gray-600">
										Alert when inventory is running low
									</p>
								</div>
								<Switch id="low-stock" defaultChecked />
							</div>
							<div className="flex items-center justify-between">
								<div>
									<Label htmlFor="table-requests">
										Table Requests
									</Label>
									<p className="text-sm text-gray-600">
										Notify for table service requests
									</p>
								</div>
								<Switch id="table-requests" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Operating Hours</CardTitle>
							<CardDescription>
								Set your restaurant's operating schedule
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label htmlFor="open-time">
										Opening Time
									</Label>
									<Input
										id="open-time"
										type="time"
										defaultValue="09:00"
									/>
								</div>
								<div>
									<Label htmlFor="close-time">
										Closing Time
									</Label>
									<Input
										id="close-time"
										type="time"
										defaultValue="22:00"
									/>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div>
									<Label htmlFor="weekend-hours">
										Different Weekend Hours
									</Label>
									<p className="text-sm text-gray-600">
										Use different hours for weekends
									</p>
								</div>
								<Switch id="weekend-hours" />
							</div>
							<Button className="bg-amber-600 hover:bg-amber-700">
								Update Hours
							</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>System Preferences</CardTitle>
							<CardDescription>
								Configure system-wide settings
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<Label htmlFor="currency">Currency</Label>
								<Input id="currency" defaultValue="USD ($)" />
							</div>
							<div>
								<Label htmlFor="tax-rate">Tax Rate (%)</Label>
								<Input
									id="tax-rate"
									type="number"
									defaultValue="8.5"
								/>
							</div>
							<div className="flex items-center justify-between">
								<div>
									<Label htmlFor="auto-print">
										Auto-print Orders
									</Label>
									<p className="text-sm text-gray-600">
										Automatically print new orders
									</p>
								</div>
								<Switch id="auto-print" defaultChecked />
							</div>
							<Button className="bg-amber-600 hover:bg-amber-700">
								Save Preferences
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</Layout>
	);
};

export default SettingsPage;
