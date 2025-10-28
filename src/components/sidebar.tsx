"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  DollarSign, 
  HelpCircle, 
  LogOut,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    variant: "default" as const,
    hasDropdown: false,
  },
  {
    title: "Management",
    href: "/management",
    icon: Users,
    variant: "ghost" as const,
    hasDropdown: true,
    subItems: [
      
      { title: "Chefs", href: "/management/chefs" },
      { title: "Customers", href: "/management/customers" },
      { title: "Meals", href: "/management/meals" },
      { title: "Orders", href: "/management/orders" },
    ]
  },
  {
    title: "Finance",
    href: "/finance",
    icon: DollarSign,
    variant: "ghost" as const,
    hasDropdown: true,
    subItems: [
      { title: "Transactions", href: "/finance/transactions" },
      { title: "Payouts", href: "/finance/payouts" },
      { title: "Refunds", href: "/finance/refunds" },
    ]
  },
  {
    title: "Support",
    href: "/support",
    icon: HelpCircle,
    variant: "ghost" as const,
    hasDropdown: false,
  },
  {
    title: "Configuration",
    href: "/configuration",
    icon: Settings,
    variant: "ghost" as const,
    hasDropdown: true,
    subItems: [
      { title: "App Settings", href: "/configuration/app-settings" },
      { title: "Payment Settings", href: "/configuration/payment-settings" },
    ]
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  const toggleDropdown = (itemTitle: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [itemTitle]: !prev[itemTitle]
    }));
  };

  return (
    <div className="flex min-h-screen w-64 flex-col bg-white border-r">
      {/* Top Section - Logo and Navigation */}
      <div className="flex-1">
        {/* Logo */}
        <div className="flex items-center gap-2 p-6">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-red-600 text-white font-bold">
            Y
          </div>
          <span className="text-xl font-bold text-gray-900">Yum X</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 px-4">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            const isDropdownOpen = openDropdowns[item.title];
            const hasActiveSubItem = item.subItems?.some(subItem => pathname === subItem.href);
            const shouldHighlightParent = isActive || hasActiveSubItem;
            
            return (
              <div key={item.title}>
                {/* Main Menu Item */}
                {item.hasDropdown ? (
                  <Button
                    variant={shouldHighlightParent ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-between gap-2 text-left",
                      shouldHighlightParent 
                        ? "bg-red-600 hover:bg-red-700 text-white" 
                        : "text-[#8A8C90]"
                    )}
                    onClick={() => toggleDropdown(item.title)}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </div>
                    {isDropdownOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                ) : (
                  <Link href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-2",
                        isActive && "bg-red-600 hover:bg-red-700"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Button>
                  </Link>
                )}

                {/* Submenu Items */}
                {item.hasDropdown && isDropdownOpen && item.subItems && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems.map((subItem) => {
                      const isSubActive = pathname === subItem.href;
                      return (
                        <Link key={subItem.href} href={subItem.href}>
                          <Button
                            variant={isSubActive ? "default" : "ghost"}
                            size="sm"
                            className={cn(
                              "w-full justify-start text-sm",
                              isSubActive 
                                ? "bg-red-600 hover:bg-red-700 text-white" 
                                : "text-[#8A8C90]"
                            )}
                          >
                            {subItem.title}
                          </Button>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section - Logout */}
      <div className="p-4 border-t border-gray-200">
        <Button variant="ghost" className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}