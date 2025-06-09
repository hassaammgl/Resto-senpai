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
import { NavLink } from "react-router";
import { ModeToggle } from "@/components/mode-toggle";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	// const handleAdminLogin = () => {};

	// const handleCustomerLogin = () => {};

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
			<div className="absolute top-10 border-2">
				<ModeToggle />
			</div>
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl font-bold">
						Resto-Senpai
					</CardTitle>
					<CardDescription>Sign in to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<Label className="py-2" htmlFor="email">
								Email
							</Label>
							<Input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter your email"
								required
							/>
						</div>
						<div>
							<Label className="py-2" htmlFor="password">
								Password
							</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter your password"
								required
							/>
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
								className={"text-amber-500"}
								to={"/signup"}
							>
								Sign up
							</NavLink>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default LoginPage;
