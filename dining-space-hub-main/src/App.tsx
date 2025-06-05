
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider, useUser } from "@/contexts/UserContext";
import { CartProvider } from "@/contexts/CartContext";
import LoginForm from "@/components/LoginForm";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Menu from "./pages/Menu";
import Tables from "./pages/Tables";
import Staff from "./pages/Staff";
import Settings from "./pages/Settings";
import Inventory from "./pages/Inventory";
import Promotions from "./pages/Promotions";
import CustomerMenu from "./pages/customer/CustomerMenu";
import CustomerCart from "./pages/customer/CustomerCart";
import CustomerOrders from "./pages/customer/CustomerOrders";
import CustomerProfile from "./pages/customer/CustomerProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user, isCustomer, isAdmin } = useUser();

  if (!user) {
    return <LoginForm />;
  }

  return (
    <Routes>
      {isAdmin && (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/settings" element={<Settings />} />
        </>
      )}
      {isCustomer && (
        <>
          <Route path="/customer" element={<CustomerMenu />} />
          <Route path="/customer/cart" element={<CustomerCart />} />
          <Route path="/customer/orders" element={<CustomerOrders />} />
          <Route path="/customer/profile" element={<CustomerProfile />} />
          <Route path="/" element={<CustomerMenu />} />
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </CartProvider>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
