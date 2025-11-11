import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";

// This would typically come from props or API call based on refund ID
const refundData = {
    id: "1",
    orderId: "#618292",
    dateAndTimeOfOrder: "2026-09-01",
    orderTime: "7:30 AM",
    itemsInvolved: [
        { name: "Chicken shawarma", quantity: 1 },
        { name: "Pizza", quantity: 1 }
    ],
    orderAmountRequested: "NGN 500",
    customer: {
        name: "Adam tukur",
        phone: "+234 80377373",
        email: "adamtukur@gmail.com"
    },
    chef: {
        name: "Adam tukur",
        phone: "+234 80377373",
        email: "adamtukur@gmail.com"
    }
};

export default function RefundDetailsPage() {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#FFF2F2]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-white border-b px-2 sm:px-4 md:px-6 py-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <div className="flex items-center gap-2">
                            <Link href="/finance/refunds">
                                <Button variant="ghost" size="sm" className="gap-2">
                                    <ArrowLeft className="h-4 w-4" />
                                   
                                </Button>
                            </Link>
                            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Refund Details</h1>
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-2 sm:p-4 md:p-6 space-y-6">
                    {/* Refund Information Card */}
                    <Card className="bg-white">
                        <CardContent className="p-4 sm:p-8">
                            {/* Refund Title */}
                            <h2 className="text-lg sm:text-2xl font-bold text-[#C72600] mb-4 sm:mb-8">
                                Refund detail view
                            </h2>

                            {/* Refund Details */}
                            <div className="space-y-2 sm:space-y-4">
                                <div className="flex flex-col sm:flex-row">
                                    <span className="text-gray-600 font-medium w-40 sm:w-56">Order ID:</span>
                                    <span className="text-gray-900">{refundData.orderId}</span>
                                </div>

                                <div className="flex flex-col sm:flex-row">
                                    <span className="text-gray-600 font-medium w-40 sm:w-56">Date and time of order:</span>
                                    <div>
                                        <div className="text-gray-900">{refundData.dateAndTimeOfOrder}</div>
                                        <div className="text-gray-500 text-xs sm:text-sm">{refundData.orderTime}</div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row">
                                    <span className="text-gray-600 font-medium w-40 sm:w-56">Items involved:</span>
                                    <div className="space-y-2">
                                        {refundData.itemsInvolved.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <span className="text-gray-900">{item.name}</span>
                                                <X className="h-4 w-4 text-gray-400" />
                                                <span className="text-gray-900">{item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row">
                                    <span className="text-gray-600 font-medium w-40 sm:w-56">Order amount requested:</span>
                                    <span className="text-[#C72600] font-bold">{refundData.orderAmountRequested}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Customer Information */}
                    <Card className="bg-white">
                        <CardContent className="p-4 sm:p-8">
                            <h3 className="text-base sm:text-xl font-bold text-[#C72600] mb-4 sm:mb-6">
                                Customer information
                            </h3>

                            <div className="space-y-2 sm:space-y-4">
                                <div className="flex flex-col sm:flex-row">
                                    <span className="text-gray-600 font-medium w-28 sm:w-32">Customer name:</span>
                                    <span className="text-gray-900">{refundData.customer.name}</span>
                                </div>

                                <div className="flex flex-col sm:flex-row">
                                    <span className="text-gray-600 font-medium w-28 sm:w-32">Phone number:</span>
                                    <span className="text-gray-900">{refundData.customer.phone}</span>
                                </div>

                                <div className="flex flex-col sm:flex-row">
                                    <span className="text-gray-600 font-medium w-28 sm:w-32">Email:</span>
                                    <span className="text-gray-900">{refundData.customer.email}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Chef Information */}
                    <Card className="bg-white">
                        <CardContent className="p-4 sm:p-8">
                            <h3 className="text-base sm:text-xl font-bold text-[#C72600] mb-4 sm:mb-6">
                                Chef information
                            </h3>

                            <div className="space-y-2 sm:space-y-4">
                                <div className="flex flex-col sm:flex-row">
                                    <span className="text-gray-600 font-medium w-28 sm:w-32">Customer name:</span>
                                    <span className="text-gray-900">{refundData.chef.name}</span>
                                </div>

                                <div className="flex flex-col sm:flex-row">
                                    <span className="text-gray-600 font-medium w-28 sm:w-32">Phone number:</span>
                                    <span className="text-gray-900">{refundData.chef.phone}</span>
                                </div>

                                <div className="flex flex-col sm:flex-row">
                                    <span className="text-gray-600 font-medium w-28 sm:w-32">Email:</span>
                                    <span className="text-gray-900">{refundData.chef.email}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
                        <Button 
                            className="bg-[#C2E66E] hover:bg-green-600 text-[#000000] font-[400] px-6 sm:px-8 py-2"
                        >
                            Approve Refund
                        </Button>
                        <Button 
                            className="bg-[#C72600] hover:bg-red-700 text-white px-6 sm:px-8 py-2"
                        >
                            Deny Refund
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}