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
import { useState } from "react";
import { useToast } from "@/hooks/useToast";
import { AxiosError } from "axios";

const CustomerProfilePage = () => {
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
					<UpdateUserDetails />
					<DeliveryAddressDetails />

				</div>
			</div>
		</CustomerLayout>
	);
};

const UpdateUserDetails = () => {
	const { user, updateCustomerDetails } = useAuth();
	const { success, error } = useToast()

	const [userDetails, setUserDetails] = useState({
		name: user?.name ?? "",
		phone: user?.phone ?? "",
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserDetails({
			...userDetails,
			[name]: value
		})
	}

	const handleSubmit = async () => {
		try {
			console.table(userDetails);
			await updateCustomerDetails(userDetails);
			success("User details updated successfully! 🎉");
		} catch (err) {
			const message =
				(err as AxiosError<{ message?: string }>)?.response?.data
					?.message ??
				(err as Error)?.message ??
				"Failed to update user details 😵";
			error(message);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
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
						<Input onChange={handleChange} id="name" name="name" value={userDetails.name} />
					</div>
					<div>
						<Label htmlFor="phone">Phone</Label>
						<Input onChange={handleChange} id="phone" name="phone" value={userDetails.phone} />
					</div>
					<Button type="submit" className="bg-green-600 hover:bg-green-700">
						Save Changes
					</Button>
				</CardContent>
			</Card>
		</form>
	)
}

const DeliveryAddressDetails = () => {
	const { user } = useAuth();
	const handleSubmit = async () => { }

	return (
		<form onSubmit={handleSubmit}>
			<Card>
				<CardHeader>
					<CardTitle>Delivery Address</CardTitle>
					<CardDescription>
						Manage your delivery addresses
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex gap-4">
						<div className="flex gap-1 flex-col">
							<Label htmlFor="street">
								Street Address
							</Label>
							<Input
								id="street"
								value={
									user?.address?.street
								}
							/>
						</div>
						<div className="flex gap-1 flex-col">
							<Label htmlFor="city">City</Label>
							<Input
								id="city"
								value={
									user?.address?.city
								}
							/>
						</div>
					</div>
					<div className="flex gap-4">
						<div className="flex gap-1 flex-col">
							<Label htmlFor="state">State</Label>
							<Input
								id="state"
								value={
									user?.address?.state
								}
							/>
						</div>
						<div className="flex gap-1 flex-col">
							<Label htmlFor="zip">
								ZIP Code
							</Label>
							<Input
								id="zip"
								value={
									user?.address?.zipCode
								}
							/>
						</div>
					</div>
					<Button type="submit" className="bg-green-600 hover:bg-green-700">
						Update Address
					</Button>
				</CardContent>
			</Card>
		</form>
	)
}

export default CustomerProfilePage;
