import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import Link from "next/link";

interface Payout {
  id: string;
  payoutTime: string;
  time: string;
  status: 'Successful' | 'Pending';
  payoutId: string;
  chefName: string;
  requestDate: string;
  requestTime: string;
  amount: string;
  paymentMethod: string;
}

const payouts: Payout[] = [
  {
    id: "1",
    payoutTime: "2026-09-01",
    time: "7:30 AM",
    status: "Successful",
    payoutId: "#618292",
    chefName: "Adam tukur",
    requestDate: "2026-09-01",
    requestTime: "7:30 AM",
    amount: "NGN500",
    paymentMethod: "Transfer"
  },
  {
    id: "2",
    payoutTime: "2026-09-01",
    time: "7:30 AM",
    status: "Pending",
    payoutId: "#484949",
    chefName: "Adam tukur",
    requestDate: "2026-09-01",
    requestTime: "7:30 AM",
    amount: "NGN500",
    paymentMethod: "Transfer"
  },
  {
    id: "3",
    payoutTime: "2026-09-01",
    time: "7:30 AM",
    status: "Successful",
    payoutId: "#484949",
    chefName: "Adam tukur",
    requestDate: "2026-09-01",
    requestTime: "7:30 AM",
    amount: "NGN500",
    paymentMethod: "Transfer"
  },
  {
    id: "4",
    payoutTime: "2026-09-01",
    time: "7:30 AM",
    status: "Successful",
    payoutId: "#484949",
    chefName: "Adam tukur",
    requestDate: "2026-09-01",
    requestTime: "7:30 AM",
    amount: "NGN500",
    paymentMethod: "Transfer"
  },
  {
    id: "5",
    payoutTime: "2026-09-01",
    time: "7:30 AM",
    status: "Successful",
    payoutId: "#484949",
    chefName: "Adam tukur",
    requestDate: "2026-09-01",
    requestTime: "7:30 AM",
    amount: "NGN500",
    paymentMethod: "Transfer"
  },
  {
    id: "6",
    payoutTime: "2026-09-01",
    time: "7:30 AM",
    status: "Pending",
    payoutId: "#484949",
    chefName: "Adam tukur",
    requestDate: "2026-09-01",
    requestTime: "7:30 AM",
    amount: "NGN500",
    paymentMethod: "Transfer"
  },
  {
    id: "7",
    payoutTime: "2026-09-01",
    time: "7:30 AM",
    status: "Successful",
    payoutId: "#484949",
    chefName: "Adam tukur",
    requestDate: "2026-09-01",
    requestTime: "7:30 AM",
    amount: "NGN500",
    paymentMethod: "Transfer"
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

export default function PayoutsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Payouts record</h1>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map((stat, index) => (
              <Card 
                key={index}
                className={`${
                  stat.variant === 'primary' 
                    ? 'bg-[#C72600] text-white border-0' 
                    : 'bg-white border border-gray-200'
                } transition-all duration-300 hover:shadow-lg`}
              >
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className={`text-sm font-medium ${
                      stat.variant === 'primary' 
                        ? 'text-red-100' 
                        : 'text-[#C72600]'
                    }`}>
                      {stat.title}
                    </p>
                    <p className={`text-3xl font-bold ${
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

          {/* Payouts Table */}
          <Card>
            <CardContent className="p-0">
              {/* Table Header */}
              <div className="bg-[#C72600] text-white px-6 py-4">
                <div className="grid grid-cols-8 gap-4 text-sm font-medium">
                  <div>Payout time</div>
                  <div>Status</div>
                  <div>Payout ID</div>
                  <div>Chef name</div>
                  <div>Request date</div>
                  <div>Amount</div>
                  <div>Payment method</div>
                  <div></div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {payouts.map((payout) => (
                  <div key={payout.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="grid grid-cols-8 gap-4 items-center">
                      {/* Payout Time */}
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{payout.payoutTime}</div>
                        <div className="text-gray-500">{payout.time}</div>
                      </div>

                      {/* Status */}
                      <div>
                        <Badge 
                          className={`${
                            payout.status === 'Successful' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                              : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                          }`}
                        >
                          {payout.status}
                        </Badge>
                      </div>

                      {/* Payout ID */}
                      <div className="text-sm font-medium text-gray-900">
                        {payout.payoutId}
                      </div>

                      {/* Chef Name */}
                      <div className="text-sm text-gray-500">
                        {payout.chefName}
                      </div>

                      {/* Request Date */}
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{payout.requestDate}</div>
                        <div className="text-gray-500">{payout.requestTime}</div>
                      </div>

                      {/* Amount */}
                      <div className="text-sm font-medium text-gray-900">
                        {payout.amount}
                      </div>

                      {/* Payment Method */}
                      <div className="text-sm text-gray-500">
                        {payout.paymentMethod}
                      </div>

                      {/* Action */}
                      <div className="text-right">
                        <Link href={`/finance/payouts/${payout.id}`}>
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