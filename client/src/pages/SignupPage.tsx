import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ChefHat } from "lucide-react";

const SignupPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		phone: "",
		role: "customer" as "customer" | "admin",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}

		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		if (!formData.phone.trim()) {
			newErrors.phone = "Phone number is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			console.log("Registration data:", formData);
			// login(formData.email, formData.password);
		}
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="flex items-center justify-center gap-2 mb-2">
						<ChefHat className="h-8 w-8 text-amber-600" />
						<CardTitle className="text-2xl font-bold">
							RestaurantOS
						</CardTitle>
					</div>
					<CardDescription>Create your account</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<Label htmlFor="name">Full Name</Label>
							<Input
								id="name"
								type="text"
								value={formData.name}
								onChange={(e) =>
									handleInputChange("name", e.target.value)
								}
								placeholder="Enter your full name"
								className={errors.name ? "border-red-500" : ""}
							/>
							{errors.name && (
								<p className="text-red-500 text-sm mt-1">
									{errors.name}
								</p>
							)}
						</div>

						<div>
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								value={formData.email}
								onChange={(e) =>
									handleInputChange("email", e.target.value)
								}
								placeholder="Enter your email"
								className={errors.email ? "border-red-500" : ""}
							/>
							{errors.email && (
								<p className="text-red-500 text-sm mt-1">
									{errors.email}
								</p>
							)}
						</div>

						<div>
							<Label htmlFor="phone">Phone Number</Label>
							<Input
								id="phone"
								type="tel"
								value={formData.phone}
								onChange={(e) =>
									handleInputChange("phone", e.target.value)
								}
								placeholder="Enter your phone number"
								className={errors.phone ? "border-red-500" : ""}
							/>
							{errors.phone && (
								<p className="text-red-500 text-sm mt-1">
									{errors.phone}
								</p>
							)}
						</div>

						<div>
							<Label htmlFor="role">Account Type</Label>
							<Select
								value={formData.role}
								onValueChange={(value: "customer" | "admin") =>
									handleInputChange("role", value)
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select account type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="customer">
										Customer
									</SelectItem>
									<SelectItem value="admin">
										Restaurant Admin
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								value={formData.password}
								onChange={(e) =>
									handleInputChange(
										"password",
										e.target.value
									)
								}
								placeholder="Create a password"
								className={
									errors.password ? "border-red-500" : ""
								}
							/>
							{errors.password && (
								<p className="text-red-500 text-sm mt-1">
									{errors.password}
								</p>
							)}
						</div>

						<div>
							<Label htmlFor="confirmPassword">
								Confirm Password
							</Label>
							<Input
								id="confirmPassword"
								type="password"
								value={formData.confirmPassword}
								onChange={(e) =>
									handleInputChange(
										"confirmPassword",
										e.target.value
									)
								}
								placeholder="Confirm your password"
								className={
									errors.confirmPassword
										? "border-red-500"
										: ""
								}
							/>
							{errors.confirmPassword && (
								<p className="text-red-500 text-sm mt-1">
									{errors.confirmPassword}
								</p>
							)}
						</div>

						<Button
							type="submit"
							className="w-full bg-amber-600 hover:bg-amber-700"
						>
							Create Account
						</Button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-sm text-gray-600">
							Already have an account?{" "}
							<button className="text-amber-600 hover:text-amber-700 font-medium">
								Login
							</button>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default SignupPage;
