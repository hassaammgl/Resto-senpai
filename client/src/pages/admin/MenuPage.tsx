import Layout from "@/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/useToast";
import { useMenu } from "@/store/menu";
import { AxiosError } from "axios";
import type { DishData } from "@/types/index";

const categories = ["Appetizer", "Main Course", "Side", "Dessert"];
const allCategories = ["All", ...categories];
const Menu = () => {
	const { isLoading, menuItems, getAllDishes, deleteDish } = useMenu();
	const { info, error } = useToast();
	const [isRefetch, setIsRefetch] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			await getAllDishes();
		})();
	}, [isRefetch]);

	const toogleFetch = () => setIsRefetch((prev) => !prev);

	const handleDelete = async (_id: string | undefined) => {
		try {
			console.log(_id);
			await deleteDish(_id);
			info("Item deleted successfully! 🎉");
		} catch (err) {
			const message =
				(err as AxiosError<{ message?: string }>)?.response?.data
					?.message ??
				(err as Error)?.message ??
				"Failed to delete item 😵";
			error(message);
		}
		toogleFetch();
	};

	return (
		<Layout>
			<div className="space-y-8">
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">
							Menu Management
						</h1>
						<p className="text-gray-600 dark:text-white/70">
							Manage your restaurant's menu items and pricing.
						</p>
					</div>

					<AddMenuItem toogleFetch={toogleFetch} />
				</div>

				<div className="flex gap-2 flex-wrap">
					{allCategories.map((category) => (
						<Button key={category} variant="outline" size="sm">
							{category}
						</Button>
					))}
				</div>

				{isLoading ? (
					"Loading..."
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{menuItems.map((item) => (
							<div
								key={item._id}
								className="bg-white p-4 dark:bg-black border-accent rounded-lg shadow-md border overflow-hidden hover:shadow-lg transition-shadow"
							>
								{item.image && (
									<img
										src={item.image}
										alt={item.name}
										className="w-full rounded-xl h-80 object-cover"
									/>
								)}
								<div className="p-6">
									<div className="flex justify-between items-start mb-4">
										<div className="flex gap-2">
											<Badge
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
											<Badge variant="outline">
												{item.category}
											</Badge>
										</div>
										<span className="font-bold">
											Quantity
											<span className="text-amber-600 ml-4">
												{item.quantity}
											</span>
										</span>
									</div>

									<h3 className="text-xl font-bold dark:text-white text-gray-900 mb-2">
										{item.name}
									</h3>
									<p className="text-gray-600 dark:text-white/70 text-sm mb-4">
										{item.description}
									</p>
									<div className="flex justify-between items-center">
										<span className="text-2xl font-bold text-amber-600">
											Rs. {item.price}
										</span>
										<div className="flex gap-2">
											<EditDishDetails item={item} />
											<Button
												onClick={() =>
													handleDelete(item?._id)
												}
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
				)}
			</div>
		</Layout>
	);
};

const EditDishDetails = ({ item }: { item: DishData }) => {
	const categories = ["Appetizer", "Main Course", "Side", "Dessert"];

	const { updateDishDetails, isLoading } = useMenu();
	const { error, success } = useToast();

	const [newItem, setNewItem] = useState({
		_id: item._id,
		name: item.name,
		description: item.description,
		price: item.price,
		category: item.category,
		image: item.image,
		quantity: item.quantity,
	});

	const [imagePreview, setImagePreview] = useState<string | null>(item.image);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewItem((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (!file) return;

		if (!file.type.match("image.*")) {
			error("Please select an image file");
			return;
		}

		const reader = new FileReader();

		reader.onloadend = () => {
			const base64String = reader.result?.toString() as string;
			setImagePreview(base64String);
			console.log(base64String);

			setNewItem((prev) => ({
				...prev,
				image: base64String,
			}));
		};

		reader.onerror = () => {
			console.error("Error reading file");
		};

		reader.readAsDataURL(file);
	};

	const handleAddItem = async (e: React.FormEvent) => {
		e.preventDefault();

		const newMenuItem = {
			...newItem,
			price: newItem.price,
		};
		try {
			console.table(newMenuItem);
			await updateDishDetails({ ...newMenuItem });
			success("Item added successfully! 🎉");
		} catch (err) {
			const message =
				(err as AxiosError<{ message?: string }>)?.response?.data
					?.message ??
				(err as Error)?.message ??
				"Failed to add item 😵";
			error(message);
		}
		setNewItem({
			_id: "",
			name: "",
			description: "",
			price: 0,
			category: "",
			image: "",
			quantity: 0,
		});
		setImagePreview(null);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="sm" variant="outline">
					<Edit className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold mb-4">
						Edit your dish details
					</DialogTitle>
					{newItem._id}
				</DialogHeader>
				<form className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Item Name</Label>
						<Input
							id="name"
							placeholder="Enter item name"
							name="name"
							value={newItem.name}
							onChange={handleInputChange}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Input
							id="description"
							placeholder="Enter description"
							name="description"
							value={newItem.description}
							onChange={handleInputChange}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="price">Price</Label>
						<Input
							id="price"
							placeholder="Enter price"
							name="price"
							type="number"
							value={newItem.price}
							onChange={handleInputChange}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="quantity">Quantity</Label>
						<Input
							id="quantity"
							placeholder="Enter dish quantity..."
							name="quantity"
							type="number"
							value={newItem.quantity}
							onChange={handleInputChange}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="calories">Calories</Label>
						<Input
							id="calories"
							placeholder="Enter calories quantity..."
							name="calories"
							type="number"
							value={newItem.quantity}
							onChange={handleInputChange}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="quantity">Is Vegetarian</Label>
						<Input
							id="quantity"
							placeholder="Enter dish quantity..."
							name="quantity"
							type="number"
							value={newItem.quantity}
							onChange={handleInputChange}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="quantity">Is Popular</Label>
						<Input
							id="quantity"
							placeholder="Enter dish quantity..."
							name="quantity"
							type="number"
							value={newItem.quantity}
							onChange={handleInputChange}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="category">Category</Label>
						<Select
							onValueChange={(value) =>
								setNewItem((prev) => ({
									...prev,
									category: value,
								}))
							}
							value={newItem.category}
						>
							<SelectTrigger className="w-full" id="category">
								<SelectValue placeholder="Select Category" />
							</SelectTrigger>
							<SelectContent>
								{categories.map((category) => (
									<SelectItem key={category} value={category}>
										{category}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="image">Upload Image</Label>
						<Input
							id="image"
							type="file"
							accept="image/*"
							onChange={handleImageChange}
						/>
						{imagePreview && (
							<img
								src={imagePreview}
								alt="Preview"
								className="w-full h-40 object-cover rounded-lg border"
							/>
						)}
					</div>

					<Button
						className="w-full bg-amber-600 hover:bg-amber-700"
						onClick={handleAddItem}
					>
						{isLoading ? "Updating..." : "Update Item"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

interface AddMenuItemInterface {
	toogleFetch: () => void;
}

const AddMenuItem = ({ toogleFetch }: AddMenuItemInterface) => {
	const { addDishToMenu, isLoading } = useMenu();
	const { error, success } = useToast();

	const [newItem, setNewItem] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
		quantity: 0,
	});

	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewItem((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (!file) return;

		if (!file.type.match("image.*")) {
			error("Please select an image file");
			return;
		}

		const reader = new FileReader();

		reader.onloadend = () => {
			const base64String = reader.result?.toString() as string;
			setImagePreview(base64String);
			console.log(base64String);

			setNewItem((prev) => ({
				...prev,
				image: base64String,
			}));
		};

		reader.onerror = () => {
			console.error("Error reading file");
		};

		reader.readAsDataURL(file);
	};

	const handleAddItem = async (e: React.FormEvent) => {
		e.preventDefault();
		if (
			!newItem.name ||
			!newItem.price ||
			!newItem.category ||
			!newItem.image ||
			!newItem.description ||
			!newItem.quantity
		) {
			error("Please fill in all required fields and upload an image!");
			return;
		}

		const newMenuItem = {
			...newItem,
			price: parseFloat(newItem.price),
		};
		try {
			console.table(newMenuItem);
			await addDishToMenu(newMenuItem);
			success("Item added successfully! 🎉");
		} catch (err) {
			const message =
				(err as AxiosError<{ message?: string }>)?.response?.data
					?.message ??
				(err as Error)?.message ??
				"Failed to add item 😵";
			error(message);
		}
		setNewItem({
			name: "",
			description: "",
			price: "",
			category: "",
			image: "",
			quantity: 0,
		});
		setImagePreview(null);
		toogleFetch();
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-amber-600 hover:bg-amber-700 dark:text-white">
					<Plus className="size-4" />
					Add Menu Item
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold mb-4">
						Add New Menu Item
					</DialogTitle>
				</DialogHeader>
				<form className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Item Name</Label>
						<Input
							id="name"
							placeholder="Enter item name"
							name="name"
							value={newItem.name}
							onChange={handleInputChange}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Input
							id="description"
							placeholder="Enter description"
							name="description"
							value={newItem.description}
							onChange={handleInputChange}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="price">Price</Label>
						<Input
							id="price"
							placeholder="Enter price"
							name="price"
							type="number"
							value={newItem.price}
							onChange={handleInputChange}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="quantity">Quantity</Label>
						<Input
							id="quantity"
							placeholder="Enter dish quantity..."
							name="quantity"
							type="number"
							value={newItem.quantity}
							onChange={handleInputChange}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="calories">Calories</Label>
						<Input
							id="calories"
							placeholder="Enter calories quantity..."
							name="calories"
							type="number"
							value={newItem.quantity}
							onChange={handleInputChange}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="quantity">Is Vegetarian</Label>
						<Input
							id="quantity"
							placeholder="Enter dish quantity..."
							name="quantity"
							type="number"
							value={newItem.quantity}
							onChange={handleInputChange}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="quantity">Is Popular</Label>
						<Input
							id="quantity"
							placeholder="Enter dish quantity..."
							name="quantity"
							type="number"
							value={newItem.quantity}
							onChange={handleInputChange}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="category">Category</Label>
						<Select
							onValueChange={(value) =>
								setNewItem((prev) => ({
									...prev,
									category: value,
								}))
							}
						>
							<SelectTrigger className="w-full" id="category">
								<SelectValue placeholder="Select Category" />
							</SelectTrigger>
							<SelectContent>
								{categories.map((category) => (
									<SelectItem key={category} value={category}>
										{category}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="image">Upload Image</Label>
						<Input
							id="image"
							type="file"
							accept="image/*"
							onChange={handleImageChange}
						/>
						{imagePreview && (
							<img
								src={imagePreview}
								alt="Preview"
								className="w-full h-40 object-cover rounded-lg border"
							/>
						)}
					</div>

					<Button
						className="w-full bg-amber-600 hover:bg-amber-700"
						onClick={handleAddItem}
					>
						{isLoading ? "Loading..." : "Add Item"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default Menu;
