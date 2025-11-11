import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";

// This would typically come from props or API call based on order ID
const orderData = {
    id: "1",
    title: "Chicken shawarma",
    orderId: "#618502",
    timeOfOrder: "7:30 AM",
    orderStatus: "On transit",
    paymentStatus: "Paid",
    itemsOrdered: [
        { name: "Chicken shawarma", quantity: 1, price: "NGN 500" },
        { name: "Pizza", quantity: 1, price: "NGN 500" }
    ],
    totalPrice: "NGN 1000",
    customer: {
        name: "Adam tukur",
        phone: "+234 8037779",
        email: "adamtukur@gmail.com"
    },
    chef: {
        name: "Adam tukur",
        phone: "+234 8037779",
        email: "adamtukur@gmail.com"
    }
};

export default function OrderDetailsPage() {
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
                            <Link href="/management/orders">
                                <Button variant="ghost" size="sm" className="gap-2">
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Orders
                                </Button>
                            </Link>
                            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Order Details</h1>
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-2 sm:p-4 md:p-6 space-y-6">
                    {/* Order Information Card */}
                    <Card className="bg-white">
                        <CardContent className="p-4 sm:p-8">
                            {/* Order Title */}
                            <h2 className="text-lg sm:text-2xl font-bold text-[#C72600] mb-4 sm:mb-8">
                                {orderData.title}
                            </h2>

                            {/* Order Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-4 mb-4 sm:mb-8">
                                <div className="flex flex-col sm:flex-row">
                                    <span className="text-gray-600 font-medium w-28 sm:w-32">Order ID:</span>
                                    <span className="text-gray-900">{orderData.orderId}</span>
                                </div>

                                <div className="flex flex-col sm:flex-row">
                                    <span className="text-gray-600 font-medium w-28 sm:w-32">Time of order:</span>
                                    <span className="text-gray-900">{orderData.timeOfOrder}</span>
                                </div>

                                <div className="flex flex-col sm:flex-row items-start sm:items-center">
                                    <span className="text-gray-600 font-medium w-28 sm:w-32">Order status:</span>
                                    <Badge className="bg-[#C2E66E] text-[#000] hover:bg-green-100 mt-1 sm:mt-0">
                                        {orderData.orderStatus}
                                    </Badge>
                                </div>

                                <div className="flex flex-col sm:flex-row">
                                    <span className="text-gray-600 font-medium w-28 sm:w-32">Payment status:</span>
                                    <span className="text-gray-900">{orderData.paymentStatus}</span>
                                </div>

                                <div className="col-span-1 sm:col-span-2">
                                    <span className="text-gray-600 font-medium">Items ordered:</span>
                                    <div className="mt-2 space-y-2">
                                        {orderData.itemsOrdered.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <span className="text-gray-900">{item.name}</span>
                                                <X className="h-4 w-4 text-gray-400" />
                                                <span className="text-gray-900">{item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row">
                                    <span className="text-gray-600 font-medium w-28 sm:w-32">Total price:</span>
                                    <div>
                                        {orderData.itemsOrdered.map((item, index) => (
                                            <div key={index} className="text-gray-900">
                                                {item.name}
                                            </div>
                                        ))}
                                        <div className="space-y-1 mt-2">
                                            {orderData.itemsOrdered.map((item, index) => (
                                                <div key={index} className="text-[#C72600] font-medium">
                                                    {item.price}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
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
                                    <span className="text-gray-900">{orderData.customer.name}</span>
                                </div>

                                <div className="flex flex-col sm:flex-row">
                                    <span className="text-gray-600 font-medium w-28 sm:w-32">Phone number:</span>
                                    <span className="text-gray-900">{orderData.customer.phone}</span>
                                </div>

                                <div className="flex flex-col sm:flex-row">
                                    <span className="text-gray-600 font-medium w-28 sm:w-32">Email:</span>
                                    <span className="text-gray-900">{orderData.customer.email}</span>
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
                                    <span className="text-gray-900">{orderData.chef.name}</span>
                                </div>

                                <div className="flex flex-col sm:flex-row">
                                    <span className="text-gray-600 font-medium w-28 sm:w-32">Phone number:</span>
                                    <span className="text-gray-900">{orderData.chef.phone}</span>
                                </div>

                                <div className="flex flex-col sm:flex-row">
                                    <span className="text-gray-600 font-medium w-28 sm:w-32">Email:</span>
                                    <span className="text-gray-900">{orderData.chef.email}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}