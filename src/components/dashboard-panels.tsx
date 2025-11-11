"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal, Eye } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 bg-[#FFF2F2] gap-2 sm:gap-0">
      <h1 className="text-lg sm:text-2xl font-semibold text-gray-900">Dashboard</h1>
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/avatar.jpg" alt="Adam Iufut" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <span className="text-xs sm:text-sm font-medium">Adam Iufut</span>
      </div>
    </div>
  );
}

export function ActivitiesPanel() {
  const activities = [
    {
      id: 1,
      user: "Fatima Abubakar",
      action: "View",
      time: "10:24 AM",
      status: "Active" as const,
    },
    {
      id: 2,
      user: "Fatima Abubakar",
      action: "View",
      time: "10:24 AM",
      status: "Active" as const,
    },
    {
      id: 3,
      user: "Fatima Abubakar",
      action: "View",
      time: "10:24 AM",
      status: "Active" as const,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs sm:text-sm font-medium">Activities</CardTitle>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
            <span className="text-xs font-medium flex-1 truncate">{activity.user}</span>
            <Badge variant="outline" className="text-xs px-2 py-1 min-w-[60px] text-center">
              {activity.status}
            </Badge>
            <span className="text-xs text-gray-500">{activity.time}</span>
            <Button variant="ghost" size="icon" className="p-1">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function MenuSubmissionPanel() {
  const submissions = [
    {
      id: 1,
      user: "Fatima Abubakar",
      dish: "Fried rice with chicken",
      status: "pending" as const,
    },
    {
      id: 2,
      user: "Fatima Abubakar",
      dish: "Jollof rice",
      status: "pending" as const,
    },
    {
      id: 3,
      user: "Fatima Abubakar", 
      dish: "Amala and ewedu",
      status: "pending" as const,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Menu submission</CardTitle>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {submissions.map((submission) => (
          <div key={submission.id} className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/food.jpg" alt={submission.dish} />
              <AvatarFallback>🍽️</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {submission.user}
              </p>
              <p className="text-xs text-muted-foreground">
                {submission.dish}
              </p>
              <div className="flex gap-2">
                <Button size="sm" className="h-6 text-xs">
                  Approve
                </Button>
                <Button variant="destructive" size="sm" className="h-6 text-xs">
                  Reject
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}