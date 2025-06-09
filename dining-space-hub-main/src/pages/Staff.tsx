
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Edit, Trash2, Clock, DollarSign } from 'lucide-react';
import StaffRegistrationForm from '@/components/StaffRegistrationForm';

interface Staff {
  id: string;
  name: string;
  email: string;
  position: string;
  shift: string;
  hourlyRate: number;
  status: 'active' | 'inactive' | 'on-leave';
  hireDate: string;
}

const Staff = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  
  // Mock staff data
  const [staffMembers] = useState<Staff[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@restaurant.com',
      position: 'Head Chef',
      shift: 'morning',
      hourlyRate: 25.00,
      status: 'active',
      hireDate: '2023-01-15'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@restaurant.com',
      position: 'Server',
      shift: 'evening',
      hourlyRate: 15.50,
      status: 'active',
      hireDate: '2023-03-20'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike@restaurant.com',
      position: 'Bartender',
      shift: 'evening',
      hourlyRate: 18.00,
      status: 'on-leave',
      hireDate: '2023-02-10'
    },
    {
      id: '4',
      name: 'Lisa Brown',
      email: 'lisa@restaurant.com',
      position: 'Manager',
      shift: 'full-day',
      hourlyRate: 22.00,
      status: 'active',
      hireDate: '2022-11-05'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getShiftDisplay = (shift: string) => {
    switch (shift) {
      case 'morning': return 'Morning (6 AM - 2 PM)';
      case 'evening': return 'Evening (2 PM - 10 PM)';
      case 'night': return 'Night (10 PM - 6 AM)';
      case 'full-day': return 'Full Day';
      default: return shift;
    }
  };

  const activeStaff = staffMembers.filter(staff => staff.status === 'active').length;
  const totalPayroll = staffMembers
    .filter(staff => staff.status === 'active')
    .reduce((sum, staff) => sum + (staff.hourlyRate * 40), 0); // Assuming 40 hours per week

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
            <p className="text-gray-600">Manage your restaurant staff and schedules</p>
          </div>
          <Button 
            onClick={() => setShowRegistrationForm(true)}
            className="bg-amber-600 hover:bg-amber-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Staff Member
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{staffMembers.length}</div>
              <p className="text-xs text-muted-foreground">
                {activeStaff} active members
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Payroll</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalPayroll.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Based on 40 hours/week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Duty</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeStaff}</div>
              <p className="text-xs text-muted-foreground">
                Currently working
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Staff List */}
        <Card>
          <CardHeader>
            <CardTitle>Staff Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staffMembers.map((staff) => (
                <div key={staff.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{staff.name}</h3>
                      <Badge className={getStatusColor(staff.status)}>
                        {staff.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><span className="font-medium">Position:</span> {staff.position}</p>
                      <p><span className="font-medium">Email:</span> {staff.email}</p>
                      <p><span className="font-medium">Shift:</span> {getShiftDisplay(staff.shift)}</p>
                      <p><span className="font-medium">Hourly Rate:</span> ${staff.hourlyRate.toFixed(2)}</p>
                      <p><span className="font-medium">Hire Date:</span> {new Date(staff.hireDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {showRegistrationForm && (
        <StaffRegistrationForm onClose={() => setShowRegistrationForm(false)} />
      )}
    </Layout>
  );
};

export default Staff;
