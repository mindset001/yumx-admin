import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import Link from "next/link";

interface Meal {
  id: string;
  submittedDate: string;
  time: string;
  status: 'Active' | 'Suspended';
  mealName: string;
  chef: string;
  category: string;
  price: string;
}

const meals: Meal[] = [
  {
    id: "1",
    submittedDate: "2026-09-01",
    time: "7:30 AM",
    status: "Active",
    mealName: "Chicken shawarma",
    chef: "Adam tukur",
    category: "Snacks",
    price: "NGN300"
  },
  {
    id: "2",
    submittedDate: "2026-09-01",
    time: "7:30 AM",
    status: "Suspended",
    mealName: "Chicken pizza",
    chef: "Adam tukur",
    category: "Dish",
    price: "NGN500"
  },
  {
    id: "3",
    submittedDate: "2026-09-01",
    time: "7:30 AM",
    status: "Active",
    mealName: "Chicken pizza",
    chef: "Adam tukur",
    category: "Dish",
    price: "NGN500"
  },
  {
    id: "4",
    submittedDate: "2026-09-01",
    time: "7:30 AM",
    status: "Active",
    mealName: "Chicken pizza",
    chef: "Adam tukur",
    category: "Dish",
    price: "NGN500"
  },
  {
    id: "5",
    submittedDate: "2026-09-01",
    time: "7:30 AM",
    status: "Active",
    mealName: "Chicken pizza",
    chef: "Adam tukur",
    category: "Dish",
    price: "NGN500"
  },
  {
    id: "6",
    submittedDate: "2026-09-01",
    time: "7:30 AM",
    status: "Suspended",
    mealName: "Chicken pizza",
    chef: "Adam tukur",
    category: "Dish",
    price: "NGN500"
  },
  {
    id: "7",
    submittedDate: "2026-09-01",
    time: "7:30 AM",
    status: "Active",
    mealName: "Chicken pizza",
    chef: "Adam tukur",
    category: "Dish",
    price: "NGN500"
  }
];

const statsCards = [
  {
    title: "Total meals",
    value: "25",
    variant: 'primary' as const
  },
  {
    title: "Active meals",
    value: "25",
    variant: 'secondary' as const
  },
  {
    title: "Not active meals",
    value: "25",
    variant: 'secondary' as const
  },
  {
    title: "Total ordered meals",
    value: "25",
    variant: 'primary' as const
  }
];

export default function MealsPage() {
  return (
    <div className="flex min-h-screen bg-[#FFF2F2]">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#FFF2F2] px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#C72600]">Meal record</h1>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 bg-white py-4 px-8 rounded-lg ">
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
                  <div className="space-y-2 flex items-center justify-between h-[20px]">
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

          {/* Meals Table */}
          <Card>
            <CardContent className="p-0">
              {/* Table Header */}
              <div className="bg-[#C72600] text-white px-6 py-4">
                <div className="grid grid-cols-7 gap-4 text-[11px] font-medium">
                  <div>Submitted date</div>
                  <div>Status</div>
                  <div>Meal name</div>
                  <div>Chef</div>
                  <div>Category</div>
                  <div>Price</div>
                  <div></div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {meals.map((meal) => (
                  <div key={meal.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="grid grid-cols-7 gap-4 items-center">
                      {/* Date */}
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{meal.submittedDate}</div>
                        <div className="text-gray-500">{meal.time}</div>
                      </div>

                      {/* Status */}
                      <div>
                        <Badge 
                          className={`${
                            meal.status === 'Active' 
                              ? 'bg-[#C2E66E] text-black hover:bg-green-100' 
                              : 'bg-[#FFE6B5] text-black hover:bg-yellow-100'
                          }`}
                        >
                          {meal.status}
                        </Badge>
                      </div>

                      {/* Meal Name */}
                      <div className="text-sm font-medium text-gray-900">
                        {meal.mealName}
                      </div>

                      {/* Chef */}
                      <div className="text-sm text-gray-500">
                        {meal.chef}
                      </div>

                      {/* Category */}
                      <div className="text-sm text-gray-500">
                        {meal.category}
                      </div>

                      {/* Price */}
                      <div className="text-sm font-medium text-gray-900">
                        {meal.price}
                      </div>

                      {/* Action */}
                      <div className="text-right">
                        <Link href={`/management/meals/${meal.id}`}>
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