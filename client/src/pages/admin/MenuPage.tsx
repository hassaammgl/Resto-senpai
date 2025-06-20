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
import {
	Plus,
	Edit,
	Trash2,
	Upload,
	Loader2,
	Clock,
	Package,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/useToast";
import { useMenu } from "@/store/menu";
import { AxiosError } from "axios";
import type { DishData } from "@/types/index";
import { Switch } from "@/components/ui/switch";

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
		if (!_id) return;

		try {
			await deleteDish(_id);
			info("Item deleted successfully! 🎉");
			toogleFetch();
		} catch (err) {
			const message =
				(err as AxiosError<{ message?: string }>)?.response?.data
					?.message ??
				(err as Error)?.message ??
				"Failed to delete item 😵";
			error(message);
		}
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
								className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
							>
								{item.image && (
									<div className="relative h-48 w-full">
										<img
											src={item.image}
											alt={item.name}
											className="w-full h-full object-cover"
										/>
										<div className="absolute top-2 right-2 flex gap-1">
											{item.isPopular && (
												<Badge
													variant="default"
													className="bg-green-600"
												>
													Popular
												</Badge>
											)}
											{item.isVegetarian && (
												<Badge
													variant="default"
													className="bg-emerald-600"
												>
													Veg
												</Badge>
											)}
										</div>
									</div>
								)}

								<div className="p-4">
									<div className="flex justify-between items-start mb-3">
										<h3 className="text-lg font-bold dark:text-white text-gray-900 line-clamp-1">
											{item.name}
										</h3>
										<span className="text-lg font-bold text-amber-600 whitespace-nowrap">
											Rs. {item.price}
										</span>
									</div>

									<p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
										{item.description}
									</p>

									<div className="flex flex-wrap gap-2 mb-4">
										<Badge
											variant={
												item.available
													? "default"
													: "destructive"
											}
										>
											{item.available
												? "In Stock"
												: "Out of Stock"}
										</Badge>
										<Badge variant="outline">
											{item.category}
										</Badge>
										{item.prepTime && (
											<Badge
												variant="outline"
												className="flex items-center gap-1"
											>
												<Clock className="h-3 w-3" />
												{item.prepTime}
											</Badge>
										)}
									</div>

									<div className="flex justify-between items-center">
										<div className="flex items-center gap-2">
											<Package className="h-4 w-4 text-gray-500" />
											<span className="text-sm text-gray-500 dark:text-gray-400">
												{item.quantity} available
											</span>
										</div>

										<div className="flex gap-2">
											<EditDishDetails
												item={item}
												toogleFetch={toogleFetch}
											/>
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

interface EditDishDetailsProps {
	item: DishData;
	toogleFetch: () => void;
}

interface EditDishDetailsProps {
	item: DishData;
	toogleFetch: () => void;
}

export const EditDishDetails = ({
	item,
	toogleFetch,
}: EditDishDetailsProps) => {
	const { updateDishDetails, isLoading } = useMenu();
	const { error, success } = useToast();

	const [formData, setFormData] = useState<DishData>({
		_id: item._id,
		name: item.name,
		description: item.description,
		price: item.price,
		category: item.category,
		image: item.image || "",
		quantity: item.quantity,
		calories: item.calories || 0,
		isVegetarian: item.isVegetarian || false,
		isPopular: item.isPopular || false,
		available: item.available || true,
		prepTime: item.prepTime,
	});

	const [imagePreview, setImagePreview] = useState<string | null>(
		item.image || null
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "number" ? Number(value) : value,
		}));
	};

	const handleSwitchToggle =
		(field: keyof DishData) => (checked: boolean) => {
			setFormData((prev) => ({ ...prev, [field]: checked }));
		};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!file.type.startsWith("image/")) {
			error("Please select a valid image file");
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			const result = reader.result as string;
			setImagePreview(result);
			setFormData((prev) => ({ ...prev, image: result }));
		};
		reader.onerror = () => error("Error reading image file");
		reader.readAsDataURL(file);
	};

	const handleCategoryChange = (value: string) => {
		setFormData((prev) => ({ ...prev, category: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await updateDishDetails(formData);
			success("Dish updated successfully!");
			toogleFetch();
		} catch (err) {
			error("Failed to update dish. Please try again.");
			console.error("Update error:", err);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size="sm"
					variant="outline"
					aria-label="Edit dish details"
				>
					<Edit className="h-4 w-4" />
				</Button>
			</DialogTrigger>

			<DialogContent className="max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold">
						Edit Dish Details
					</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4 mt-4">
					{/* Basic Information */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="edit-name">Name*</Label>
							<Input
								id="edit-name"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								placeholder="Dish name"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="edit-price">Price*</Label>
							<Input
								id="edit-price"
								name="price"
								type="number"
								min="0"
								step="0.01"
								value={formData.price}
								onChange={handleInputChange}
								placeholder="0.00"
								required
							/>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="edit-description">Description*</Label>
						<Input
							id="edit-description"
							name="description"
							value={formData.description}
							onChange={handleInputChange}
							placeholder="Brief description"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="edit prepTime">Prepreation Time*</Label>
						<Input
							id="prepTime"
							name="prepTime"
							value={formData.prepTime}
							onChange={handleInputChange}
							placeholder="Estimated time for dish prepration"
							required
						/>
					</div>
					{/* Inventory */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="space-y-2">
							<Label htmlFor="edit-quantity">Quantity*</Label>
							<Input
								id="edit-quantity"
								name="quantity"
								type="number"
								min="0"
								value={formData.quantity}
								onChange={handleInputChange}
								placeholder="0"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="edit-calories">Calories</Label>
							<Input
								id="edit-calories"
								name="calories"
								type="number"
								min="0"
								value={formData.calories}
								onChange={handleInputChange}
								placeholder="0"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="edit-category">Category*</Label>
							<Select
								value={formData.category}
								onValueChange={handleCategoryChange}
								required
							>
								<SelectTrigger id="edit-category">
									<SelectValue placeholder="Select category" />
								</SelectTrigger>
								<SelectContent>
									{categories.map((category) => (
										<SelectItem
											key={category}
											value={category}
										>
											{category}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Toggles */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
						<div className="flex items-center space-x-2">
							<Switch
								id="edit-vegetarian"
								checked={formData.isVegetarian}
								onCheckedChange={handleSwitchToggle(
									"isVegetarian"
								)}
							/>
							<Label htmlFor="edit-vegetarian">Vegetarian</Label>
						</div>

						<div className="flex items-center space-x-2">
							<Switch
								id="edit-popular"
								checked={formData.isPopular}
								onCheckedChange={handleSwitchToggle(
									"isPopular"
								)}
							/>
							<Label htmlFor="edit-popular">Popular</Label>
						</div>

						<div className="flex items-center space-x-2">
							<Switch
								id="edit-available"
								checked={formData.available}
								onCheckedChange={handleSwitchToggle(
									"available"
								)}
							/>
							<Label htmlFor="edit-available">Available</Label>
						</div>
					</div>

					{/* Image Upload */}
					<div className="space-y-2">
						<Label htmlFor="edit-image">Dish Image</Label>
						<Input
							id="edit-image"
							type="file"
							accept="image/*"
							onChange={handleImageUpload}
							className="cursor-pointer"
						/>
						{imagePreview && (
							<div className="mt-2">
								<p className="text-sm text-muted-foreground mb-1">
									Image Preview:
								</p>
								<img
									src={imagePreview}
									alt="Dish preview"
									className="w-full h-48 object-cover rounded-lg border"
								/>
							</div>
						)}
					</div>

					<Button
						type="submit"
						className="w-full mt-6"
						disabled={isLoading}
					>
						{isLoading ? "Saving Changes..." : "Save Changes"}
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

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
		quantity: 0,
		calories: 0,
		isVegetarian: false,
		isPopular: false,
		available: true,
		prepTime: "",
	});

	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "number" ? Number(value) : value,
		}));
	};

	const handleSwitchToggle =
		(field: keyof typeof formData) => (checked: boolean) => {
			setFormData((prev) => ({ ...prev, [field]: checked }));
		};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!file.type.startsWith("image/")) {
			error("Please select a valid image file (JPEG, PNG, etc.)");
			return;
		}

		if (file.size > 2 * 1024 * 1024) {
			error("Image size should be less than 2MB");
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			const result = reader.result as string;
			setImagePreview(result);
			setFormData((prev) => ({ ...prev, image: result }));
		};
		reader.onerror = () => error("Error reading image file");
		reader.readAsDataURL(file);
	};

	const handleCategoryChange = (value: string) => {
		setFormData((prev) => ({ ...prev, category: value }));
	};

	const resetForm = () => {
		setFormData({
			name: "",
			description: "",
			price: "",
			category: "",
			image: "",
			quantity: 0,
			calories: 0,
			isVegetarian: false,
			isPopular: false,
			available: true,
		});
		setImagePreview(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.image) {
			error("Please upload an image of the dish");
			return;
		}
		console.log(formData);

		try {
			await addDishToMenu({
				...formData,
				price: parseFloat(formData.price),
			});
			success("Menu item added successfully!");
			resetForm();
			toogleFetch();
			setIsOpen(false);
		} catch (err) {
			error("Failed to add menu item. Please try again.");
			console.error("Add item error:", err);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					className="bg-amber-600 hover:bg-amber-700 text-white"
					onClick={() => setIsOpen(true)}
				>
					<Plus className="size-4 mr-2" />
					Add Menu Item
				</Button>
			</DialogTrigger>

			<DialogContent className="max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold">
						Add New Menu Item
					</DialogTitle>
					<p className="text-sm text-muted-foreground">
						Fill in the details below to add a new item to your menu
					</p>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4 mt-4">
					{/* Basic Information */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="name">Name*</Label>
							<Input
								id="name"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								placeholder="e.g., Margherita Pizza"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="price">Price*</Label>
							<Input
								id="price"
								name="price"
								type="number"
								min="0"
								step="0.01"
								value={formData.price}
								onChange={handleInputChange}
								placeholder="0.00"
								required
							/>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">Description*</Label>
						<Input
							id="description"
							name="description"
							value={formData.description}
							onChange={handleInputChange}
							placeholder="Brief description of the dish"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="prepTime">Prepreation Time*</Label>
						<Input
							id="prepTime"
							name="prepTime"
							value={formData.prepTime}
							onChange={handleInputChange}
							placeholder="Estimated time for dish prepration"
							required
						/>
					</div>

					{/* Inventory and Nutrition */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="space-y-2">
							<Label htmlFor="quantity">Quantity*</Label>
							<Input
								id="quantity"
								name="quantity"
								type="number"
								min="0"
								value={formData.quantity}
								onChange={handleInputChange}
								placeholder="Available quantity"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="calories">Calories</Label>
							<Input
								id="calories"
								name="calories"
								type="number"
								min="0"
								value={formData.calories}
								onChange={handleInputChange}
								placeholder="Calorie count"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="category">Category*</Label>
							<Select
								value={formData.category}
								onValueChange={handleCategoryChange}
								required
							>
								<SelectTrigger>
									<SelectValue placeholder="Select category" />
								</SelectTrigger>
								<SelectContent>
									{categories.map((category) => (
										<SelectItem
											key={category}
											value={category}
										>
											{category}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Toggles */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
						<div className="flex items-center justify-between p-3 border rounded-lg">
							<Label htmlFor="vegetarian">Vegetarian</Label>
							<Switch
								id="vegetarian"
								checked={formData.isVegetarian}
								onCheckedChange={handleSwitchToggle(
									"isVegetarian"
								)}
							/>
						</div>

						<div className="flex items-center justify-between p-3 border rounded-lg">
							<Label htmlFor="popular">Popular</Label>
							<Switch
								id="popular"
								checked={formData.isPopular}
								onCheckedChange={handleSwitchToggle(
									"isPopular"
								)}
							/>
						</div>

						<div className="flex items-center justify-between p-3 border rounded-lg">
							<Label htmlFor="available">Available</Label>
							<Switch
								id="available"
								checked={formData.available}
								onCheckedChange={handleSwitchToggle(
									"available"
								)}
							/>
						</div>
					</div>

					{/* Image Upload */}
					<div className="space-y-2">
						<Label htmlFor="image">Dish Image*</Label>
						<div className="flex items-center gap-4">
							<Label
								htmlFor="image"
								className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent transition-colors"
							>
								<div className="flex flex-col items-center justify-center pt-5 pb-6">
									<Upload className="h-8 w-8 text-muted-foreground mb-2" />
									<p className="text-sm text-muted-foreground">
										{imagePreview
											? "Change image"
											: "Click to upload"}
									</p>
									<p className="text-xs text-muted-foreground">
										PNG, JPG (Max. 2MB)
									</p>
								</div>
								<Input
									id="image"
									type="file"
									accept="image/*"
									onChange={handleImageUpload}
									className="hidden"
								/>
							</Label>
						</div>
						{imagePreview && (
							<div className="mt-2">
								<p className="text-sm text-muted-foreground mb-1">
									Preview:
								</p>
								<img
									src={imagePreview}
									alt="Dish preview"
									className="w-full h-48 object-cover rounded-lg border"
								/>
							</div>
						)}
					</div>

					<div className="flex gap-2 pt-4">
						<Button
							type="button"
							variant="outline"
							className="flex-1"
							onClick={() => {
								resetForm();
								setIsOpen(false);
							}}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							className="flex-1 bg-amber-600 hover:bg-amber-700"
							disabled={isLoading}
						>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Adding...
								</>
							) : (
								"Add Item"
							)}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default Menu;
