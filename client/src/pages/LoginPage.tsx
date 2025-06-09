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
import { ChefHat } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "@/store/auth";
import { ModeToggle } from "@/components/mode-toggle";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/useToast";

const LoginPage = () => {
	const { login } = useAuth();
	const { success, error } = useToast();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

	const validateForm = () => {
		const newErrors: Record<string, string> = {};
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
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			try {
				console.table(formData);
				const { email, password } = formData;
				await login(email, password);
				success("Account created successfully! 🎉");
				navigate("/home");
			} catch (err) {
				const message =
					(err as AxiosError<{ message?: string }>)?.response?.data
						?.message ??
					(err as Error)?.message ??
					"Signup failed 😵";
				error(message);
			}
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
			<div className="fixed top-6 right-6">
				<ModeToggle />
			</div>
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="flex items-center justify-center gap-2 mb-2">
						<ChefHat className="h-8 w-8 text-amber-600" />
						<CardTitle className="text-2xl font-bold">
							Resto-Senpai
						</CardTitle>
					</div>
					<CardDescription>Login to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
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
						<Button
							type="submit"
							className="w-full bg-amber-600 hover:bg-amber-700"
						>
							Login
						</Button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-sm text-gray-600">
							Don't have an account?{" "}
							<NavLink
								to={"/signup"}
								className="text-amber-600 hover:text-amber-700 font-medium"
							>
								Register
							</NavLink>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default LoginPage;
