'use client'

import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Customer {
  id: string;
  createdAt: string;
  dateJoined?: string;
  time?: string;
  userStatus: 'Active' | 'Suspended';
  fullName?: string;
  name?: string;
  email: string;
  address?: string;
  location?: string;
}

// Format date to DD-MM-YYYY
function formatDate(dateString: string): string {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } catch {
    return dateString;
  }
}

function useCustomers(page: number = 1, limit: number = 10) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint = `${process.env.NEXT_PUBLIC_API_URL || ""}/customer?page=${page}&limit=${limit}`;
        const headers: Record<string, string> = {};
        if (typeof window !== 'undefined') {
          const accessToken = localStorage.getItem('accessToken');
          if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
        }
        const res = await fetch(endpoint, {
          method: "GET",
          headers,
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch customers");
        const data = await res.json();
        console.log('customerdata response:', data);
        
        // Extract customers from nested data structure: data.data.data
        const customersArray = data?.data?.data || data?.data || data || [];
        const totalCount = data?.data?.total || customersArray.length;
        console.log('extracted customers:', customersArray);
        setCustomers(Array.isArray(customersArray) ? customersArray : []);
        setTotal(totalCount);
        setTotalPages(Math.ceil(totalCount / limit));
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, [page, limit]);
  return { customers, loading, error, total, totalPages };
}

export default function CustomersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const { customers, loading, error, total, totalPages } = useCustomers(currentPage, itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const statsCards = [
    {
      title: "Total customers",
      value: total.toString(),
      variant: 'primary' as const
    },
    {
      title: "Active customers",
      value: "25",
      variant: 'secondary' as const
    },
    {
      title: "Not active customers",
      value: "25",
      variant: 'secondary' as const
    },
    {
      title: "Total customers order",
      value: "25",
      variant: 'primary' as const
    }
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#FFF2F2]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#FFF2F2] px-2 sm:px-4 md:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h1 className="text-lg sm:text-2xl font-bold text-[#C72600]">Customer record</h1>
            <div className="relative w-full sm:w-auto bg-white">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search menu"
                className="pl-10 w-full sm:w-80"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 p-2 sm:p-4 md:p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 bg-white py-4 px-2 sm:px-6 md:px-12 rounded-lg">
            {statsCards.map((stat, index) => (
              <Card
                key={index}
                className={`${stat.variant === 'primary'
                    ? 'bg-[#C72600] text-white border-0'
                    : 'bg-[#FFF2F2] border border-gray-200'
                  } transition-all duration-300 hover:shadow-lg`}
              >
                <CardContent className="">
                  <div className="flex items-center justify-between min-h-[32px]">
                    <p className={`text-xs sm:text-sm font-medium ${stat.variant === 'primary'
                        ? 'text-red-100'
                        : 'text-[#C72600]'
                      }`}>
                      {stat.title}
                    </p>
                    <p className={`text-base sm:text-lg md:text-2xl font-bold ${stat.variant === 'primary'
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

          {/* Customers Table */}
          <Card>
            <CardContent className="p-0">
              {/* Table Header */}
              <div className="bg-[#C72600] text-white px-2 sm:px-6 py-4 hidden md:block">
                <div className="grid grid-cols-6 gap-4 text-xs font-medium">
                  <div>Date joined</div>
                  <div>Status</div>
                  <div>User name</div>
                  <div>Email address</div>
                  <div>Location</div>
                  <div></div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {loading && <div className="p-4 text-center text-gray-500">Loading customers...</div>}
                {error && <div className="p-4 text-center text-red-500">{error}</div>}
                {!loading && !error && customers.length === 0 && (
                  <div className="p-4 text-center text-gray-500">No customer available</div>
                )}
                {!loading && !error && customers.length > 0 && customers.map((customer) => (
                  <div key={customer.id} className="px-2 sm:px-6 py-4 hover:bg-gray-50">
                    {/* Responsive: grid for md+, stacked for mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-4 items-center">
                      {/* Date */}
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{formatDate(customer.createdAt || customer.dateJoined || "")}</div>
                        <div className="text-gray-500">{customer.time || ""}</div>
                      </div>

                      {/* Status */}
                      <div>
                        <Badge
                          className={`${customer.userStatus === 'Active'
                              ? 'bg-green-100 text-green-800 hover:bg-green-100'
                              : 'bg-red-100 text-red-800 hover:bg-red-100'
                            }`}
                        >
                          {customer.userStatus}
                        </Badge>
                      </div>

                      {/* Name */}
                      <div className="text-sm font-medium text-gray-900">
                        {customer.name || "-"}
                      </div>

                      {/* Email */}
                      <div className="text-sm text-gray-500">
                        {customer.email}
                      </div>

                      {/* Location */}
                      <div className="text-sm text-gray-500">
                        {customer.address || customer.location || "-"}
                      </div>

                      {/* Action */}
                      <div className="text-right">
                        <Link href={`/management/customers/${customer.id}`}>
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

          {/* Pagination */}
          {!loading && !error && totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 rounded-b-lg">
              <div className="flex-1 flex justify-between sm:hidden">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                >
                  Previous
                </Button>
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                >
                  Next
                </Button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * itemsPerPage, total)}
                    </span>{' '}
                    of <span className="font-medium">{total}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <Button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      variant="outline"
                      size="sm"
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md"
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            className={`relative inline-flex items-center px-4 py-2 ${
                              currentPage === page
                                ? 'bg-[#C72600] text-white hover:bg-red-700'
                                : ''
                            }`}
                          >
                            {page}
                          </Button>
                        );
                      } else if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="relative inline-flex items-center px-4 py-2 text-sm">...</span>;
                      }
                      return null;
                    })}
                    <Button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      variant="outline"
                      size="sm"
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md"
                    >
                      Next
                    </Button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}