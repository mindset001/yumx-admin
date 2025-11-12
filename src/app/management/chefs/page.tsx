'use client'

import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Chef {
  id: string;
  createdAt: string;
  time: string;
  status: 'Approved' | 'Pending';
  FullName?: string;
  fullName?: string;
  name?: string;
  email: string;
  address: string;
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

function useChefs(page: number = 1, limit: number = 10) {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchChefs = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint = `${process.env.NEXT_PUBLIC_API_URL || ""}/chef?page=${page}&limit=${limit}`;
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
        if (!res.ok) throw new Error("Failed to fetch chefs");
        const data = await res.json();
        console.log('chefdata response:', data);
        
        // Extract chefs from nested data structure: data.data.data
        const chefsArray = data?.data?.data || data?.data || data || [];
        const totalCount = data?.data?.total || chefsArray.length;
        console.log('extracted chefs:', chefsArray);
        setChefs(Array.isArray(chefsArray) ? chefsArray : []);
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
    fetchChefs();
  }, [page, limit]);
  return { chefs, loading, error, total, totalPages };
}

export default function ChefsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const { chefs, loading, error, total, totalPages } = useChefs(currentPage, itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const statsCards = [
    {
      title: "Total chefs",
      value: total.toString(),
      variant: 'primary' as const
    },
    {
      title: "Active chefs",
      value: "25",
      variant: 'secondary' as const
    },
    {
      title: "Not active chefs",
      value: "25",
      variant: 'secondary' as const
    },
    {
      title: "Most selling chefs",
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
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Chef&apos;s record</h1>
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
                className={`${
                  stat.variant === 'primary'
                    ? 'bg-[#C72600] text-white border-0'
                    : 'bg-[#FFF2F2] border border-gray-200'
                } transition-all duration-300 hover:shadow-lg`}
              >
                <CardContent className="">
                  <div className="flex items-center justify-between min-h-[32px]">
                    <p className={`text-xs sm:text-sm font-medium ${
                      stat.variant === 'primary'
                        ? 'text-red-100'
                        : 'text-[#C72600]'
                    }`}>
                      {stat.title}
                    </p>
                    <p className={`text-base sm:text-lg md:text-2xl font-bold ${
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

          {/* Chefs Table */}
          <Card>
            <CardContent className="p-0">
              {/* Table Header */}
              <div className="bg-[#C72600] text-white px-2 sm:px-6 py-4 hidden md:block">
                <div className="grid grid-cols-6 gap-4 text-xs font-medium">
                  <div>Date joined</div>
                  <div>Status</div>
                  <div>Chef name</div>
                  <div>Email address</div>
                  <div>Location</div>
                  <div></div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {loading && <div className="p-4 text-center text-gray-500">Loading chefs...</div>}
                {error && <div className="p-4 text-center text-red-500">{error}</div>}
                {!loading && !error && chefs.length === 0 && (
                  <div className="p-4 text-center text-gray-500">No chef available</div>
                )}
                {!loading && !error && chefs.length > 0 && chefs.map((chef) => (
                  <div key={chef.id} className="px-2 sm:px-6 py-4 hover:bg-gray-50">
                    {/* Responsive: grid for md+, stacked for mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-4 items-center">
                      {/* Date */}
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{formatDate(chef.createdAt)}</div>
                        <div className="text-gray-500">{chef.time || ""}</div>
                      </div>

                      {/* Status */}
                      <div>
                        <Badge
                          className={`${
                            chef.status === 'Approved'
                              ? 'bg-green-100 text-green-800 hover:bg-green-100'
                              : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                          }`}
                        >
                          {chef.status || "-"}
                        </Badge>
                      </div>

                      {/* Name */}
                      <div className="text-sm font-medium text-gray-900">
                        {chef.FullName || chef.fullName || chef.name || "-"}
                      </div>

                      {/* Email */}
                      <div className="text-sm text-gray-500">
                        {chef.email}
                      </div>

                      {/* Location */}
                      <div className="text-sm text-gray-500">
                        {chef.address}
                      </div>

                      {/* Action */}
                      <div className="text-right">
                        <Link href={`/management/chefs/${chef.id}`}>
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