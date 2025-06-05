
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  const handleAdminLogin = () => {
    setEmail('admin@restaurant.com');
    setPassword('admin123');
    login('admin@restaurant.com', 'admin123');
  };

  const handleCustomerLogin = () => {
    setEmail('customer@example.com');
    setPassword('customer123');
    login('customer@example.com', 'customer123');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">RestaurantOS</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
              Sign In
            </Button>
          </form>
          
          <div className="mt-6 space-y-2">
            <p className="text-sm text-gray-600 text-center">Quick Demo Login:</p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={handleAdminLogin}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Admin Demo
              </Button>
              <Button
                onClick={handleCustomerLogin}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Customer Demo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
