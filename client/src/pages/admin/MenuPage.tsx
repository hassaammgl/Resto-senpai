import Layout from "@/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/useToast";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from "@/components/ui/dialog";
import CountUp from "@/blocks/TextAnimations/CountUp/CountUp";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import ImageUploader from "@/components/shared/ImageUploader";

const MenuPage = () => {
	return (
		<Layout>
			<div className="space-y-8">
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">
							Menu Management
						</h1>
						<p className="text-gray-600 dark:text-white/70">
							Manage your restaurant's menu items and pricing.
						</p>
					</div>
					<AddDishForm />
				</div>
				<div className="flex gap-2 flex-wrap">
					{categories.map((category) => (
						<Button key={category} variant="outline" size="sm">
							{category}
						</Button>
					))}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{menuItems.map((item) => (
						<div
							key={item.id}
							style={{
								backgroundImage: `url(${item.image})`,
							}}
							className={`bg-menu-img border-accent bg-no-repeat bg-center bg-cover rounded-lg shadow-md border overflow-hidden hover:shadow-lg transition-shadow h-96 flex items-end`}
						>
							<div className="backdrop-blur-[1px] mix-blend-difference w-full p-6">
								<div className="flex justify-between items-start mb-4 ">
									<div className="flex gap-2">
										<Badge
											className="mix-blend-difference"
											variant={
												item.available
													? "default"
													: "secondary"
											}
										>
											{item.available
												? "Available"
												: "Out of Stock"}
										</Badge>
										<Badge
											className="mix-blend-difference"
											variant="outline"
										>
											{item.category}
										</Badge>
									</div>
								</div>

								<h3 className="text-xl text-white mix-blend-difference font-bold mb-2">
									{item.name}
								</h3>
								<p className="text-gray-200 mix-blend-difference text-sm mb-4">
									{item.description}
								</p>

								<div className="flex  justify-between items-center">
									<span className="text-2xl mix-blend-difference font-bold text-amber-600">
										pkr <CountUp from={0} to={item.price} />
									</span>
									<div className="flex gap-2">
										<Button size="sm" variant="outline">
											<Edit className="h-4 w-4" />
										</Button>
										<Button
											size="sm"
											variant="outline"
											className="text-red-600 hover:text-red-700"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default MenuPage;

const AddDishForm = () => {
	const { error, success } = useToast();
	const [isAddItem, setIsAddItem] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	console.log(isAddItem);

	const validateForm = () => {
		const newErrors: Record<string, string> = {};
		// if (!formData.email.trim()) {
		// 	newErrors.email = "Email is required";
		// } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
		// 	newErrors.email = "Email is invalid";
		// }
		// if (!formData.password) {
		// 	newErrors.password = "Password is required";
		// } else if (formData.password.length < 6) {
		// 	newErrors.password = "Password must be at least 6 characters";
		// }
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const submitAddMenuItem = async (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			try {
				console.table(formData);
				// const { email, password } = formData;
				// await login(email, password);
				success("Item added successfully! 🎉");
				// navigate("/");
			} catch (err) {
				const message =
					(err as AxiosError<{ message?: string }>)?.response?.data
						?.message ??
					(err as Error)?.message ??
					"Login Failed failed 😵";
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
		<Dialog>
			<DialogTrigger>
				<Button
					onClick={() => setIsAddItem((prev) => !prev)}
					className="bg-amber-600 text-white hover:bg-amber-700"
				>
					<Plus className="size-4 " />
					Add Menu Item
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Dishes</DialogTitle>
					<DialogDescription>
						Add your dishes for menu..
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={submitAddMenuItem} className="space-y-4">
					<div>
						<Label htmlFor="name" className="mb-2">
							Name:
						</Label>
						<Input
							id="name"
							type="text"
							value={formData.name}
							onChange={(e) =>
								handleInputChange("name", e.target.value)
							}
							placeholder="Enter your dish name."
							className={errors.name ? "border-red-500" : ""}
						/>
						{errors.name && (
							<p className="text-red-500 text-sm mt-1">
								{errors.name}
							</p>
						)}
					</div>
					{/* <ImageUploader /> */}
					<div>
						<Label htmlFor="description" className="mb-2">
							Description:
						</Label>
						<Input
							id="description"
							type="text"
							value={formData.description}
							onChange={(e) =>
								handleInputChange("description", e.target.value)
							}
							placeholder="Enter your dish description."
							className={
								errors.description ? "border-red-500" : ""
							}
						/>
						{errors.description && (
							<p className="text-red-500 text-sm mt-1">
								{errors.description}
							</p>
						)}
					</div>
					<div>
						<Label htmlFor="price" className="mb-2">
							Price:
						</Label>
						<Input
							id="price"
							type="number"
							value={formData.price}
							onChange={(e) =>
								handleInputChange("price", e.target.value)
							}
							placeholder="Enter your dish price."
							className={errors.price ? "border-red-500" : ""}
						/>
						{errors.price && (
							<p className="text-red-500 text-sm mt-1">
								{errors.price}
							</p>
						)}
					</div>
					<div>
						<Label htmlFor="category" className="mb-2">
							Category:
						</Label>
						<Select
							value={formData.category}
							onValueChange={(e) =>
								handleInputChange("category", e)
							}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Category" />
							</SelectTrigger>
							<SelectContent>
								{[
									"Appetizer",
									"Main Course",
									"Side",
									"Dessert",
								].map((c, i) => (
									<SelectItem key={i} value={c.toLowerCase()}>
										{c}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{errors.price && (
							<p className="text-red-500 text-sm mt-1">
								{errors.price}
							</p>
						)}
					</div>
					<ImageUploader />
					<DialogFooter>
						<Button
							type="submit"
							className="w-full dark:text-amber-50 bg-amber-600 hover:bg-amber-700"
						>
							Add Item
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

const categories = ["All", "Appetizer", "Main Course", "Side", "Dessert"];
const menuItems = [
	{
		id: 1,
		name: "Grilled Salmon",
		description: "Fresh Atlantic salmon with herbs and lemon",
		price: 28.99,
		category: "Main Course",
		image: "/1.jpg",
		available: true,
	},
	{
		id: 2,
		name: "Caesar Salad",
		description: "Crisp romaine lettuce with parmesan and croutons",
		price: 14.99,
		category: "Appetizer",
		image: "/2.jpg",
		available: true,
	},
	{
		id: 3,
		name: "Beef Burger",
		description: "Juicy beef patty with fresh vegetables",
		price: 16.99,
		category: "Main Course",
		image: "/1.jpg",
		available: false,
	},
	{
		id: 4,
		name: "Chocolate Cake",
		description: "Rich chocolate cake with vanilla ice cream",
		price: 8.99,
		category: "Dessert",
		image: "/3.jpg",
		available: true,
	},
	{
		id: 5,
		name: "Margherita Pizza",
		description: "Classic pizza with tomato, mozzarella, and basil",
		price: 18.99,
		category: "Main Course",
		image: "/2.jpg",
		available: true,
	},
	{
		id: 6,
		name: "French Fries",
		description: "Crispy golden fries with sea salt",
		price: 6.99,
		category: "Side",
		image: "/1.jpg",
		available: true,
	},
];
