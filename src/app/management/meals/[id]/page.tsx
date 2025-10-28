import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// This would typically come from props or API call based on meal ID
const mealData = {
    id: "1",
    name: "Chicken shawarma",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit Proin ac efficitur purus, ac vestibulum orci. Nullam non urna id tortor pretium convallis. Quisque rhoncus nec libero quis facilisis. Sed dignissim augue vitae pharetra ultrices.",
    status: "Active", // Can be "Active", "Suspended"
    category: "Snacks",
    price: "NGN300",
    availabilityTime: "8:00am - 9:00pm"
};

export default function MealDetailsPage() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-white border-b px-6 py-4">
                    <div className="flex items-center gap-4">
                        <Link href="/management/meals">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Meals
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Meal Details</h1>
                    </div>
                </div>

                <div className="flex-1 p-6 space-y-6">
                    {/* Meal Information Card */}
                    <Card>
                        <CardContent className="p-8">
                            <div className="space-y-6">
                                {/* Meal Name and Status */}
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-[#C72600] mb-4">
                                            {mealData.name}
                                        </h2>
                                        <p className="text-gray-700 leading-relaxed mb-6 max-w-2xl">
                                            {mealData.description}
                                        </p>
                                    </div>
                                    <Badge className={`${
                                        mealData.status === 'Active' 
                                            ? 'bg-[#C2E66E] text-[#000] hover:bg-green-100'
                                            : 'bg-red-100 text-red-800 hover:bg-red-100'
                                    }`}>
                                        {mealData.status}
                                    </Badge>
                                </div>

                                {/* Meal Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Category:</label>
                                        <p className="text-gray-900 mt-1 font-medium">{mealData.category}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Price:</label>
                                        <p className="text-gray-900 mt-1 font-medium">{mealData.price}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Availability time:</label>
                                        <p className="text-gray-900 mt-1 font-medium">{mealData.availabilityTime}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-4">
                        {mealData.status === 'Active' ? (
                            <Button 
                                className="bg-[#C72600] hover:bg-red-700 text-white px-8 py-2"
                            >
                                Suspend meal
                            </Button>
                        ) : (
                            <Button 
                                className="bg-green-500 hover:bg-green-600 text-white px-8 py-2"
                            >
                                Activate meal
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}