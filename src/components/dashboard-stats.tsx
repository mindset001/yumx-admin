"use client";

import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  variant?: "default" | "primary";
  className?: string;
}

export function StatsCard({ title, value, variant = "default", className = "" }: StatsCardProps) {
  return (
    <Card className={`${variant === "primary" ? "bg-red-600 text-white" : "bg-white"} ${className}`}>
      <CardContent className="p-4">
        <div className="space-y-1">
          <p className={`text-sm ${variant === "primary" ? "text-red-100" : "text-muted-foreground"}`}>
            {title}
          </p>
          <p className={`text-2xl font-bold ${variant === "primary" ? "text-white" : "text-foreground"}`}>
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  const stats = [
    { title: "Total orders", value: "25", variant: "primary" as const },
    { title: "Active chefs", value: "25", variant: "default" as const },
    { title: "Active customers", value: "25", variant: "default" as const },
    { title: "Total orders", value: "25", variant: "primary" as const },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          variant={stat.variant}
          className="min-h-[60px] flex-1"
        />
      ))}
    </div>
  );
}