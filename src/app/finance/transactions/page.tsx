import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import Link from "next/link";

interface Transaction {
  id: string;
  transactionTime: string;
  time: string;
  status: 'Successful' | 'Pending';
  transactionId: string;
  from: string;
  to: string;
  amount: string;
  paymentMethod: string;
}

const transactions: Transaction[] = [
  {
    id: "1",
    transactionTime: "2028-09-01",
    time: "7:30 AM",
    status: "Successful",
    transactionId: "#186320",
    from: "Adam tukur",
    to: "Adam tukur",
    amount: "NGN500",
    paymentMethod: "Transfer"
  },
  {
    id: "2",
    transactionTime: "2028-09-01",
    time: "7:30 AM",
    status: "Pending",
    transactionId: "#484949",
    from: "Adam tukur",
    to: "Adam tukur",
    amount: "NGN500",
    paymentMethod: "Transfer"
  },
  {
    id: "3",
    transactionTime: "2028-09-01",
    time: "7:30 AM",
    status: "Successful",
    transactionId: "#484949",
    from: "Adam tukur",
    to: "Adam tukur",
    amount: "NGN500",
    paymentMethod: "Transfer"
  },
  {
    id: "4",
    transactionTime: "2028-09-01",
    time: "7:30 AM",
    status: "Successful",
    transactionId: "#484949",
    from: "Adam tukur",
    to: "Adam tukur",
    amount: "NGN500",
    paymentMethod: "Transfer"
  },
  {
    id: "5",
    transactionTime: "2028-09-01",
    time: "7:30 AM",
    status: "Successful",
    transactionId: "#484949",
    from: "Adam tukur",
    to: "Adam tukur",
    amount: "NGN500",
    paymentMethod: "Transfer"
  },
  {
    id: "6",
    transactionTime: "2028-09-01",
    time: "7:30 AM",
    status: "Pending",
    transactionId: "#484949",
    from: "Adam tukur",
    to: "Adam tukur",
    amount: "NGN500",
    paymentMethod: "Transfer"
  },
  {
    id: "7",
    transactionTime: "2028-09-01",
    time: "7:30 AM",
    status: "Successful",
    transactionId: "#484949",
    from: "Adam tukur",
    to: "Adam tukur",
    amount: "NGN500",
    paymentMethod: "Transfer"
  }
];

const statsCards = [
  {
    title: "Total transactions",
    value: "25",
    variant: 'primary' as const
  },
  {
    title: "Completed transactions",
    value: "25",
    variant: 'secondary' as const
  },
  {
    title: "Uncompleted transactions",
    value: "25",
    variant: 'secondary' as const
  },
  {
    title: "Failed transactions",
    value: "25",
    variant: 'primary' as const
  }
];

export default function TransactionsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Transactions record</h1>
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

          {/* Transactions Table */}
          <Card>
            <CardContent className="p-0">
              {/* Table Header */}
              <div className="bg-[#C72600] text-white px-6 py-4">
                <div className="grid grid-cols-8 gap-4 text-sm font-medium">
                  <div>Transaction time</div>
                  <div>Status</div>
                  <div>Transaction ID</div>
                  <div>From</div>
                  <div>To</div>
                  <div>Amount</div>
                  <div>Payment method</div>
                  <div></div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="grid grid-cols-8 gap-4 items-center">
                      {/* Transaction Time */}
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{transaction.transactionTime}</div>
                        <div className="text-gray-500">{transaction.time}</div>
                      </div>

                      {/* Status */}
                      <div>
                        <Badge 
                          className={`${
                            transaction.status === 'Successful' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                              : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                          }`}
                        >
                          {transaction.status}
                        </Badge>
                      </div>

                      {/* Transaction ID */}
                      <div className="text-sm font-medium text-gray-900">
                        {transaction.transactionId}
                      </div>

                      {/* From */}
                      <div className="text-sm text-gray-500">
                        {transaction.from}
                      </div>

                      {/* To */}
                      <div className="text-sm text-gray-500">
                        {transaction.to}
                      </div>

                      {/* Amount */}
                      <div className="text-sm font-medium text-gray-900">
                        {transaction.amount}
                      </div>

                      {/* Payment Method */}
                      <div className="text-sm text-gray-500">
                        {transaction.paymentMethod}
                      </div>

                      {/* Action */}
                      <div className="text-right">
                        <Link href={`/finance/transactions/${transaction.id}`}>
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