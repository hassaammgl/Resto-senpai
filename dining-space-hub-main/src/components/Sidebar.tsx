
import { Home, Users, Menu, ClipboardList, Settings, ChefHat, LogOut, Package, Percent } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useUser } from "@/contexts/UserContext";

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useUser();
  
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: ClipboardList, label: "Orders", path: "/orders" },
    { icon: Menu, label: "Menu", path: "/menu" },
    { icon: Users, label: "Tables", path: "/tables" },
    { icon: ChefHat, label: "Staff", path: "/staff" },
    { icon: Package, label: "Inventory", path: "/inventory" },
    { icon: Percent, label: "Promotions", path: "/promotions" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-amber-900 to-amber-800 text-white h-screen fixed left-0 top-0 shadow-xl">
      <div className="p-6 border-b border-amber-700">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ChefHat className="h-8 w-8" />
          RestaurantOS
        </h1>
        <p className="text-amber-200 text-sm mt-1">Admin Dashboard</p>
      </div>
      
      <nav className="mt-8 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 hover:bg-amber-700 hover:translate-x-1",
                isActive && "bg-amber-700 shadow-lg"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-amber-700 hover:bg-amber-600 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
