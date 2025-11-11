import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// This would typically come from props or API call based on chef ID
const chefData = {
    id: "2",
    restaurantName: "Delicious Bites Restaurant",
    email: "johndoe@gmail.com",
    phone: "(201) 555-0456",
    location: "Los Angeles, USA",
    status: "Approved", // Can be "Approved", "Pending", "Suspended"
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac efficitur purus, ac vestibulum orci. Nullam non urna id tortor pretium convallis. Quisque rhoncus nec libero quis facilisis. Sed dignissim augue vitae pharetra ultrices. Donec quis ex vel libero lacinia fringilla. Integer consequat vulputate purus at hendrerit. Cras consectetur sapien at tristique molestie.",
    documents: [
        {
            id: "1",
            type: "National identity number",
            status: "Verified",
            image: "/docs/doc1.jpg"
        },
        {
            id: "2",
            type: "Business License",
            status: "Verified",
            image: "/docs/doc2.jpg"
        },
        {
            id: "3",
            type: "Food Safety Certificate",
            status: "Verified",
            image: "/docs/doc3.jpg"
        }
    ]
};

export default function ChefDetailsPage() {
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
                            <Link href="/management/chefs">
                                <Button variant="ghost" size="sm" className="gap-2">
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Chefs
                                </Button>
                            </Link>
                            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Chef Details</h1>
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-2 sm:p-4 md:p-6 space-y-6">
                    {/* Chef Information Card */}
                    <Card>
                        <CardContent className="p-2 sm:p-6">
                            <div className="flex flex-col md:flex-row items-start justify-between mb-6 gap-4">
                                <div>
                                    <h2 className="text-base sm:text-xl font-bold text-gray-900 mb-2">
                                        {chefData.restaurantName}
                                    </h2>
                                    <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                                        <p>{chefData.email}</p>
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <div>
                                                <p>{chefData.phone}</p>
                                                <p>{chefData.location}</p>
                                            </div>
                                            <Badge className={`${chefData.status === 'Approved'
                                                    ? 'bg-[#C2E66E] text-[#000] hover:bg-green-100'
                                                    : chefData.status === 'Pending'
                                                        ? 'bg-[#FFE6B5] text-[#000] hover:bg-yellow-100'
                                                        : 'bg-red-100 text-red-800 hover:bg-red-100'
                                                }`}>
                                                {chefData.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="text-gray-700 leading-relaxed text-xs sm:text-base">
                                    {chefData.description}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Documents & Certification */}
                    <Card>
                        <CardContent className="p-2 sm:p-6">
                            <h3 className="text-base sm:text-lg font-semibold text-[#C72600] mb-4 sm:mb-6">
                                Documents & Certification
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                                {chefData.documents.map((doc) => (
                                    <div key={doc.id} className="text-center">
                                        <h4 className="font-medium text-gray-900 mb-2 text-xs sm:text-base">
                                            {doc.type}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-gray-600 mb-3">
                                            {doc.status}
                                        </p>

                                        {/* Document Image Placeholder */}
                                        <div className="w-full h-24 sm:h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-lg flex items-center justify-center">
                                                <span className="text-gray-500 text-xs">Document</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
                        {chefData.status === 'Pending' ? (
                            <>
                                <Button
                                    className="bg-[#C2E66E] hover:bg-green-600 text-[#000000] font-[400] px-6 sm:px-8 py-2"
                                >
                                    Approve account
                                </Button>
                                <Button
                                    className="bg-[#C72600] hover:bg-red-700 text-white px-6 sm:px-8 py-2"
                                >
                                    Reject account
                                </Button>
                            </>
                        ) : chefData.status === 'Approved' ? (
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