import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import Link from "next/link";

interface Customer {
  id: string;
  dateJoined: string;
  time: string;
  status: 'Active' | 'Suspended';
  name: string;
  email: string;
  location: string;
}

const customers: Customer[] = [
  {
    id: "1",
    dateJoined: "2026-06-01",
    time: "7:30 AM",
    status: "Active",
    name: "Adam tukur",
    email: "Adam.tukur@gmail.com",
    location: "Abuja, Nigeria"
  },
  {
    id: "2",
    dateJoined: "2026-06-01",
    time: "7:30 AM",
    status: "Suspended",
    name: "Adam tukur",
    email: "Adam.tukur@gmail.com",
    location: "Abuja, Nigeria"
  },
  {
    id: "3",
    dateJoined: "2026-06-01",
    time: "7:30 AM",
    status: "Active",
    name: "Adam tukur",
    email: "Adam.tukur@gmail.com",
    location: "Abuja, Nigeria"
  },
  {
    id: "4",
    dateJoined: "2026-06-01",
    time: "7:30 AM",
    status: "Active",
    name: "Adam tukur",
    email: "Adam.tukur@gmail.com",
    location: "Abuja, Nigeria"
  },
  {
    id: "5",
    dateJoined: "2026-06-01",
    time: "7:30 AM",
    status: "Active",
    name: "Adam tukur",
    email: "Adam.tukur@gmail.com",
    location: "Abuja, Nigeria"
  },
  {
    id: "6",
    dateJoined: "2026-06-01",
    time: "7:30 AM",
    status: "Suspended",
    name: "Adam tukur",
    email: "Adam.tukur@gmail.com",
    location: "Abuja, Nigeria"
  },
  {
    id: "7",
    dateJoined: "2026-06-01",
    time: "7:30 AM",
    status: "Active",
    name: "Adam tukur",
    email: "Adam.tukur@gmail.com",
    location: "Abuja, Nigeria"
  }
];

const statsCards = [
  {
    title: "Total customers",
    value: "25",
    variant: 'primary' as const
  },
  {
    title: "Active customers",
    value: "25",
    variant: 'secondary' as const
  },
  {
    title: "Not active customers",
    value: "25",
    variant: 'secondary' as const
  },
  {
    title: "Total customers order",
    value: "25",
    variant: 'primary' as const
  }
];

export default function CustomersPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#FFF2F2]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#FFF2F2] px-2 sm:px-4 md:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h1 className="text-lg sm:text-2xl font-bold text-[#C72600]">Customer record</h1>
            <div className="relative w-full sm:w-auto bg-white">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search menu"
                className="pl-10 w-full sm:w-80"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 p-2 sm:p-4 md:p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white py-4 px-2 sm:px-6 md:px-12 rounded-lg">
            {statsCards.map((stat, index) => (
              <Card
                key={index}
                className={`${stat.variant === 'primary'
                    ? 'bg-[#C72600] text-white border-0'
                    : 'bg-[#FFF2F2] border border-gray-200'
                  } transition-all duration-300 hover:shadow-lg`}
              >
                <CardContent className="">
                  <div className="flex items-center justify-between min-h-[32px]">
                    <p className={`text-xs sm:text-sm font-medium ${stat.variant === 'primary'
                        ? 'text-red-100'
                        : 'text-[#C72600]'
                      }`}>
                      {stat.title}
                    </p>
                    <p className={`text-base sm:text-lg md:text-2xl font-bold ${stat.variant === 'primary'
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

          {/* Customers Table */}
          <Card>
            <CardContent className="p-0">
              {/* Table Header */}
              <div className="bg-[#C72600] text-white px-2 sm:px-6 py-4 hidden md:block">
                <div className="grid grid-cols-6 gap-4 text-xs font-medium">
                  <div>Date joined</div>
                  <div>Status</div>
                  <div>User name</div>
                  <div>Email address</div>
                  <div>Location</div>
                  <div></div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {customers.map((customer) => (
                  <div key={customer.id} className="px-2 sm:px-6 py-4 hover:bg-gray-50">
                    {/* Responsive: grid for md+, stacked for mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-4 items-center">
                      {/* Date */}
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{customer.dateJoined}</div>
                        <div className="text-gray-500">{customer.time}</div>
                      </div>

                      {/* Status */}
                      <div>
                        <Badge
                          className={`${customer.status === 'Active'
                              ? 'bg-green-100 text-green-800 hover:bg-green-100'
                              : 'bg-red-100 text-red-800 hover:bg-red-100'
                            }`}
                        >
                          {customer.status}
                        </Badge>
                      </div>

                      {/* Name */}
                      <div className="text-sm font-medium text-gray-900">
                        {customer.name}
                      </div>

                      {/* Email */}
                      <div className="text-sm text-gray-500">
                        {customer.email}
                      </div>

                      {/* Location */}
                      <div className="text-sm text-gray-500">
                        {customer.location}
                      </div>

                      {/* Action */}
                      <div className="text-right">
                        <Link href={`/management/customers/${customer.id}`}>
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