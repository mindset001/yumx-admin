'use client'

import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface StatCard {
  title: string
  value: string | number
  variant: 'primary' | 'secondary'
  icon?: React.ReactNode
  change?: string
}

interface DashboardStats {
  totalOrders: number
  activeChefs: number
  activeCustomers: number
  totalMeals: number
}

export function StatsCards() {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    activeChefs: 0,
    activeCustomers: 0,
    totalMeals: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers: Record<string, string> = {}
        if (typeof window !== 'undefined') {
          const accessToken = localStorage.getItem('accessToken')
          if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`
        }

        // Fetch all stats in parallel
        const [ordersRes, chefsRes, customersRes, mealsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/order?page=1&limit=1`, {
            headers,
            credentials: "include"
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/chef?page=1&limit=1`, {
            headers,
            credentials: "include"
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/customer?page=1&limit=1`, {
            headers,
            credentials: "include"
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/meal?page=1&limit=1`, {
            headers,
            credentials: "include"
          })
        ])

        const [ordersData, chefsData, customersData, mealsData] = await Promise.all([
          ordersRes.json(),
          chefsRes.json(),
          customersRes.json(),
          mealsRes.json()
        ])

        setStats({
          totalOrders: ordersData?.data?.total || 0,
          activeChefs: chefsData?.data?.total || 0,
          activeCustomers: customersData?.data?.total || 0,
          totalMeals: mealsData?.data?.total || 0
        })
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards: StatCard[] = [
    {
      title: "Total orders",
      value: loading ? "..." : stats.totalOrders,
      variant: 'primary',
      change: "+12%"
    },
    {
      title: "Active chefs",
      value: loading ? "..." : stats.activeChefs,
      variant: 'secondary',
      change: "+8%"
    },
    {
      title: "Active customers",
      value: loading ? "..." : stats.activeCustomers,
      variant: 'secondary',
      change: "+15%"
    },
    {
      title: "Total Meals",
      value: loading ? "..." : stats.totalMeals,
      variant: 'primary',
      change: "+20%"
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 bg-white p-2 sm:p-4 rounded-lg mb-6 w-full">
      {statCards.map((stat, index) => (
        <Card
          key={index}
          className={
            `${
              stat.variant === 'primary'
                ? 'bg-[#C72600] text-white border-0'
                : 'bg-[#FFF2F2] border border-gray-200 hover:border-red-200'
            } transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group min-h-[60px] flex-1`
          }
        >
          <CardContent className="px-2 sm:px-4 py-2 flex items-center w-full">
            <div className="flex justify-between items-center w-full">
              <p className={`text-xs sm:text-sm font-medium ${
                stat.variant === 'primary'
                  ? 'text-red-100'
                  : 'text-[#C72600]'
              }`}>
                {stat.title}
              </p>
              <p className={`text-base sm:text-lg md:text-xl font-bold ${
                stat.variant === 'primary'
                  ? 'text-white'
                  : 'text-[#C72600]'
              } group-hover:scale-105 transition-transform duration-200`}>
                {stat.value}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}