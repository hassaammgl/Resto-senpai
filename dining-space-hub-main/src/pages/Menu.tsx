
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";

const Menu = () => {
  const menuItems = [
    {
      id: 1,
      name: "Grilled Salmon",
      description: "Fresh Atlantic salmon with herbs and lemon",
      price: 28.99,
      category: "Main Course",
      image: "🐟",
      available: true,
    },
    {
      id: 2,
      name: "Caesar Salad",
      description: "Crisp romaine lettuce with parmesan and croutons",
      price: 14.99,
      category: "Appetizer",
      image: "🥗",
      available: true,
    },
    {
      id: 3,
      name: "Beef Burger",
      description: "Juicy beef patty with fresh vegetables",
      price: 16.99,
      category: "Main Course",
      image: "🍔",
      available: false,
    },
    {
      id: 4,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with vanilla ice cream",
      price: 8.99,
      category: "Dessert",
      image: "🍰",
      available: true,
    },
    {
      id: 5,
      name: "Margherita Pizza",
      description: "Classic pizza with tomato, mozzarella, and basil",
      price: 18.99,
      category: "Main Course",
      image: "🍕",
      available: true,
    },
    {
      id: 6,
      name: "French Fries",
      description: "Crispy golden fries with sea salt",
      price: 6.99,
      category: "Side",
      image: "🍟",
      available: true,
    },
  ];

  const categories = ["All", "Appetizer", "Main Course", "Side", "Dessert"];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Menu Management</h1>
            <p className="text-gray-600">Manage your restaurant's menu items and pricing.</p>
          </div>
          <Button className="bg-amber-600 hover:bg-amber-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Menu Item
          </Button>
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
            <div key={item.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-4xl mb-2">{item.image}</div>
                  <div className="flex gap-2">
                    <Badge variant={item.available ? "default" : "secondary"}>
                      {item.available ? "Available" : "Out of Stock"}
                    </Badge>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-amber-600">${item.price}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
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
