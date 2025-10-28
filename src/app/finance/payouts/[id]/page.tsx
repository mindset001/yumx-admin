import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";

// This would typically come from props or API call based on payout ID
const payoutData = {
    id: "1",
    payoutId: "#618292",
    requestedDate: "2026-09-01",
    requestedTime: "7:30 AM",
    payoutDate: "2026-09-01",
    payoutTime: "7:30 AM",
    payoutStatus: "Successful",
    paymentStatus: "Paid",
    paymentMethod: "Transfer",
    amount: "NGN 500",
    itemsOrdered: [
        { name: "Chicken shawarma", quantity: 1 },
        { name: "Pizza", quantity: 1 }
    ],
    chef: {
        name: "Adam tukur",
        phone: "+234 80377373",
        email: "adamtukur@gmail.com"
    }
};

export default function PayoutDetailsPage() {
    return (
        <div className="flex min-h-screen bg-[#FFF2F2]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-white border-b px-6 py-4">
                    <div className="flex items-center gap-4">
                        <Link href="/finance/payouts">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Payouts
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Payout Details</h1>
                    </div>
                </div>

                <div className="flex-1 p-6 space-y-6">
                    {/* Payout Information Card */}
                    <Card className="bg-white">
                        <CardContent className="p-8">
                            {/* Payout Title */}
                            <h2 className="text-2xl font-bold text-[#C72600] mb-8">
                                Payout detail view
                            </h2>

                            {/* Payout Details Grid */}
                            <div className="space-y-4">
                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-48">Payout ID:</span>
                                    <span className="text-gray-900">{payoutData.payoutId}</span>
                                </div>

                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-48">Requested date:</span>
                                    <div>
                                        <div className="text-gray-900">{payoutData.requestedDate}</div>
                                        <div className="text-gray-500 text-sm">{payoutData.requestedTime}</div>
                                    </div>
                                </div>

                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-48">Payout date:</span>
                                    <div>
                                        <div className="text-gray-900">{payoutData.payoutDate}</div>
                                        <div className="text-gray-500 text-sm">{payoutData.payoutTime}</div>
                                    </div>
                                </div>

                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-48">Payout status:</span>
                                    <Badge className="bg-[#C2E66E] text-[#000] hover:bg-green-100">
                                        {payoutData.payoutStatus}
                                    </Badge>
                                </div>

                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-48">Payment status :</span>
                                    <span className="text-gray-900">{payoutData.paymentStatus}</span>
                                </div>

                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-48">Payment method:</span>
                                    <span className="text-gray-900">{payoutData.paymentMethod}</span>
                                </div>

                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-48">Amount</span>
                                    <span className="text-[#C72600] font-bold">{payoutData.amount}</span>
                                </div>

                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-48">Items ordered:</span>
                                    <div className="space-y-2">
                                        {payoutData.itemsOrdered.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <span className="text-gray-900">{item.name}</span>
                                                <X className="h-4 w-4 text-gray-400" />
                                                <span className="text-gray-900">{item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Chef Information */}
                    <Card className="bg-white">
                        <CardContent className="p-8">
                            <h3 className="text-xl font-bold text-[#C72600] mb-6">
                                Chef information
                            </h3>

                            <div className="space-y-4">
                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-32">Customer name:</span>
                                    <span className="text-gray-900">{payoutData.chef.name}</span>
                                </div>

                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-32">Phone number:</span>
                                    <span className="text-gray-900">{payoutData.chef.phone}</span>
                                </div>

                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-32">Email:</span>
                                    <span className="text-gray-900">{payoutData.chef.email}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-4">
                        <Button 
                            className="bg-[#C2E66E] hover:bg-green-600 text-[#000000] font-[400] px-8 py-2"
                        >
                            Approve payout
                        </Button>
                        <Button 
                            className="bg-[#C72600] hover:bg-red-700 text-white px-8 py-2"
                        >
                            Reject payout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}