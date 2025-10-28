import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageSquare, X } from "lucide-react";
import Link from "next/link";

// This would typically come from props or API call based on ticket ID
const ticketData = {
    id: "1",
    ticketId: "#618292",
    submittedDate: "2026-09-01",
    submittedTime: "7:30 AM",
    issueCategory: [
        { name: "Chicken shawarma", quantity: 1 },
        { name: "Pizza", quantity: 1 }
    ],
    orderAmountRequested: "NGN 500",
    user: {
        name: "Adam tukur",
        phone: "+234 80377373",
        email: "adamtukur@gmail.com"
    },
    messageCount: 4,
    lastMessage: {
        text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        time: "8:00 PM",
        sender: "OP" // Original Poster
    }
};

export default function SupportDetailsPage() {
    return (
        <div className="flex min-h-screen bg-[#FFF2F2]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className=" bg-[#FFF2F2]  px-6 py-4">
                    <div className="flex items-center gap-4">
                        <Link href="/support">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <ArrowLeft className="h-4 w-4" />
                               
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Support Ticket Details</h1>
                    </div>
                </div>

                <div className="flex-1 p-6 space-y-6">
                    {/* Ticket Information Card */}
                    <Card className="bg-white">
                        <CardContent className="p-8">
                            {/* Support Title */}
                            <h2 className="text-2xl font-bold text-[#C72600] mb-8">
                                Support
                            </h2>

                            {/* Ticket Details */}
                            <div className="space-y-4">
                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-56">Ticket ID:</span>
                                    <span className="text-gray-900">{ticketData.ticketId}</span>
                                </div>

                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-56">Submitted date:</span>
                                    <div>
                                        <div className="text-gray-900">{ticketData.submittedDate}</div>
                                        <div className="text-gray-500 text-sm">{ticketData.submittedTime}</div>
                                    </div>
                                </div>

                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-56">Issue category:</span>
                                    <div className="space-y-2">
                                        {ticketData.issueCategory.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <span className="text-gray-900">{item.name}</span>
                                                <X className="h-4 w-4 text-gray-400" />
                                                <span className="text-gray-900">{item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-56">Order amount requested:</span>
                                    <span className="text-[#C72600] font-bold">{ticketData.orderAmountRequested}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* User Information */}
                    <Card className="bg-white">
                        <CardContent className="p-8">
                            <h3 className="text-xl font-bold text-[#C72600] mb-6">
                                User information
                            </h3>

                            <div className="space-y-4">
                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-32">User name:</span>
                                    <span className="text-gray-900">{ticketData.user.name}</span>
                                </div>

                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-32">Phone number:</span>
                                    <span className="text-gray-900">{ticketData.user.phone}</span>
                                </div>

                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-32">Email:</span>
                                    <span className="text-gray-900">{ticketData.user.email}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Messages Section */}
                    <Card className="bg-white">
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="relative">
                                    <Link href={`/support/${ticketData.id}/messages`}>
                                        <Button 
                                            className="bg-[#C2E66E] hover:bg-green-600 text-[#000000] font-[400] px-6 py-2 gap-2"
                                        >
                                            <MessageSquare className="h-4 w-4" />
                                            View user messages
                                        </Button>
                                    </Link>
                                    {/* Message count badge */}
                                    <div className="absolute -top-2 -left-2 bg-[#C72600] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                        {ticketData.messageCount}
                                    </div>
                                </div>
                            </div>

                            {/* Chat bubble */}
                            <div className="flex justify-end mb-4">
                                <div className="max-w-xs">
                                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-6 h-6 bg-[#C72600] rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                {ticketData.lastMessage.sender}
                                            </div>
                                        </div>
                                        <p className="text-gray-700 text-sm leading-relaxed">
                                            {ticketData.lastMessage.text}
                                        </p>
                                        <div className="text-gray-500 text-xs mt-2 text-right">
                                            {ticketData.lastMessage.time}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}