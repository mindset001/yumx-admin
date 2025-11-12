'use client'

import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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

function useMeals() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint = `${process.env.NEXT_PUBLIC_API_URL || ""}/meal`;
        const headers: Record<string, string> = {};
        if (typeof window !== 'undefined') {
          const accessToken = localStorage.getItem('accessToken');
          if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
        }
        const res = await fetch(endpoint, {
          method: "GET",
          headers,
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch meals");
        const data = await res.json();
        setMeals(Array.isArray(data) ? data : (data.meals || []));
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);
  return { meals, loading, error };
}

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
  const { meals, loading, error } = useMeals();
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#FFF2F2]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#FFF2F2] px-2 sm:px-4 md:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h1 className="text-lg sm:text-2xl font-bold text-[#C72600]">Meal record</h1>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 bg-white py-4 px-2 sm:px-6 md:px-12 rounded-lg">
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
                  <div className="flex items-center justify-between min-h-[32px]">
                    <p className={`text-xs sm:text-sm font-medium ${
                      stat.variant === 'primary'
                        ? 'text-red-100'
                        : 'text-[#C72600]'
                    }`}>
                      {stat.title}
                    </p>
                    <p className={`text-base sm:text-lg md:text-2xl font-bold ${
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
              <div className="bg-[#C72600] text-white px-2 sm:px-6 py-4 hidden md:block">
                <div className="grid grid-cols-7 gap-4 text-xs font-medium">
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
                {loading && <div className="p-4 text-center text-gray-500">Loading meals...</div>}
                {error && <div className="p-4 text-center text-red-500">{error}</div>}
                {!loading && !error && meals.length === 0 && (
                  <div className="p-4 text-center text-gray-500">No meals available</div>
                )}
                {!loading && !error && meals.length > 0 && meals.map((meal) => (
                  <div key={meal.id} className="px-2 sm:px-6 py-4 hover:bg-gray-50">
                    {/* Responsive: grid for md+, stacked for mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-2 md:gap-4 items-center">
                      {/* Date */}
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{meal.submittedDate || "-"}</div>
                        <div className="text-gray-500">{meal.time || ""}</div>
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
                          {meal.status || "-"}
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