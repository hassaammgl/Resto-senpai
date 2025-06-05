
import Layout from "@/components/Layout";
import OrderCard from "@/components/OrderCard";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";

const Orders = () => {
  const orders = [
    {
      id: "001",
      tableNumber: 5,
      customer: "John Smith",
      items: ["Caesar Salad", "Grilled Salmon", "Wine"],
      status: "preparing" as const,
      time: "12:30 PM",
      total: 45.99,
    },
    {
      id: "002",
      tableNumber: 3,
      customer: "Mary Johnson",
      items: ["Burger", "Fries", "Coke"],
      status: "ready" as const,
      time: "12:25 PM",
      total: 18.50,
    },
    {
      id: "003",
      tableNumber: 8,
      customer: "David Wilson",
      items: ["Pasta", "Garlic Bread"],
      status: "pending" as const,
      time: "12:35 PM",
      total: 22.75,
    },
    {
      id: "004",
      tableNumber: 12,
      customer: "Sarah Davis",
      items: ["Steak", "Mashed Potatoes", "Vegetables"],
      status: "preparing" as const,
      time: "12:40 PM",
      total: 55.00,
    },
    {
      id: "005",
      tableNumber: 6,
      customer: "Mike Brown",
      items: ["Pizza Margherita", "Salad"],
      status: "delivered" as const,
      time: "12:15 PM",
      total: 28.99,
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
            <p className="text-gray-600">Track and manage all restaurant orders efficiently.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-2" />
              New Order
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <OrderCard key={order.id} {...order} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
