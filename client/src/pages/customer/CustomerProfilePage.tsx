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
import React, { useState } from "react";
import { useToast } from "@/hooks/useToast";
import { AxiosError } from "axios";
import Loader from "@/components/shared/Loader";

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
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserDetails({
			...userDetails,
			[name]: value
		})
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)
		try {
			console.table(userDetails);
			await updateCustomerDetails(userDetails);
			success("User details updated successfully! 🎉");
			setIsLoading(false)
		} catch (err) {
			const message =
				(err as AxiosError<{ message?: string }>)?.response?.data
					?.message ??
				(err as Error)?.message ??
				"Failed to update user details 😵";
			error(message);
			setIsLoading(false)
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
						{isLoading && <Loader size={1} />}	Save Changes
					</Button>
				</CardContent>
			</Card>
		</form>
	)
}

const DeliveryAddressDetails = () => {

	const { user, updateCustomerAddress } = useAuth();
	const { success, error } = useToast()

	const [userDetails, setUserDetails] = useState({
		street: user?.address?.street ?? "",
		city: user?.address?.city ?? "",
		state: user?.address?.state ?? "",
		zipCode: user?.address?.zipCode ?? "",
	})
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserDetails({
			...userDetails,
			[name]: value
		})
	}

	console.log(user);
	

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)
		try {
			console.table(userDetails);
			await updateCustomerAddress(userDetails);
			success("User address updated successfully! 🎉");
			setIsLoading(false)
		} catch (err) {
			const message =
				(err as AxiosError<{ message?: string }>)?.response?.data
					?.message ??
				(err as Error)?.message ??
				"Failed to update user address 😵";
			error(message);
			setIsLoading(false)
		}
	}

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
								name="street"
								value={
									user?.address?.street
								}
								onChange={handleChange}
							/>
						</div>
						<div className="flex gap-1 flex-col">
							<Label htmlFor="city">City</Label>
							<Input
								id="city"
								name="city"
								value={
									user?.address?.city
								}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="flex gap-4">
						<div className="flex gap-1 flex-col">
							<Label htmlFor="state">State</Label>
							<Input
								name="state"
								id="state"
								value={
									user?.address?.state
								}
								onChange={handleChange}
							/>
						</div>
						<div className="flex gap-1 flex-col">
							<Label htmlFor="zip">
								ZIP Code
							</Label>
							<Input
								id="zipCode"
								name="zipCode"
								value={
									user?.address?.zipCode
								}
								onChange={handleChange}
							/>
						</div>
					</div>
					<Button type="submit" className="bg-green-600 hover:bg-green-700">
						{isLoading && <Loader size={1} />}	Update Address
					</Button>
				</CardContent>
			</Card>
		</form>
	)
}

export default CustomerProfilePage;
