import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import Link from "next/link";

interface Order {
  id: string;
  orderTime: string;
  time: string;
  status: 'Active' | 'Suspended';
  customerName: string;
  chef: string;
  meal: string;
  amount: string;
  deliveryETA: string;
}

const orders: Order[] = [
  {
    id: "1",
    orderTime: "2028-09-01",
    time: "7:30 AM",
    status: "Active",
    customerName: "Adam tukur",
    chef: "Adam tukur",
    meal: "Chicken shawarma",
    amount: "NGN1000",
    deliveryETA: "2028-09-01"
  },
  {
    id: "2",
    orderTime: "2028-09-01",
    time: "7:30 AM",
    status: "Suspended",
    customerName: "Adam tukur",
    chef: "Adam tukur",
    meal: "Dish",
    amount: "NGN500",
    deliveryETA: "2028-09-01"
  },
  {
    id: "3",
    orderTime: "2028-09-01",
    time: "7:30 AM",
    status: "Active",
    customerName: "Adam tukur",
    chef: "Adam tukur",
    meal: "Dish",
    amount: "NGN500",
    deliveryETA: "2028-09-01"
  },
  {
    id: "4",
    orderTime: "2028-09-01",
    time: "7:30 AM",
    status: "Active",
    customerName: "Adam tukur",
    chef: "Adam tukur",
    meal: "Dish",
    amount: "NGN500",
    deliveryETA: "2028-09-01"
  },
  {
    id: "5",
    orderTime: "2028-09-01",
    time: "7:30 AM",
    status: "Active",
    customerName: "Adam tukur",
    chef: "Adam tukur",
    meal: "Dish",
    amount: "NGN500",
    deliveryETA: "2028-09-01"
  }
];

const statsCards = [
  {
    title: "Total orders",
    value: "25",
    variant: 'primary' as const
  },
  {
    title: "Completed orders",
    value: "25",
    variant: 'secondary' as const
  },
  {
    title: "Failed orders",
    value: "25",
    variant: 'secondary' as const
  },
  {
    title: "Uncompleted orders",
    value: "25",
    variant: 'primary' as const
  }
];

export default function OrdersPage() {
  return (
    <div className="flex min-h-screen bg-[#FFF2F2]">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#FFF2F2] px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#C72600]">Order record</h1>
            <div className="relative bg-white">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search menu"
                className="pl-10 w-80"
              />
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 bg-white py-6 px-12 rounded-lg">
            {statsCards.map((stat, index) => (
              <Card 
                key={index}
                className={`${
                  stat.variant === 'primary' 
                    ? 'bg-[#C72600] text-white border-0' 
                    : 'bg-[#FFF2F2] border border-gray-200'
                } transition-all duration-300 hover:shadow-lg`}
              >
                <CardContent className="">
                  <div className="space-y-2 h-[10px] flex items-center justify-between">
                    <p className={`text-sm font-medium ${
                      stat.variant === 'primary' 
                        ? 'text-red-100' 
                        : 'text-[#C72600]'
                    }`}>
                      {stat.title}
                    </p>
                    <p className={`text-2xl font-bold ${
                      stat.variant === 'primary' 
                        ? 'text-white' 
                        : 'text-[#C72600]'
                    }`}>
                      {stat.value}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Orders Table */}
          <Card>
            <CardContent className="p-0">
              {/* Table Header */}
              <div className="bg-[#C72600] text-white px-6 py-4">
                <div className="grid grid-cols-8 gap-4 text-[11px] font-medium">
                  <div>Order time</div>
                  <div>Status</div>
                  <div>Customer name</div>
                  <div>Chef</div>
                  <div>Meal</div>
                  <div>Amount</div>
                  <div>Delivery ETA</div>
                  <div></div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <div key={order.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="grid grid-cols-8 gap-4 items-center">
                      {/* Order Time */}
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{order.orderTime}</div>
                        <div className="text-gray-500">{order.time}</div>
                      </div>

                      {/* Status */}
                      <div>
                        <Badge 
                          className={`${
                            order.status === 'Active' 
                              ? 'bg-[#C2E66E] text-green-800 hover:bg-green-100' 
                              : 'bg-[#FFE6B5] text-yellow-800 hover:bg-yellow-100'
                          }`}
                        >
                          {order.status}
                        </Badge>
                      </div>

                      {/* Customer Name */}
                      <div className="text-sm font-medium text-gray-900">
                        {order.customerName}
                      </div>

                      {/* Chef */}
                      <div className="text-sm text-gray-500">
                        {order.chef}
                      </div>

                      {/* Meal */}
                      <div className="text-sm text-gray-500">
                        {order.meal}
                      </div>

                      {/* Amount */}
                      <div className="text-sm font-medium text-gray-900">
                        {order.amount}
                      </div>

                      {/* Delivery ETA */}
                      <div className="text-sm text-gray-500">
                        {order.deliveryETA}
                      </div>

                      {/* Action */}
                      <div className="text-right">
                        <Link href={`/management/orders/${order.id}`}>
                          <Button 
                            size="sm" 
                            className="bg-[#C72600] hover:bg-red-700 text-white"
                          >
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}