import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import Link from "next/link";

interface SupportTicket {
  id: string;
  dateIssued: string;
  time: string;
  status: 'Open' | 'In progress' | 'Successful' | 'Pending';
  refundId: string;
  issuerName: string;
  role: string;
  issueSummary: string;
}

const supportTickets: SupportTicket[] = [
  {
    id: "1",
    dateIssued: "2028-09-01",
    time: "7:30 AM",
    status: "Open",
    refundId: "#618292",
    issuerName: "Adam tukur",
    role: "User",
    issueSummary: "Network issues"
  },
  {
    id: "2",
    dateIssued: "2028-09-01",
    time: "7:30 AM",
    status: "In progress",
    refundId: "#484949",
    issuerName: "Adam tukur",
    role: "User",
    issueSummary: "Refund request"
  },
  {
    id: "3",
    dateIssued: "2028-09-01",
    time: "7:30 AM",
    status: "Successful",
    refundId: "#484949",
    issuerName: "Adam tukur",
    role: "User",
    issueSummary: "Network issues"
  },
  {
    id: "4",
    dateIssued: "2028-09-01",
    time: "7:30 AM",
    status: "Successful",
    refundId: "#484949",
    issuerName: "Adam tukur",
    role: "User",
    issueSummary: "Network issues"
  },
  {
    id: "5",
    dateIssued: "2028-09-01",
    time: "7:30 AM",
    status: "Successful",
    refundId: "#484949",
    issuerName: "Adam tukur",
    role: "User",
    issueSummary: "Refund request"
  },
  {
    id: "6",
    dateIssued: "2028-09-01",
    time: "7:30 AM",
    status: "Pending",
    refundId: "#484949",
    issuerName: "Adam tukur",
    role: "User",
    issueSummary: "Refund request"
  },
  {
    id: "7",
    dateIssued: "2028-09-01",
    time: "7:30 AM",
    status: "Successful",
    refundId: "#484949",
    issuerName: "Adam tukur",
    role: "User",
    issueSummary: "Network issues"
  },
  {
    id: "8",
    dateIssued: "2028-09-01",
    time: "7:30 AM",
    status: "Successful",
    refundId: "#484949",
    issuerName: "Adam tukur",
    role: "User",
    issueSummary: "Refund request"
  }
];

export default function SupportPage() {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'In progress':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-100';
      case 'Successful':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FFF2F2]">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className=" bg-[#FFF2F2] px-6 py-4 ">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Support</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search menu"
                className="pl-10 w-80"
              />
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-6">
          {/* Support Tickets Table */}
          <Card>
            <CardContent className="p-0">
              {/* Table Header */}
              <div className="bg-[#C72600] text-white px-6 py-4">
                <div className="grid grid-cols-7 gap-4 text-sm font-medium">
                  <div>Date issued</div>
                  <div>Status</div>
                  <div>Refund ID</div>
                  <div>Issuer's name</div>
                  <div>Role</div>
                  <div>Issue summary</div>
                  <div></div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="grid grid-cols-7 gap-4 items-center">
                      {/* Date Issued */}
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{ticket.dateIssued}</div>
                        <div className="text-gray-500">{ticket.time}</div>
                      </div>

                      {/* Status */}
                      <div>
                        <Badge className={getStatusBadgeColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </div>

                      {/* Refund ID */}
                      <div className="text-sm font-medium text-gray-900">
                        {ticket.refundId}
                      </div>

                      {/* Issuer Name */}
                      <div className="text-sm text-gray-500">
                        {ticket.issuerName}
                      </div>

                      {/* Role */}
                      <div className="text-sm text-gray-500">
                        {ticket.role}
                      </div>

                      {/* Issue Summary */}
                      <div className="text-sm text-gray-500">
                        {ticket.issueSummary}
                      </div>

                      {/* Action */}
                      <div className="text-right">
                        <Link href={`/support/${ticket.id}`}>
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