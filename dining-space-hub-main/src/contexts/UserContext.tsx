
import React, { createContext, useContext, useState } from 'react';

type UserRole = 'customer' | 'admin';
type OrderType = 'dine-in' | 'takeaway' | 'delivery';

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: Address;
  loyaltyPoints?: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isCustomer: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  updateUserProfile: (updates: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const isCustomer = user?.role === 'customer';
  const isAdmin = user?.role === 'admin';

  const login = (email: string, password: string) => {
    // Mock login logic - in real app, this would call an API
    if (email === 'admin@restaurant.com') {
      setUser({
        id: '1',
        name: 'Admin User',
        email: 'admin@restaurant.com',
        role: 'admin'
      });
    } else {
      setUser({
        id: '2',
        name: 'Customer User',
        email: email,
        role: 'customer',
        phone: '+1 (555) 123-4567',
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        loyaltyPoints: 150
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      isCustomer,
      isAdmin,
      login,
      logout,
      updateUserProfile
    }}>
      {children}
    </UserContext.Provider>
  );
};
