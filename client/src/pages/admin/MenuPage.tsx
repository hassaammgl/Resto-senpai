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
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/useToast";

const Menu = () => {
	const [menuItems, setMenuItems] = useState([
		{
			id: 1,
			name: "Grilled Salmon",
			description: "Fresh Atlantic salmon with herbs and lemon",
			price: 28.99,
			category: "Main Course",
			image: "",
			available: true,
		},
		{
			id: 2,
			name: "Caesar Salad",
			description: "Crisp romaine lettuce with parmesan and croutons",
			price: 14.99,
			category: "Appetizer",
			image: "",
			available: true,
		},
	]);

	const categories = ["Appetizer", "Main Course", "Side", "Dessert"];
	const allCategories = ["All", ...categories];

	const { error } = useToast();

	const [newItem, setNewItem] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
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
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
				setNewItem((prev) => ({
					...prev,
					image: reader.result as string,
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	const handleAddItem = () => {
		if (
			!newItem.name ||
			!newItem.price ||
			!newItem.category ||
			!newItem.image
		) {
			error("Please fill in all required fields and upload an image!");
			return;
		}

		const newMenuItem = {
			...newItem,
			id: Date.now(),
			price: parseFloat(newItem.price),
		};

		console.log(newMenuItem);

		setNewItem({
			name: "",
			description: "",
			price: "",
			category: "",
			image: "",
		});
		setImagePreview(null);
	};

	return (
		<Layout>
			<div className="space-y-8">
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 mb-2">
							Menu Management
						</h1>
						<p className="text-gray-600">
							Manage your restaurant's menu items and pricing.
						</p>
					</div>

					<Dialog>
						<DialogTrigger asChild>
							<Button className="bg-amber-600 hover:bg-amber-700">
								<Plus className="h-4 w-4 mr-2" />
								Add Menu Item
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle className="text-2xl font-bold mb-4">
									Add New Menu Item
								</DialogTitle>
							</DialogHeader>
							<div className="space-y-4">
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
									<Label htmlFor="description">
										Description
									</Label>
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
									<Label htmlFor="category">Category</Label>
									<Select
										onValueChange={(value) =>
											setNewItem((prev) => ({
												...prev,
												category: value,
											}))
										}
									>
										<SelectTrigger
											className="w-full"
											id="category"
										>
											<SelectValue placeholder="Select Category" />
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
									Add Item
								</Button>
							</div>
						</DialogContent>
					</Dialog>
				</div>

				<div className="flex gap-2 flex-wrap">
					{allCategories.map((category) => (
						<Button key={category} variant="outline" size="sm">
							{category}
						</Button>
					))}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{menuItems.map((item) => (
						<div
							key={item.id}
							className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
						>
							{item.image && (
								<img
									src={item.image}
									alt={item.name}
									className="w-full h-40 object-cover"
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
								</div>

								<h3 className="text-xl font-bold text-gray-900 mb-2">
									{item.name}
								</h3>
								<p className="text-gray-600 text-sm mb-4">
									{item.description}
								</p>

								<div className="flex justify-between items-center">
									<span className="text-2xl font-bold text-amber-600">
										${item.price}
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

export default Menu;
