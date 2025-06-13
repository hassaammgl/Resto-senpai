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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
	Minus,
	Plus,
	Trash2,
	MapPin,
	Clock,
	CreditCard,
	Truck,
	Store,
	Utensils,
} from "lucide-react";
// import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/store/auth";
import { useState } from "react";

const items = [
	{
		id: 1,
		name: "Margherita Pizza",
		price: 12.99,
		quantity: 2,
	},
	{
		id: 2,
		name: "Caesar Salad",
		price: 8.5,
		quantity: 1,
	},
	{
		id: 3,
		name: "Spaghetti Bolognese",
		price: 14.25,
		quantity: 1,
	},
];

// Dummy implementations for cart summary functions
function getTotal() {
	return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function getTax() {
	// Example: 8% tax
	return getTotal() * 0.08;
}

function getDeliveryFee() {
	// Example: free delivery for orders over $30
	return getTotal() > 30 ? 0 : 5;
}

function getGrandTotal() {
	return getTotal() + getTax() + getDeliveryFee();
}

const CustomerCartPage = () => {
	// const { items, deliveryInfo, updateQuantity, removeItem, setDeliveryInfo, getTotal, getTax, getDeliveryFee, getGrandTotal, clearCart } = useCart();
	const { user } = useAuth();
	const [orderType, setOrderType] = useState<
		"dine-in" | "takeaway" | "delivery"
	>("delivery");
	const [specialInstructions, setSpecialInstructions] = useState("");
	const [paymentMethod, setPaymentMethod] = useState("card");

	const handleOrderTypeChange = (
		type: "dine-in" | "takeaway" | "delivery"
	) => {
		setOrderType(type);
		// setDeliveryInfo({
		//   type,
		//   contactPhone: user?.phone || "",
		//   ...(type === 'dine-in' && { tableNumber: 1 }),
		//   ...(type === 'delivery' && user?.address && { address: user.address })
		// });
	};

	const handlePlaceOrder = () => {
		// Here you would integrate with your payment system and backend
		alert(
			"Order placed successfully! You will receive a confirmation email shortly."
		);
		// clearCart();
	};

	if (items?.length === 0) {
		return (
			<CustomerLayout>
				<div className="text-center py-16">
					<div className="text-6xl mb-4">🛒</div>
					<h2 className="text-2xl font-bold text-gray-900 mb-2">
						Your cart is empty
					</h2>
					<p className="text-gray-600 mb-6">
						Add some delicious items to get started!
					</p>
					<Button className="bg-green-600 hover:bg-green-700">
						Browse Menu
					</Button>
				</div>
			</CustomerLayout>
		);
	}

	return (
		<CustomerLayout>
			<div className="space-y-8">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">
						Your Order
					</h1>
					<p className="text-gray-600 dark:text-white/60">
						Review your items and complete your order
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Order Items */}
					<div className="lg:col-span-2 space-y-6">
						{/* Order Type Selection */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Truck className="h-5 w-5" />
									Order Type
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-3 gap-4">
									<Button
										variant={
											orderType === "delivery"
												? "default"
												: "outline"
										}
										onClick={() =>
											handleOrderTypeChange("delivery")
										}
										className="flex flex-col items-center p-4 h-auto"
									>
										<Truck className="h-6 w-6 mb-2" />
										<span>Delivery</span>
										<span className="text-xs text-gray-500">
											30-45 min
										</span>
									</Button>
									<Button
										variant={
											orderType === "takeaway"
												? "default"
												: "outline"
										}
										onClick={() =>
											handleOrderTypeChange("takeaway")
										}
										className="flex flex-col items-center p-4 h-auto"
									>
										<Store className="h-6 w-6 mb-2" />
										<span>Takeaway</span>
										<span className="text-xs text-gray-500">
											15-20 min
										</span>
									</Button>
									<Button
										variant={
											orderType === "dine-in"
												? "default"
												: "outline"
										}
										onClick={() =>
											handleOrderTypeChange("dine-in")
										}
										className="flex flex-col items-center p-4 h-auto"
									>
										<Utensils className="h-6 w-6 mb-2" />
										<span>Dine In</span>
										<span className="text-xs text-gray-500">
											Table service
										</span>
									</Button>
								</div>
							</CardContent>
						</Card>

						{/* Delivery Address (if delivery) */}
						{orderType === "delivery" && (
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<MapPin className="h-5 w-5" />
										Delivery Address
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="grid grid-cols-2 gap-4">
										<div>
											<Label htmlFor="street">
												Street Address
											</Label>
											<Input
												id="street"
												defaultValue={
													user?.address?.street
												}
											/>
										</div>
										<div>
											<Label htmlFor="city">City</Label>
											<Input
												id="city"
												defaultValue={
													user?.address?.city
												}
											/>
										</div>
										<div>
											<Label htmlFor="state">State</Label>
											<Input
												id="state"
												defaultValue={
													user?.address?.state
												}
											/>
										</div>
										<div>
											<Label htmlFor="zip">
												ZIP Code
											</Label>
											<Input
												id="zip"
												defaultValue={
													user?.address?.zipCode
												}
											/>
										</div>
									</div>
									<div>
										<Label htmlFor="phone">
											Contact Phone
										</Label>
										<Input
											id="phone"
											defaultValue={user?.phone}
										/>
									</div>
								</CardContent>
							</Card>
						)}

						{/* Cart Items */}
						<Card>
							<CardHeader>
								<CardTitle>
									Order Items ({items?.length})
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								{items?.map((item) => (
									<div
										key={item.id}
										className="flex items-center justify-between py-4 border-b last:border-b-0"
									>
										<div className="flex-1">
											<h4 className="font-medium">
												{item.name}
											</h4>
											<p className="text-sm text-gray-600">
												${item.price.toFixed(2)} each
											</p>
										</div>
										<div className="flex items-center gap-3">
											<div className="flex items-center gap-2 dark:bg-black bg-gray-100 rounded-lg p-1">
												<Button
													size="sm"
													variant="ghost"
													className="h-8 w-8 p-0"
												>
													<Minus className="h-4 w-4" />
												</Button>
												<span className="w-8 text-center">
													{item.quantity}
												</span>
												<Button
													size="sm"
													variant="ghost"
													className="h-8 w-8 p-0"
												>
													<Plus className="h-4 w-4" />
												</Button>
											</div>
											<div className="text-right min-w-[80px]">
												<p className="font-medium">
													$
													{(
														item.price *
														item.quantity
													).toFixed(2)}
												</p>
											</div>
											<Button
												size="sm"
												variant="ghost"
												className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</div>
								))}
							</CardContent>
						</Card>

						{/* Special Instructions */}
						<Card>
							<CardHeader>
								<CardTitle>Special Instructions</CardTitle>
								<CardDescription>
									Any special requests or notes for your
									order?
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Textarea
									placeholder="e.g., No onions, extra sauce, etc."
									value={specialInstructions}
									onChange={(e) =>
										setSpecialInstructions(e.target.value)
									}
								/>
							</CardContent>
						</Card>
					</div>

					{/* Order Summary */}
					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<CreditCard className="h-5 w-5" />
									Order Summary
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex justify-between">
									<span>Subtotal</span>
									<span>${getTotal().toFixed(2)}</span>
								</div>
								<div className="flex justify-between">
									<span>Tax</span>
									<span>${getTax().toFixed(2)}</span>
								</div>
								{orderType === "delivery" && (
									<div className="flex justify-between">
										<span>Delivery Fee</span>
										<span>
											{getDeliveryFee() === 0 ? (
												<span className="text-green-600">
													FREE
												</span>
											) : (
												`$${getDeliveryFee().toFixed(
													2
												)}`
											)}
										</span>
									</div>
								)}
								<Separator />
								<div className="flex justify-between font-bold text-lg">
									<span>Total</span>
									<span>${getGrandTotal().toFixed(2)}</span>
								</div>

								{user?.loyaltyPoints && (
									<div className="bg-green-50 p-3 rounded-lg">
										<p className="text-sm text-green-800">
											💎 You have {user?.loyaltyPoints}{" "}
											loyalty points
										</p>
										<p className="text-xs text-green-600">
											You'll earn{" "}
											{Math.floor(getGrandTotal())} points
											from this order
										</p>
									</div>
								)}
							</CardContent>
						</Card>

						{/* Payment Method */}
						<Card>
							<CardHeader>
								<CardTitle>Payment Method</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<Select
									value={paymentMethod}
									onValueChange={setPaymentMethod}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="card">
											Credit/Debit Card
										</SelectItem>
										<SelectItem value="paypal">
											PayPal
										</SelectItem>
										<SelectItem value="cash">
											Cash on Delivery
										</SelectItem>
									</SelectContent>
								</Select>

								{paymentMethod === "card" && (
									<div className="space-y-3">
										<Input placeholder="Card Number" />
										<div className="grid grid-cols-2 gap-3">
											<Input placeholder="MM/YY" />
											<Input placeholder="CVV" />
										</div>
										<Input placeholder="Cardholder Name" />
									</div>
								)}
							</CardContent>
						</Card>

						{/* Estimated Time */}
						<Card>
							<CardContent className="pt-6">
								<div className="flex items-center gap-3 text-center">
									<Clock className="h-5 w-5 text-green-600" />
									<div>
										<p className="font-medium">
											Estimated Time
										</p>
										<p className="text-sm text-gray-600">
											{orderType === "delivery" &&
												"30-45 minutes"}
											{orderType === "takeaway" &&
												"15-20 minutes"}
											{orderType === "dine-in" &&
												"Immediate seating"}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Place Order Button */}
						<Button
							onClick={handlePlaceOrder}
							className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
						>
							Place Order - ${getGrandTotal().toFixed(2)}
						</Button>
					</div>
				</div>
			</div>
		</CustomerLayout>
	);
};

export default CustomerCartPage;
