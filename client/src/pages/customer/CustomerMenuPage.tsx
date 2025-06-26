import CustomerLayout from "@/layout/CustomerLayout";
import { Button } from "@/components/ui/button";
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
import {
	ShoppingCart, Search, Filter,
	Clock,
	Package,
	Plus
} from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/store/cart";
import type { CartData } from "@/types"
import StarRating from "@/components/shared/StarRating";

const CustomerMenuPage = () => {

	const { dishes, getDishes, cartItems, addToCart: addToCartFunc } = useCart()

	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [sortBy, setSortBy] = useState("name");

	useEffect(() => {
		getDishes()
	}, [])


	const categories = ["all", "Appetizers", "Main Course", "Desserts"];

	const filteredItems = dishes
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

	const addToCart = (item: CartData) => {
		console.log(item);
		addToCartFunc({
			_id: item._id,
			image: item.image,
			name: item.name,
			prepTime: item.prepTime,
			priceOfEach: item.price,
			totalPrice: item.price,
			quantity: 1,
		})
	};
	const cartItemCount = cartItems.length;
	let price = 0
	const cartTotal = cartItems.map((cart) => price += cart.totalPrice);
	console.log(cartTotal);

	return (
		<CustomerLayout>
			<div className="space-y-8">
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">
							Our Menu
						</h1>
						<p className="text-gray-600 dark:text-white/60">
							Discover our delicious offerings - Available for
							dine-in, takeaway & delivery
						</p>
					</div>
					<div className="flex items-center gap-4">
						<div className="bg-green-50 px-4 py-2 rounded-lg dark:text-white/60 dark:bg-black">
							<p className="text-sm text-green-800">
								🚚 Free delivery over Rs. 30
							</p>
						</div>
						<Button className="bg-green-600 hover:bg-green-700 relative">
							<ShoppingCart className="h-4 w-4 mr-2" />
							Cart ({cartItemCount})
							{cartItemCount > 0 && (
								<Badge className="ml-2 bg-white text-green-600">
									Rs. {price.toFixed(2)}
								</Badge>
							)}
						</Button>
					</div>
				</div>

				{/* Search and Filters */}
				<div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border">
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
								<SelectTrigger className="w-full">
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
						<div className="w-full">
							<Label>Sort By</Label>
							<Select value={sortBy} onValueChange={setSortBy}>
								<SelectTrigger className="w-full">
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
									<span className="text-lg font-bold text-green-600 whitespace-nowrap">
										Rs. {item.price}
									</span>
								</div>

								<p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
									{item.description}
								</p>

								<div className="mb-4  h-8">
									<StarRating
										rating={item.rating}
										maxStars={5}
										showText={true}

									/>
								</div>
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
										<Button
											onClick={() =>
												addToCart(item)
											}
											size="sm"
											className="text-white bg-green-500"
										>
											<Plus />
											Add to Cart
										</Button>
									</div>
								</div>
							</div>
						</div>
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
