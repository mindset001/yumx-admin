import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// This would typically come from props or API call based on customer ID
const customerData = {
    id: "1",
    name: "Adam tukur",
    dateJoined: "Last 7 days",
    orderVolume: "45", // Number of orders
    status: "Active", // Can be "Active", "Suspended"
    reported: "No",
    email: "Adam.tukur@gmail.com",
    phoneNumber: "+234 9037479"
};

export default function CustomerDetailsPage() {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-white border-b px-2 sm:px-4 md:px-6 py-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <div className="flex items-center gap-2">
                            <Link href="/management/customers">
                                <Button variant="ghost" size="sm" className="gap-2">
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Customers
                                </Button>
                            </Link>
                            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Customer Details</h1>
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-2 sm:p-4 md:p-6 space-y-6">
                    {/* Customer Information Card */}
                    <Card>
                        <CardContent className="p-4 sm:p-8">
                            <div className="space-y-4 sm:space-y-6">
                                {/* Customer Name */}
                                <div>
                                    <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                                        {customerData.name}
                                    </h2>
                                </div>

                                {/* Customer Details Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    {/* Left Column */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs sm:text-sm font-medium text-gray-600">Date joined:</label>
                                            <p className="text-gray-900 mt-1">{customerData.dateJoined}</p>
                                        </div>

                                        <div>
                                            <label className="text-xs sm:text-sm font-medium text-gray-600">Order Volume:</label>
                                            <p className="text-gray-900 mt-1">{customerData.orderVolume}</p>
                                        </div>

                                        <div>
                                            <label className="text-xs sm:text-sm font-medium text-gray-600">Status:</label>
                                            <div className="mt-1">
                                                <Badge className={`${
                                                    customerData.status === 'Active' 
                                                        ? 'bg-[#C2E66E] text-[#000] hover:bg-green-100'
                                                        : 'bg-red-100 text-red-800 hover:bg-red-100'
                                                }`}>
                                                    {customerData.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs sm:text-sm font-medium text-gray-600">Reported:</label>
                                            <p className="text-gray-900 mt-1">{customerData.reported}</p>
                                        </div>

                                        <div>
                                            <label className="text-xs sm:text-sm font-medium text-gray-600">Email:</label>
                                            <p className="text-gray-900 mt-1">{customerData.email}</p>
                                        </div>

                                        <div>
                                            <label className="text-xs sm:text-sm font-medium text-gray-600">Phone number:</label>
                                            <p className="text-gray-900 mt-1">{customerData.phoneNumber}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
                        {customerData.status === 'Active' ? (
                            <Button 
                                className="bg-[#C72600] hover:bg-red-700 text-white px-6 sm:px-8 py-2"
                            >
                                Suspend account
                            </Button>
                        ) : (
                            <Button 
                                className="bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-2"
                            >
                                Activate account
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}