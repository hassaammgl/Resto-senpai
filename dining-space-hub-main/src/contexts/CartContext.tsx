
import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customizations?: string[];
  specialInstructions?: string;
}

interface DeliveryInfo {
  type: 'dine-in' | 'takeaway' | 'delivery';
  tableNumber?: number;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  deliveryTime?: string;
  contactPhone: string;
}

interface CartContextType {
  items: CartItem[];
  deliveryInfo: DeliveryInfo | null;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setDeliveryInfo: (info: DeliveryInfo) => void;
  getTotal: () => number;
  getItemCount: () => number;
  getTax: () => number;
  getDeliveryFee: () => number;
  getGrandTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === newItem.id);
      if (existing) {
        return prev.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setDeliveryInfo(null);
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTax = () => {
    return getTotal() * 0.08; // 8% tax
  };

  const getDeliveryFee = () => {
    if (deliveryInfo?.type === 'delivery') {
      return getTotal() >= 30 ? 0 : 4.99; // Free delivery over $30
    }
    return 0;
  };

  const getGrandTotal = () => {
    return getTotal() + getTax() + getDeliveryFee();
  };

  return (
    <CartContext.Provider value={{
      items,
      deliveryInfo,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      setDeliveryInfo,
      getTotal,
      getItemCount,
      getTax,
      getDeliveryFee,
      getGrandTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};
