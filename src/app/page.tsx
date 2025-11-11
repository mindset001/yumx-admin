import { Sidebar } from "@/components/sidebar";
import { DashboardHeader } from "@/components/dashboard-panels";
import { StatsCards } from "@/components/StatsCards";
import { SalesChart, VisitorsChart } from "@/components/dashboard-charts";
import { Activities } from "@/components/Activities";
import { MenuSubmission } from "@/components/MenuSubmission";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#FFF2F2]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <div className="flex flex-col lg:flex-row justify-between gap-4 p-2 sm:p-4 md:p-6 w-full">
          <div className="flex flex-col w-full lg:w-3/4">
            {/* Stats Cards */}
            <StatsCards />

            {/* Charts and Right Panel */}
            <div className="grid grid-cols-1 gap-6">
              {/* Left side - Charts */}
              <div className="space-y-6">
                <SalesChart />
                <VisitorsChart />
              </div>
            </div>
          </div>

          {/* Right side - Activities and Menu */}
          <div className="w-full lg:w-auto flex flex-col gap-4">
            <Activities />
            <MenuSubmission />
          </div>
        </div>
      </div>
    </div>
  );
}
