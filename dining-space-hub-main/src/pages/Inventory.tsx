
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Package, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

const Inventory = () => {
  const inventoryItems = [
    {
      id: "1",
      name: "Atlantic Salmon",
      category: "Seafood",
      currentStock: 25,
      minStock: 10,
      maxStock: 50,
      unit: "lbs",
      costPerUnit: 12.50,
      supplier: "Ocean Fresh Co.",
      lastRestocked: "2024-06-01",
      status: "good"
    },
    {
      id: "2",
      name: "Romaine Lettuce",
      category: "Vegetables",
      currentStock: 5,
      minStock: 15,
      maxStock: 30,
      unit: "heads",
      costPerUnit: 2.25,
      supplier: "Farm Fresh Produce",
      lastRestocked: "2024-05-30",
      status: "low"
    },
    {
      id: "3",
      name: "Ground Beef",
      category: "Meat",
      currentStock: 40,
      minStock: 20,
      maxStock: 60,
      unit: "lbs",
      costPerUnit: 8.75,
      supplier: "Prime Meats Ltd.",
      lastRestocked: "2024-06-02",
      status: "good"
    },
    {
      id: "4",
      name: "Tomatoes",
      category: "Vegetables",
      currentStock: 2,
      minStock: 20,
      maxStock: 40,
      unit: "lbs",
      costPerUnit: 3.50,
      supplier: "Garden Grove",
      lastRestocked: "2024-05-28",
      status: "critical"
    },
    {
      id: "5",
      name: "Mozzarella Cheese",
      category: "Dairy",
      currentStock: 15,
      minStock: 10,
      maxStock: 25,
      unit: "lbs",
      costPerUnit: 6.25,
      supplier: "Dairy Best",
      lastRestocked: "2024-06-01",
      status: "good"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "bg-green-100 text-green-800";
      case "low": return "bg-yellow-100 text-yellow-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good": return <TrendingUp className="h-4 w-4" />;
      case "low": return <AlertTriangle className="h-4 w-4" />;
      case "critical": return <TrendingDown className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const lowStockItems = inventoryItems.filter(item => item.status === "low" || item.status === "critical");
  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h1>
            <p className="text-gray-600">Track and manage restaurant inventory and supplies</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              Generate Report
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventoryItems.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{lowStockItems.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalValue.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alerts */}
        {lowStockItems.length > 0 && (
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Low Stock Alerts
              </CardTitle>
              <CardDescription>Items that need immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium text-red-900">{item.name}</p>
                      <p className="text-sm text-red-700">
                        Current: {item.currentStock} {item.unit} | Minimum: {item.minStock} {item.unit}
                      </p>
                    </div>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Reorder Now
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Items</CardTitle>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input placeholder="Search items..." />
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="meat">Meat</SelectItem>
                  <SelectItem value="seafood">Seafood</SelectItem>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="dairy">Dairy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Cost/Unit</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Last Restocked</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      {item.currentStock} {item.unit}
                      <div className="text-xs text-gray-500">
                        Min: {item.minStock} | Max: {item.maxStock}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        {getStatusIcon(item.status)}
                        <span className="ml-1 capitalize">{item.status}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>${item.costPerUnit}</TableCell>
                    <TableCell>${(item.currentStock * item.costPerUnit).toFixed(2)}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>{new Date(item.lastRestocked).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Inventory;
