"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useEffect, useState } from "react";

interface Customer {
  _id: string;
  fullName?: string;
  FullName?: string;
  name?: string;
  email: string;
  createdAt: string;
  totalOrders?: number;
}

interface ChartData {
  name: string;
  value: number;
}

interface VisitorData {
  name: string;
  visitors: number;
}

export function SalesChart() {
  const [salesData, setSalesData] = useState<ChartData[]>([
    { name: "Jan", value: 0 },
    { name: "Feb", value: 0 },
    { name: "Mar", value: 0 },
    { name: "Apr", value: 0 },
    { name: "May", value: 0 },
    { name: "Jun", value: 0 },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const headers: Record<string, string> = {};
        if (typeof window !== 'undefined') {
          const accessToken = localStorage.getItem('accessToken');
          if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || ""}/customer?page=1&limit=50`,
          {
            headers,
            credentials: "include",
          }
        );

        const result = await response.json();
        const customers: Customer[] = result?.data?.data || [];

        // Group customers by month of creation
        const monthCounts: Record<string, number> = {
          Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
          Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0
        };

        customers.forEach((customer) => {
          if (customer.createdAt) {
            const date = new Date(customer.createdAt);
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = monthNames[date.getMonth()];
            monthCounts[month] = (monthCounts[month] || 0) + 1;
          }
        });

        // Get last 6 months of data
        const now = new Date();
        const last6Months: ChartData[] = [];
        for (let i = 5; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const monthName = monthNames[d.getMonth()];
          last6Months.push({
            name: monthName,
            value: monthCounts[monthName] || 0
          });
        }

        setSalesData(last6Months);
      } catch (error) {
        console.error("Error fetching customers for sales chart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-lg">
          {loading ? "Loading Customer Data..." : "Customer Growth Analysis"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                className="text-sm"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-sm"
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#dc2626"
                strokeWidth={3}
                dot={{ fill: "#dc2626", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#dc2626" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function VisitorsChart() {
  const [visitorsData, setVisitorsData] = useState<VisitorData[]>([
    { name: "Mon", visitors: 0 },
    { name: "Tue", visitors: 0 },
    { name: "Wed", visitors: 0 },
    { name: "Thu", visitors: 0 },
    { name: "Fri", visitors: 0 },
    { name: "Sat", visitors: 0 },
    { name: "Sun", visitors: 0 },
  ]);
  const [newCustomersCount, setNewCustomersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const headers: Record<string, string> = {};
        if (typeof window !== 'undefined') {
          const accessToken = localStorage.getItem('accessToken');
          if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || ""}/customer?page=1&limit=50`,
          {
            headers,
            credentials: "include",
          }
        );

        const result = await response.json();
        const customers: Customer[] = result?.data?.data || [];

        // Group customers by day of week for the last 7 days
        const dayCounts: Record<string, number> = {
          Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0
        };

        const now = new Date();
        const last7Days = customers.filter((customer) => {
          if (!customer.createdAt) return false;
          const customerDate = new Date(customer.createdAt);
          const daysDiff = Math.floor((now.getTime() - customerDate.getTime()) / (1000 * 60 * 60 * 24));
          return daysDiff <= 7;
        });

        // Count new customers in the last month
        const lastMonth = customers.filter((customer) => {
          if (!customer.createdAt) return false;
          const customerDate = new Date(customer.createdAt);
          const daysDiff = Math.floor((now.getTime() - customerDate.getTime()) / (1000 * 60 * 60 * 24));
          return daysDiff <= 30;
        });

        setNewCustomersCount(lastMonth.length);

        last7Days.forEach((customer) => {
          if (customer.createdAt) {
            const date = new Date(customer.createdAt);
            const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const day = dayNames[date.getDay()];
            dayCounts[day] = (dayCounts[day] || 0) + 1;
          }
        });

        // Build array for last 7 days
        const last7DaysData: VisitorData[] = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(d.getDate() - i);
          const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          const dayName = dayNames[d.getDay()];
          last7DaysData.push({
            name: dayName,
            visitors: dayCounts[dayName] || 0
          });
        }

        setVisitorsData(last7DaysData);
      } catch (error) {
        console.error("Error fetching customers for visitors chart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">New Customers</CardTitle>
        <div className="text-sm text-muted-foreground">
          <span className="font-bold text-2xl text-foreground">
            {loading ? "..." : newCustomersCount}
          </span> new
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground mb-4">
          Last 30 days
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={visitorsData}>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                className="text-xs"
              />
              <YAxis hide />
              <Bar 
                dataKey="visitors" 
                fill="#dc2626" 
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}