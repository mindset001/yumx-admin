import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import Link from "next/link";

interface Refund {
  id: string;
  dateRequested: string;
  time: string;
  status: 'Successful' | 'Pending';
  refundId: string;
  chefName: string;
  amount: string;
  reason: string;
}

const refunds: Refund[] = [
  {
    id: "1",
    dateRequested: "2028-09-01",
    time: "7:30 AM",
    status: "Successful",
    refundId: "#618292",
    chefName: "Adam tukur",
    amount: "NGN500",
    reason: "Unsuccessful"
  },
  {
    id: "2",
    dateRequested: "2028-09-01",
    time: "7:30 AM",
    status: "Pending",
    refundId: "#484949",
    chefName: "Adam tukur",
    amount: "NGN500",
    reason: "Unsuccessful"
  },
  {
    id: "3",
    dateRequested: "2028-09-01",
    time: "7:30 AM",
    status: "Successful",
    refundId: "#484949",
    chefName: "Adam tukur",
    amount: "NGN500",
    reason: "Unsuccessful"
  },
  {
    id: "4",
    dateRequested: "2028-09-01",
    time: "7:30 AM",
    status: "Successful",
    refundId: "#484949",
    chefName: "Adam tukur",
    amount: "NGN500",
    reason: "Unsuccessful"
  },
  {
    id: "5",
    dateRequested: "2028-09-01",
    time: "7:30 AM",
    status: "Successful",
    refundId: "#484949",
    chefName: "Adam tukur",
    amount: "NGN500",
    reason: "Unsuccessful"
  },
  {
    id: "6",
    dateRequested: "2028-09-01",
    time: "7:30 AM",
    status: "Pending",
    refundId: "#484949",
    chefName: "Adam tukur",
    amount: "NGN500",
    reason: "Unsuccessful"
  },
  {
    id: "7",
    dateRequested: "2028-09-01",
    time: "7:30 AM",
    status: "Successful",
    refundId: "#484949",
    chefName: "Adam tukur",
    amount: "NGN500",
    reason: "Unsuccessful"
  }
];

const statsCards = [
  {
    title: "Total Payouts",
    value: "25",
    variant: 'primary' as const
  },
  {
    title: "Total chefs with payouts",
    value: "25",
    variant: 'secondary' as const
  },
  {
    title: "Completed payouts",
    value: "25",
    variant: 'secondary' as const
  },
  {
    title: "Failed payouts",
    value: "25",
    variant: 'primary' as const
  }
];

export default function RefundsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Refunds record</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search menu"
                className="pl-10 w-80"
              />
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-36 gap-y-8 bg-white py-8 px-12 rounded-lg ">
                     {statsCards.map((stat, index) => (
                       <Card 
                         key={index}
                         className={`${
                           stat.variant === 'primary' 
                             ? 'bg-[#C72600] text-white border-0' 
                             : 'bg-[#FFF2F2] border border-gray-200'
                         } transition-all duration-300 hover:shadow-lg`}
                       >
                         <CardContent className="">
                           <div className="space-y-2 flex items-center justify-between h-[20px]">
                             <p className={`text-sm font-medium ${
                               stat.variant === 'primary' 
                                 ? 'text-red-100' 
                                 : 'text-[#C72600]'
                             }`}>
                               {stat.title}
                             </p>
                             <p className={`text-2xl font-bold ${
                               stat.variant === 'primary' 
                                 ? 'text-white' 
                                 : 'text-[#C72600]'
                             }`}>
                               {stat.value}
                             </p>
                           </div>
                         </CardContent>
                       </Card>
                     ))}
                   </div>

          {/* Refunds Table */}
          <Card>
            <CardContent className="p-0">
              {/* Table Header */}
              <div className="bg-[#C72600] text-white px-6 py-4">
                <div className="grid grid-cols-7 gap-4 text-sm font-medium">
                  <div>Date requested</div>
                  <div>Status</div>
                  <div>Refund ID</div>
                  <div>Chef name</div>
                  <div>Amount</div>
                  <div>Reason</div>
                  <div></div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {refunds.map((refund) => (
                  <div key={refund.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="grid grid-cols-7 gap-4 items-center">
                      {/* Date Requested */}
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{refund.dateRequested}</div>
                        <div className="text-gray-500">{refund.time}</div>
                      </div>

                      {/* Status */}
                      <div>
                        <Badge 
                          className={`${
                            refund.status === 'Successful' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                              : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                          }`}
                        >
                          {refund.status}
                        </Badge>
                      </div>

                      {/* Refund ID */}
                      <div className="text-sm font-medium text-gray-900">
                        {refund.refundId}
                      </div>

                      {/* Chef Name */}
                      <div className="text-sm text-gray-500">
                        {refund.chefName}
                      </div>

                      {/* Amount */}
                      <div className="text-sm font-medium text-gray-900">
                        {refund.amount}
                      </div>

                      {/* Reason */}
                      <div className="text-sm text-gray-500">
                        {refund.reason}
                      </div>

                      {/* Action */}
                      <div className="text-right">
                        <Link href={`/finance/refunds/${refund.id}`}>
                          <Button 
                            size="sm" 
                            className="bg-[#C72600] hover:bg-red-700 text-white"
                          >
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}