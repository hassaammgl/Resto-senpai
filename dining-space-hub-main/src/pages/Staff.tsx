
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, User, Clock, Phone, Mail } from "lucide-react";

const Staff = () => {
  const staffMembers = [
    {
      id: "1",
      name: "John Smith",
      position: "Head Chef",
      status: "active",
      shift: "Morning",
      phone: "+1 (555) 123-4567",
      email: "john.smith@restaurant.com",
      joinDate: "2023-01-15"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      position: "Sous Chef",
      status: "active",
      shift: "Evening",
      phone: "+1 (555) 234-5678",
      email: "sarah.johnson@restaurant.com",
      joinDate: "2023-03-20"
    },
    {
      id: "3",
      name: "Mike Brown",
      position: "Waiter",
      status: "active",
      shift: "Morning",
      phone: "+1 (555) 345-6789",
      email: "mike.brown@restaurant.com",
      joinDate: "2023-06-10"
    },
    {
      id: "4",
      name: "Emily Davis",
      position: "Manager",
      status: "active",
      shift: "Full Day",
      phone: "+1 (555) 456-7890",
      email: "emily.davis@restaurant.com",
      joinDate: "2022-11-05"
    },
    {
      id: "5",
      name: "Tom Wilson",
      position: "Bartender",
      status: "off-duty",
      shift: "Evening",
      phone: "+1 (555) 567-8901",
      email: "tom.wilson@restaurant.com",
      joinDate: "2023-08-12"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "off-duty": return "bg-yellow-100 text-yellow-800";
      case "unavailable": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Staff Management</h1>
            <p className="text-gray-600">Manage restaurant staff and their schedules</p>
          </div>
          <Button className="bg-amber-600 hover:bg-amber-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Staff Member
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffMembers.map((staff) => (
            <Card key={staff.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{staff.name}</CardTitle>
                      <CardDescription>{staff.position}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(staff.status)}>
                    {staff.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {staff.shift} Shift
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {staff.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {staff.email}
                </div>
                <div className="text-sm text-gray-500">
                  Joined: {new Date(staff.joinDate).toLocaleDateString()}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Staff;
