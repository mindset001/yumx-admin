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

interface MenuSubmission {
  id: string
  user: {
    name: string
    role: string
    avatar: string
    initials: string
  }
  dish: {
    name: string
    image: string
  }
  time: string
  status: 'pending' | 'approved' | 'rejected'
}

function getTimeAgo(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  return `${diffDays}d ago`
}

function getInitials(name: string): string {
  const names = name.split(' ')
  if (names.length >= 2) {
    return names[0][0] + names[1][0]
  }
  return name.substring(0, 2).toUpperCase()
}

export function MenuSubmission() {
  const [submissions, setSubmissions] = useState<MenuSubmission[]>([])
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
          `${process.env.NEXT_PUBLIC_API_URL || 'https://yumx.metronio.com'}/meal?page=1&limit=3`,
          {
            headers,
            credentials: "include",
          }
        )

        const result = await response.json()
        const meals: Meal[] = result?.data?.data || []
        console.log('meals for menu submission', meals)

        const formattedSubmissions: MenuSubmission[] = meals.map((meal) => {
          const chefName = meal.chef?.fullName || "Unknown Chef"
          const mealImage = meal.imageUrls?.[0] || "/images/food.png"
          
          return {
            id: meal._id || meal.id,
            user: {
              name: chefName,
              role: "Chef",
              avatar: meal.chef?.profilePicture || "/images/food.png",
              initials: getInitials(chefName)
            },
            dish: {
              name: meal.name,
              image: mealImage
            },
            time: getTimeAgo(meal.createdAt),
            status: meal.status?.toLowerCase() as 'pending' | 'approved' | 'rejected' || 'pending'
          }
        })

        setSubmissions(formattedSubmissions)
      } catch (error) {
        console.error("Error fetching meals for menu submission:", error)
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
          <CardTitle className="text-base font-medium">Menu submission</CardTitle>
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
        <CardTitle className="text-base font-medium">Menu submission</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {submissions.map((submission) => (
          <div key={submission.id} className="flex flex-col bg-white p-4 rounded-lg ">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={submission.user.avatar} alt={submission.user.name} />
                  <AvatarFallback className="bg-orange-100 text-orange-700">
                    {submission.user.initials}
                  </AvatarFallback>
                </Avatar>
                {/* Dish image overlay */}
                <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-orange-500 border-2 border-white overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                    <span className="text-xs">🍽️</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {submission.user.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {submission.dish.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {submission.time}
                </p>
              </div>
            </div>
            <div className="flex items-center border-t p-2 space-x-2">
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Approve
              </Button>
              <Button 
                size="sm" 
                className="h-7 text-xs bg-red-600 hover:bg-red-700 text-white"
              >
                Reject
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}