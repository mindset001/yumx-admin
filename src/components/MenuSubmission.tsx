import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal } from "lucide-react"

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

const submissions: MenuSubmission[] = [
  {
    id: "1",
    user: {
      name: "Fatima Abubakar",
      role: "Chef",
      avatar: "/avatars/fatima.jpg",
      initials: "FA"
    },
    dish: {
      name: "Delicious meal served",
      image: "/dishes/meal1.jpg"
    },
    time: "2m ago",
    status: 'pending'
  },
  {
    id: "2",
    user: {
      name: "Fatima Abubakar",
      role: "Chef",
      avatar: "/avatars/fatima.jpg",
      initials: "FA"
    },
    dish: {
      name: "Special pasta dish",
      image: "/dishes/meal2.jpg"
    },
    time: "5m ago",
    status: 'pending'
  },
  {
    id: "3",
    user: {
      name: "Fatima Abubakar",
      role: "Chef",
      avatar: "/avatars/fatima.jpg",
      initials: "FA"
    },
    dish: {
      name: "Grilled chicken special",
      image: "/dishes/meal3.jpg"
    },
    time: "8m ago",
    status: 'pending'
  }
]

export function MenuSubmission() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-medium">Menu submission</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {submissions.map((submission) => (
          <div key={submission.id} className="flex items-center justify-between">
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
            <div className="flex items-center space-x-2">
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