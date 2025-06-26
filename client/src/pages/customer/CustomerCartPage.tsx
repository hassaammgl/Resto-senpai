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
import { useAuth } from "@/store/auth";
import { useState } from "react";
import { useCart } from "@/store/cart";
import { NavLink } from "react-router";
import type { CartStore } from "@/types"

const CustomerCartPage = () => {

	const { user } = useAuth();
	const { cartItems } = useCart();
	const [orderType, setOrderType] = useState<
		"dine-in" | "takeaway" | "delivery"
	>("delivery");
	const [specialInstructions, setSpecialInstructions] = useState("");
	const [paymentMethod, setPaymentMethod] = useState("card");

	function getTotal() {
		let cartItemsPrice = 0;
		cartItems.map((i) => {
			cartItemsPrice = cartItemsPrice + i.totalPrice
		})
		return cartItemsPrice;
	}

	function getTax() {
		return getTotal() * 0.08;
	}

	function getDeliveryFee() {
		return getTotal() > 30 ? 0 : 5;
	}

	function getGrandTotal() {
		return getTotal() + getTax() + getDeliveryFee();
	}

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

	if (cartItems?.length === 0) {
		return (
			<CustomerLayout>
				<div className="text-center py-16">
					<div className="text-6xl mb-4">🛒</div>
					<h2 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white">
						Your cart is empty
					</h2>
					<p className="text-gray-600 mb-6 dark:text-white/70">
						Add some delicious items to get started!
					</p>
					<NavLink className="bg-green-600 hover:bg-green-700" to={"/customer/menu"} >
						<Button className="bg-green-600 hover:bg-green-700">
							Browse Menu
						</Button>
					</NavLink>
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
						{orderType === "delivery" && <DeliveryAddress
							phone={user?.phone}
							city={user?.address?.city}
							state={user?.address?.state}
							street={user?.address?.street}
							zipCode={user?.address?.zipCode}
						/>}

						<OrderDetails
							setSpecialInstructions={setSpecialInstructions}
							specialInstructions={specialInstructions}
							cartItems={cartItems}
						/>

					</div>

					<div className="space-y-6">

						<OrderSummary
							total={getTotal()}
							tax={getTax()}
							deliveryFee={getDeliveryFee()}
							orderType={orderType}
							grandTotal={getGrandTotal()}
							loyalityPoints={user?.loyaltyPoints}
						/>
						{/* Payment Method */}
						<PaymentMethod
							paymentMethod={paymentMethod}
							setPaymentMethod={setPaymentMethod} />

						{/* Estimated Time */}
						<EstimatedTime orderType={orderType} />

						{/* Place Order Button */}
						<Button
							onClick={handlePlaceOrder}
							className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
						>
							{/* Place Order - ${getGrandTotal().toFixed(2)} */}
							Place Order - Rs. 50.00
						</Button>
					</div>
				</div>
			</div>
		</CustomerLayout>
	);
};

interface OrderSummaryType {
	total: number;
	tax: number;
	orderType: string;
	deliveryFee: number;
	grandTotal: number;
	loyalityPoints?: string;
}
interface PaymentMethodType {
	paymentMethod: string;
	setPaymentMethod: (pay: string) => void;
}

interface AddressType {
	street: string | undefined;
	city: string | undefined;
	state: string | undefined;
	zipCode: string | undefined;
	phone: string | undefined;
}

interface OrderDetailsTypes {
	cartItems: CartStore[],
	specialInstructions: string;
	setSpecialInstructions: (data: string) => void;
}



const DeliveryAddress = ({ street, city, state, zipCode, phone }: AddressType) => {
	return (
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
							value={
								street
							}
						/>
					</div>
					<div>
						<Label htmlFor="city">City</Label>
						<Input
							id="city"
							value={
								city
							}
						/>
					</div>
					<div>
						<Label htmlFor="state">State</Label>
						<Input
							id="state"
							value={
								state
							}
						/>
					</div>
					<div>
						<Label htmlFor="zip">
							ZIP Code
						</Label>
						<Input
							id="zip"
							value={
								zipCode
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
						value={phone}
					/>
				</div>
			</CardContent>
		</Card>
	)
}

const OrderDetails = ({ cartItems, specialInstructions, setSpecialInstructions }: OrderDetailsTypes) => {
	const { removeFromCart, updateQuantity } = useCart();


	return (
		<>
			{/* Cart Items */}
			<Card>
				<CardHeader>
					<CardTitle>
						Order Items ({cartItems?.length})
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{cartItems?.map((item) => (
						<div
							key={item._id}
							className="flex items-center justify-between py-4 border-b last:border-b-0"
						>
							<div className="mr-3">
								<img src={item.image} className="size-20 object-cover rounded-sm border" alt="" />
							</div>
							<div className="flex-1">
								<h4 className="font-medium">
									{item.name}
								</h4>
								<p className="text-sm text-gray-600 dark:text-white/70">
									Rs. {item.priceOfEach.toFixed(2)} each
								</p>
							</div>
							<div className="flex items-center gap-3">
								<div className="flex items-center gap-2 dark:bg-black bg-gray-100 rounded-lg p-1">
									<Button
										size="sm"
										variant="ghost"
										className="h-8 w-8 p-0"
										onClick={() => updateQuantity(item?._id, item.quantity - 1)}
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
										onClick={() => updateQuantity(item?._id, item.quantity + 1)}
									>
										<Plus className="h-4 w-4" />
									</Button>
								</div>
								<div className="text-right min-w-[80px]">
									<p className="font-medium">
										Rs.
										{
											item.totalPrice
										}
									</p>
								</div>
								<Button
									size="sm"
									variant="ghost"
									className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
									onClick={() => removeFromCart(item?._id)}
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
		</>
	)
}

const OrderSummary = ({ total, tax, orderType, deliveryFee, grandTotal, loyalityPoints }: OrderSummaryType) => {
	return (<Card>
		<CardHeader>
			<CardTitle className="flex items-center gap-2">
				<CreditCard className="h-5 w-5" />
				Order Summary
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="flex justify-between">
				<span>Subtotal</span>
				<span>Rs. {total.toFixed(2)}</span>
			</div>
			<div className="flex justify-between">
				<span>Tax</span>
				<span>Rs. {tax.toFixed(2)}</span>
			</div>
			{orderType === "delivery" && (
				<div className="flex justify-between">
					<span>Delivery Fee</span>
					<span>
						{total > 555 ? (
							<span className="text-green-500">
								FREE
							</span>
						) : (
							`Rs. ${deliveryFee}`
						)}
					</span>
				</div>
			)}
			<Separator />
			<div className="flex justify-between font-bold text-lg">
				<span>Total</span>
				<span>Rs. {grandTotal}</span>
			</div>

			{loyalityPoints && (
				<div className="bg-green-50 p-3 rounded-lg">
					<p className="text-sm text-green-800">
						💎 You have {loyalityPoints} loyalty points
					</p>
					<p className="text-xs text-green-600">
						You'll earn 10 points from this order
					</p>
				</div>
			)}
		</CardContent>
	</Card>
	)
}

const PaymentMethod = ({ paymentMethod, setPaymentMethod }: PaymentMethodType) => {
	return (
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
	)
}

const EstimatedTime = ({ orderType }: { orderType: string }) => {
	return (
		<Card>
			<CardContent className="pt-6">
				<div className="flex items-center gap-3 text-center">
					<Clock className="h-5 w-5 text-green-600" />
					<div className="flex flex-col items-start">
						<p className="font-medium">
							Estimated Time
						</p>
						<p className="text-sm text-gray-600 dark:text-white/70">
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
	)
}



export default CustomerCartPage;
