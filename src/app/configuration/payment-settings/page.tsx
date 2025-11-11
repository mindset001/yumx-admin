"use client";

import { Sidebar } from "@/components/sidebar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface PaymentSetting {
  id: string;
  title: string;
  description?: string;
  enabled: boolean;
}

export default function PaymentSettingsPage() {
  const [settings, setSettings] = useState<PaymentSetting[]>([
    {
      id: "payment-gateways",
      title: "Supported payment gateways (Stripe, Paystack, etc.)",
      enabled: true
    },
    {
      id: "enable-disable-methods",
      title: "Enable/disable methods (Card / Wallet / Bank transfer)",
      enabled: false
    },
    {
      id: "minimum-order-price",
      title: "Minimum order price or payout threshold",
      enabled: true
    },
    {
      id: "commission-percentage",
      title: "Commission percentage setup for each transaction",
      enabled: false
    }
  ]);

  const toggleSetting = (id: string) => {
    setSettings(prev => 
      prev.map(setting => 
        setting.id === id 
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-2 sm:px-4 md:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Configuration</h1>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search menu"
                className="pl-10 w-full sm:w-80"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 p-2 sm:p-4 md:p-6">
          {/* Payment Settings List */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="divide-y divide-gray-200">
              {settings.map((setting, index) => (
                <div key={setting.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50">
                  <div className="flex-1 w-full">
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1">
                      {setting.title}
                    </h3>
                    {setting.description && (
                      <p className="text-xs sm:text-sm text-gray-500">
                        {setting.description}
                      </p>
                    )}
                  </div>

                  <div className="sm:ml-6 w-full sm:w-auto flex justify-end">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id={`${setting.id}-enabled`}
                        name={setting.id}
                        checked={setting.enabled}
                        onChange={() => toggleSetting(setting.id)}
                        className="w-5 h-5 text-[#C72600] border-2 border-gray-300 focus:ring-[#C72600] focus:ring-2"
                        style={{
                          accentColor: setting.enabled ? '#C72600' : '#e5e7eb'
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// (Removed duplicate/erroneous code after the main component)