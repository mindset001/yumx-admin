import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoreHorizontal } from "lucide-react"

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

const activities: Activity[] = [
  {
    id: "1",
    user: {
      name: "Fatima Abubakar",
      role: "Chef",
      avatar: "/images/man.png",
      initials: "FA"
    },
    action: "1 minute",
    time: "1m ago",
    status: 'pending'
  },
  {
    id: "2",
    user: {
      name: "Fatima Abubakar",
      role: "Chef",
      avatar: "/images/man.png",
      initials: "FA"
    },
    action: "5 minutes",
    time: "5m ago",
    status: 'pending'
  },
  {
    id: "3",
    user: {
      name: "Fatima Abubakar",
      role: "Chef",
      avatar:  "/images/man.png",
      initials: "FA"
    },
    action: "10 minutes",
    time: "10m ago",
    status: 'pending'
  }
]

export function Activities() {
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