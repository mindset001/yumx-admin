import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// This would typically come from props or API call based on transaction ID
const transactionData = {
    id: "1",
    title: "Shawarma transaction",
    orderId: "#186320",
    timeOfTransaction: "7:30 AM",
    transactionStatus: "Successful",
    paymentStatus: "Paid",
    paymentMethod: "Transfer",
    amount: "NGN 500",
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

export default function TransactionDetailsPage() {
    return (
        <div className="flex min-h-screen bg-[#FFF2F2]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-white border-b px-6 py-4">
                    <div className="flex items-center gap-4">
                        <Link href="/finance/transactions">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Transactions
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Transaction Details</h1>
                    </div>
                </div>

                <div className="flex-1 p-6 space-y-6">
                    {/* Transaction Information Card */}
                    <Card className="bg-white">
                        <CardContent className="p-8">
                            {/* Transaction Title */}
                            <h2 className="text-2xl font-bold text-[#C72600] mb-8">
                                {transactionData.title}
                            </h2>

                            {/* Transaction Details Grid */}
                            <div className="space-y-4">
                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-48">Order ID:</span>
                                    <span className="text-gray-900">{transactionData.orderId}</span>
                                </div>

                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-48">Time of transaction:</span>
                                    <span className="text-gray-900">{transactionData.timeOfTransaction}</span>
                                </div>

                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-48">Transaction status:</span>
                                    <Badge className="bg-[#C2E66E] text-[#000] hover:bg-green-100">
                                        {transactionData.transactionStatus}
                                    </Badge>
                                </div>

                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-48">Payment status :</span>
                                    <span className="text-gray-900">{transactionData.paymentStatus}</span>
                                </div>

                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-48">Payment method:</span>
                                    <span className="text-gray-900">{transactionData.paymentMethod}</span>
                                </div>

                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-48">Amount</span>
                                    <span className="text-[#C72600] font-bold">{transactionData.amount}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Customer Information */}
                    <Card className="bg-white">
                        <CardContent className="p-8">
                            <h3 className="text-xl font-bold text-[#C72600] mb-6">
                                Customer information
                            </h3>

                            <div className="space-y-4">
                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-32">Customer name:</span>
                                    <span className="text-gray-900">{transactionData.customer.name}</span>
                                </div>

                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-32">Phone number:</span>
                                    <span className="text-gray-900">{transactionData.customer.phone}</span>
                                </div>

                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-32">Email:</span>
                                    <span className="text-gray-900">{transactionData.customer.email}</span>
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
                                    <span className="text-gray-900">{transactionData.chef.name}</span>
                                </div>

                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-32">Phone number:</span>
                                    <span className="text-gray-900">{transactionData.chef.phone}</span>
                                </div>

                                <div className="flex">
                                    <span className="text-gray-600 font-medium w-32">Email:</span>
                                    <span className="text-gray-900">{transactionData.chef.email}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}