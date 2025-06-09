import CustomerLayout from "@/layout/CustomerLayout";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ShoppingCart, Plus, Search, Filter, Clock, Star } from "lucide-react";
import { useState } from "react";
// import { useCart } from "@/contexts/CartContext";

const CustomerMenuPage = () => {
	// const { addItem, getItemCount, getGrandTotal } = useCart();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [sortBy, setSortBy] = useState("name");

	const menuItems = [
		{
			id: "1",
			name: "Caesar Salad",
			description:
				"Fresh romaine lettuce, parmesan cheese, croutons with house-made dressing",
			price: 12.99,
			category: "Appetizers",
			image: "🥗",
			rating: 4.5,
			prepTime: "10-15 min",
			calories: 280,
			isVegetarian: true,
			isPopular: true,
		},
		{
			id: "2",
			name: "Grilled Salmon",
			description:
				"Atlantic salmon with lemon butter sauce, served with seasonal vegetables",
			price: 24.99,
			category: "Main Course",
			image: "🐟",
			rating: 4.8,
			prepTime: "20-25 min",
			calories: 420,
			isVegetarian: false,
			isPopular: true,
		},
		{
			id: "3",
			name: "Margherita Pizza",
			description: "Fresh tomatoes, mozzarella, basil on thin crust",
			price: 18.99,
			category: "Main Course",
			image: "🍕",
			rating: 4.6,
			prepTime: "15-20 min",
			calories: 680,
			isVegetarian: true,
			isPopular: false,
		},
		{
			id: "4",
			name: "Chocolate Cake",
			description:
				"Rich chocolate cake with vanilla ice cream and berry compote",
			price: 8.99,
			category: "Desserts",
			image: "🍰",
			rating: 4.7,
			prepTime: "5 min",
			calories: 520,
			isVegetarian: true,
			isPopular: true,
		},
		{
			id: "5",
			name: "Beef Burger",
			description:
				"Angus beef patty with lettuce, tomato, cheese, and fries",
			price: 16.99,
			category: "Main Course",
			image: "🍔",
			rating: 4.4,
			prepTime: "15-20 min",
			calories: 750,
			isVegetarian: false,
			isPopular: true,
		},
		{
			id: "6",
			name: "Mushroom Soup",
			description: "Creamy wild mushroom soup with herbs and truffle oil",
			price: 9.99,
			category: "Appetizers",
			image: "🍲",
			rating: 4.3,
			prepTime: "8-12 min",
			calories: 220,
			isVegetarian: true,
			isPopular: false,
		},
	];

	const categories = ["all", "Appetizers", "Main Course", "Desserts"];

	const filteredItems = menuItems
		.filter(
			(item) =>
				(selectedCategory === "all" ||
					item.category === selectedCategory) &&
				item.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.sort((a, b) => {
			switch (sortBy) {
				case "price-low":
					return a.price - b.price;
				case "price-high":
					return b.price - a.price;
				case "rating":
					return b.rating - a.rating;
				case "popular":
					return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
				default:
					return a.name.localeCompare(b.name);
			}
		});

	const addToCart = (item: (typeof menuItems)[0]) => {
		// addItem({
		//   id: item.id,
		//   name: item.name,
		//   price: item.price
		// });
		console.log(item);
	};

	// const cartItemCount = getItemCount();
	// const cartTotal = getGrandTotal();
	const cartItemCount = 0;
	const cartTotal = 0;

	return (
		<CustomerLayout>
			<div className="space-y-8">
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 mb-2">
							Our Menu
						</h1>
						<p className="text-gray-600">
							Discover our delicious offerings - Available for
							dine-in, takeaway & delivery
						</p>
					</div>
					<div className="flex items-center gap-4">
						<div className="bg-green-50 px-4 py-2 rounded-lg">
							<p className="text-sm text-green-800">
								🚚 Free delivery over $30
							</p>
						</div>
						<Button className="bg-green-600 hover:bg-green-700 relative">
							<ShoppingCart className="h-4 w-4 mr-2" />
							Cart ({cartItemCount})
							{cartItemCount > 0 && (
								<Badge className="ml-2 bg-white text-green-600">
									${cartTotal.toFixed(2)}
								</Badge>
							)}
						</Button>
					</div>
				</div>

				{/* Search and Filters */}
				<div className="bg-white p-6 rounded-lg shadow-sm border">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<div>
							<Label htmlFor="search">Search Menu</Label>
							<div className="relative">
								<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
								<Input
									id="search"
									placeholder="Search dishes..."
									value={searchTerm}
									onChange={(e) =>
										setSearchTerm(e.target.value)
									}
									className="pl-10"
								/>
							</div>
						</div>
						<div>
							<Label>Category</Label>
							<Select
								value={selectedCategory}
								onValueChange={setSelectedCategory}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{categories.map((category) => (
										<SelectItem
											key={category}
											value={category}
										>
											{category === "all"
												? "All Categories"
												: category}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label>Sort By</Label>
							<Select value={sortBy} onValueChange={setSortBy}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="name">Name</SelectItem>
									<SelectItem value="price-low">
										Price: Low to High
									</SelectItem>
									<SelectItem value="price-high">
										Price: High to Low
									</SelectItem>
									<SelectItem value="rating">
										Rating
									</SelectItem>
									<SelectItem value="popular">
										Popular First
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex items-end">
							<Button variant="outline" className="w-full">
								<Filter className="h-4 w-4 mr-2" />
								More Filters
							</Button>
						</div>
					</div>
				</div>

				{/* Menu Items Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredItems.map((item) => (
						<Card
							key={item.id}
							className="hover:shadow-lg transition-shadow relative"
						>
							{item.isPopular && (
								<Badge className="absolute top-4 left-4 bg-orange-500 text-white">
									Popular
								</Badge>
							)}
							<CardHeader>
								<div className="text-4xl text-center mb-4">
									{item.image}
								</div>
								<CardTitle className="flex justify-between items-start">
									<span>{item.name}</span>
									<Badge variant="secondary">
										{item.category}
									</Badge>
								</CardTitle>
								<CardDescription>
									{item.description}
								</CardDescription>

								<div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
									<div className="flex items-center gap-1">
										<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
										<span>{item.rating}</span>
									</div>
									<div className="flex items-center gap-1">
										<Clock className="h-4 w-4" />
										<span>{item.prepTime}</span>
									</div>
									<div className="flex items-center gap-1">
										<span>{item.calories} cal</span>
									</div>
									{item.isVegetarian && (
										<Badge
											variant="outline"
											className="text-green-600"
										>
											Vegetarian
										</Badge>
									)}
								</div>
							</CardHeader>
							<CardContent>
								<div className="flex justify-between items-center">
									<span className="text-2xl font-bold text-green-600">
										${item.price}
									</span>
									<Button
										onClick={() => addToCart(item)}
										size="sm"
										className="bg-green-600 hover:bg-green-700"
									>
										<Plus className="h-4 w-4 mr-1" />
										Add to Cart
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{filteredItems.length === 0 && (
					<div className="text-center py-12">
						<p className="text-gray-500">
							No items found matching your criteria.
						</p>
					</div>
				)}
			</div>
		</CustomerLayout>
	);
};

export default CustomerMenuPage;
