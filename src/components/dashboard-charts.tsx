"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";

const salesData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 200 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 400 },
  { name: "May", value: 200 },
  { name: "Jun", value: 700 },
];

const visitorsData = [
  { name: "Mon", visitors: 400 },
  { name: "Tue", visitors: 600 },
  { name: "Wed", visitors: 800 },
  { name: "Thu", visitors: 700 },
  { name: "Fri", visitors: 600 },
  { name: "Sat", visitors: 800 },
  { name: "Sun", visitors: 900 },
];

export function SalesChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-lg">Sales Analysis</CardTitle>
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
              <Line
                type="monotone"
                dataKey="value"
                stroke="#ef4444"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function VisitorsChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">New Visitors</CardTitle>
        <div className="text-sm text-muted-foreground">
          <span className="font-bold text-2xl text-foreground">450</span> new
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground mb-4">
          Compared to last month
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