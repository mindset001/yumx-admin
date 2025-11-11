import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, ChefHat, ShoppingBag } from "lucide-react"

interface StatCard {
  title: string
  value: string | number
  variant: 'primary' | 'secondary'
  icon?: React.ReactNode
  change?: string
}

const stats: StatCard[] = [
  {
    title: "Total orders",
    value: "25",
    variant: 'primary',
    change: "+12%"
  },
  {
    title: "Active chefs",
    value: "25",
    variant: 'secondary',
    change: "+8%"
  },
  {
    title: "Active customers",
    value: "25",
    variant: 'secondary',
    change: "+15%"
  },
  {
    title: "Total orders",
    value: "25",
    variant: 'primary',
    change: "+20%"
  }
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-2 sm:p-4 rounded-lg mb-6 w-full">
      {stats.map((stat, index) => (
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