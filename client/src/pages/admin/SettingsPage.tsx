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
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";
import type { AxiosError } from "axios";

const SettingsPage = () => {
	return (
		<Layout>
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">
						Settings
					</h1>
					<p className="text-gray-600 dark:text-white/70">
						Configure your restaurant management system.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<RestorantInformation />
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
					<WorkingHours />
					<SystemPrefrences />
				</div>
			</div>
		</Layout>
	);
};

const RestorantInformation = () => {
	const { user, updateAddress } = useAuth();
	const { success, error } = useToast();

	useEffect(() => {
		console.log(user);
	}, []);

	const [updateUserData, setUpdateUserData] = useState({
		phone: user?.phone,
		city: user?.address?.city,
		state: user?.address?.state,
		street: user?.address?.street,
		zipCode: user?.address?.zipCode,
		restorantName: user?.restorantName,
	});
	const handleInputChange = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = e.target;
		setUpdateUserData((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	const handleUpdate = async () => {
		try {
			console.table(updateUserData);
			await updateAddress(updateUserData);
			success("Address updated successfully! 🎉");
		} catch (err) {
			const message =
				(err as AxiosError<{ message?: string }>)?.response?.data
					?.message ??
				(err as Error)?.message ??
				"Failed to update address 😵";
			error(message);
		}
	};
	return (
		<Card>
			<CardHeader>
				<CardTitle>Restaurant Information</CardTitle>
				<CardDescription>
					Update your restaurant's basic information
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div>
					<Label className="mb-2" htmlFor="restaurant-name">
						Restaurant Name
					</Label>
					<Input
						id="restorantName"
						name="restorantName"
						placeholder="The Golden Fork..."
						value={updateUserData.restorantName}
						onChange={handleInputChange}
					/>
				</div>
				<div className="w-full flex justify-between flex-wrap">
					<div className="flex w-full justify-between items-center gap-2">
						<div className="">
							<Label className="mb-2" htmlFor="city">
								City
							</Label>
							<Input
								id="city"
								name="city"
								value={updateUserData.city}
								placeholder="Lahore..."
								className="w-full my-2"
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Label className="mb-2" htmlFor="city">
								State
							</Label>
							<Input
								id="state"
								name="state"
								className="w-full my-2"
								value={updateUserData.state}
								placeholder="Punjab..."
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="flex w-full justify-between items-center gap-2">
						<div>
							<Label className="mb-2" htmlFor="street">
								Street
							</Label>
							<Input
								id="street"
								name="street"
								value={updateUserData.street}
								className="w-full my-2"
								placeholder="Kalma Chowk..."
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<Label className="mb-2" htmlFor="zipCode">
								Zip Code
							</Label>
							<Input
								id="zipCode"
								name="zipCode"
								value={updateUserData.zipCode}
								type="number"
								className="w-full my-2"
								placeholder="1234"
								onChange={handleInputChange}
							/>
						</div>
					</div>
				</div>
				<div>
					<Label className="mb-2" htmlFor="phone">
						Phone
					</Label>
					<Input
						name="phone"
						value={updateUserData.phone}
						onChange={handleInputChange}
					/>
				</div>
				<Button
					onClick={handleUpdate}
					className="bg-amber-600 hover:bg-amber-700 dark:text-white"
				>
					Save Changes
				</Button>
			</CardContent>
		</Card>
	);
};

const WorkingHours = () => {
	return (
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
						<Label htmlFor="open-time">Opening Time</Label>
						<Input
							id="open-time"
							type="time"
							defaultValue="09:00"
						/>
					</div>
					<div>
						<Label htmlFor="close-time">Closing Time</Label>
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
	);
};

const SystemPrefrences = () => {
	return (
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
					<Input id="tax-rate" type="number" defaultValue="8.5" />
				</div>
				<div className="flex items-center justify-between">
					<div>
						<Label htmlFor="auto-print">Auto-print Orders</Label>
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
	);
};

export default SettingsPage;
