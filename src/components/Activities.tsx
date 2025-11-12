'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal } from "lucide-react"
import { useEffect, useState } from "react"

interface Meal {
  _id: string
  id: string
  name: string
  details?: string
  price: number
  cuisine?: string
  imageUrls?: string[] | null
  chef: {
    id: string
    fullName: string
    profilePicture?: string
  }
  createdAt: string
  updatedAt: string
  status: string
  isAvailable: boolean
  orderType: string
  rating: number | null
  ingredients?: string[]
  fruits?: string[]
  currency?: string
}

interface Activity {
  id: string
  user: {
    name: string
    role: string
    avatar: string
    initials: string
  }
  action: string
  time: string
  status: 'pending' | 'verified'
}

function getTimeAgo(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''}`
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''}`
  return `${diffDays} day${diffDays !== 1 ? 's' : ''}`
}

function getInitials(name: string): string {
  const names = name.split(' ')
  if (names.length >= 2) {
    return names[0][0] + names[1][0]
  }
  return name.substring(0, 2).toUpperCase()
}

export function Activities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const headers: Record<string, string> = {}
        if (typeof window !== 'undefined') {
          const accessToken = localStorage.getItem('accessToken')
          if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`
        }

        const response = await fetch(
          '/api/meal?page=1&limit=5',
          {
            headers,
            credentials: "include",
          }
        )

        const result = await response.json()
        const meals: Meal[] = result?.data?.data || []

        const formattedActivities: Activity[] = meals.map((meal) => {
          const chefName = meal.chef?.fullName || "Unknown Chef"
          
          return {
            id: meal._id || meal.id,
            user: {
              name: chefName,
              role: "Chef",
              avatar: meal.chef?.profilePicture || "/images/man.png",
              initials: getInitials(chefName)
            },
            action: getTimeAgo(meal.createdAt),
            time: getTimeAgo(meal.createdAt),
            status: meal.status?.toLowerCase() === 'approved' ? 'verified' : 'pending'
          }
        })

        setActivities(formattedActivities)
      } catch (error) {
        console.error("Error fetching meals for activities:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMeals()
  }, [])

  if (loading) {
    return (
      <Card className="w-full max-w-sm bg-transparent border-0 shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base font-medium">Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    )
  }
  return (
    <Card className="w-full max-w-sm bg-transparent border-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-medium">Activities</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-2 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <Avatar className="h-20 w-20 rounded-sm">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback className="bg-orange-100 text-orange-700">
                  {activity.user.initials}
                </AvatarFallback>
              </Avatar>
             
            </div>
            <div>
                 <div className="space-y-1">
                <p className="text-[20px] font-medium leading-none">
                  {activity.user.name}
                </p>
                <p className="text-[14px] text-muted-foreground mb-2">
                  {activity.user.role} • <span className="text-[12px]">{activity.action}</span>
                </p>
              </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="lg" className="h-7 text-xs">
                View
              </Button>
              <Button 
                size="lg" 
                className="h-7 text-xs bg-red-600 hover:bg-red-700 text-white"
              >
                Verify
              </Button>
            </div>
            </div>
          </div>
        ))}
        
        <div className="pt-2">
          <Button variant="link" className="h-auto p-0 text-xs text-muted-foreground">
            View all
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}