import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Phone, Video, Bell, Send, Paperclip, Check, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// This would typically come from props or API call based on ticket ID
const chatData = {
    user: {
        name: "Suporte ADMIN",
        id: "#C1679B4",
        avatar: "/avatar-placeholder.jpg"
    },
    messages: [
        {
            id: 1,
            sender: "OP",
            text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
            time: "8:00 PM",
            isUser: true
        },
        {
            id: 2,
            sender: "Admin",
            text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
            time: "8:00 PM",
            isUser: false
        },
        {
            id: 3,
            sender: "OP",
            text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
            time: "8:00 PM",
            isUser: true
        },
        {
            id: 4,
            sender: "Admin",
            text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
            time: "8:00 PM",
            isUser: false
        }
    ]
};

export default function ChatMessagesPage() {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#FFF2F2]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col py-2 sm:py-4 px-2 sm:px-4 md:px-6">
                {/* Header */}
                <div className="px-2 sm:px-6 py-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                        <div className="flex items-center gap-2 sm:gap-4">
                            <Link href="/support/1">
                                <Button variant="ghost" size="sm" className="gap-2">
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <h1 className="text-lg sm:text-2xl font-bold text-[#C72600]">Support</h1>
                        </div>
                        <div className="relative bg-white rounded-md mt-2 sm:mt-0 w-full sm:w-auto">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search menu"
                                className="pl-10 w-full sm:w-80"
                            />
                        </div>
                    </div>
                </div>

                {/* Chat Interface */}
                <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md overflow-hidden mt-2 sm:mt-4">
                    {/* Chat Header */}
                    <div className="border-b px-2 sm:px-6 py-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                            <div className="flex items-center gap-2 sm:gap-3">
                                {/* User Avatar */}
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                    <span className="text-gray-600 text-sm">👤</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{chatData.user.name}</h3>
                                    <p className="text-xs sm:text-sm text-gray-500">{chatData.user.id}</p>
                                </div>
                            </div>
                            {/* Action Icons */}
                            <div className="flex items-center gap-2 sm:gap-4">
                                <Button variant="ghost" size="sm" className="text-[#C72600] hover:bg-red-50">
                                    <Phone className="h-5 w-5" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-[#C72600] hover:bg-red-50">
                                    <Video className="h-5 w-5" />
                                </Button>
                                <div className="relative">
                                    <Button variant="ghost" size="sm" className="text-[#C72600] hover:bg-red-50">
                                        <Bell className="h-5 w-5" />
                                    </Button>
                                    {/* Notification badge */}
                                    <div className="absolute -top-1 -right-1 bg-[#C72600] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                        1
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-2 sm:p-6 space-y-2 sm:space-y-4">
                        {chatData.messages.map((message) => (
                            <div key={message.id} className={`flex ${message.isUser ? 'justify-start' : 'justify-end'}`}>
                                <div className={`max-w-[90vw] sm:max-w-xs lg:max-w-md ${message.isUser ? 'order-2' : 'order-1'}`}>
                                    {message.isUser && (
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-6 h-6 bg-[#C72600] rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                {message.sender}
                                            </div>
                                        </div>
                                    )}
                                    <div className={`rounded-lg px-3 sm:px-4 py-2 sm:py-3 ${
                                        message.isUser 
                                            ? 'bg-white border border-gray-200' 
                                            : 'bg-[#C72600] text-white'
                                    }`}>
                                        <p className="text-sm leading-relaxed">
                                            {message.text}
                                        </p>
                                        <div className={`text-xs mt-2 ${
                                            message.isUser ? 'text-gray-500' : 'text-red-100'
                                        }`}>
                                            {message.time}
                                        </div>
                                    </div>
                                    {!message.isUser && (
                                        <div className="flex items-center justify-end gap-2 mt-1">
                                            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                                                <span className="text-gray-600 text-xs">👤</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Message Input Area */}
                    <div className="p-2 sm:p-4">
                        <div className="flex flex-col gap-2 sm:gap-3">
                            <div className="flex items-center gap-1 sm:gap-2">
                                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                                    <MoreHorizontal className="h-5 w-5" />
                                </Button>
                                <div className="flex items-center px-1 sm:px-2">
                                    <div className="w-6 h-6 bg-[#C72600] rounded-full flex items-center justify-center text-white text-xs font-bold">
                                        OP
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 relative mt-1">
                                <Input
                                    placeholder="Type a message..."
                                    className="pr-20 sm:pr-24 rounded-full border-gray-300"
                                />
                                {/* Input Actions */}
                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1 sm:gap-2">
                                    <Button variant="ghost" size="sm" className="text-[#C72600] hover:bg-red-50 h-8 w-8 p-0 rounded-full">
                                        <Send className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 h-8 w-8 p-0 rounded-full">
                                        <Paperclip className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-green-500 hover:text-green-600 h-8 w-8 p-0 rounded-full">
                                        <Check className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}