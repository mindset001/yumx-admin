import { Sidebar } from "@/components/sidebar";
import { DashboardHeader } from "@/components/dashboard-panels";
import { StatsCards } from "@/components/StatsCards";
import { SalesChart, VisitorsChart } from "@/components/dashboard-charts";
import { Activities } from "@/components/Activities";
import { MenuSubmission } from "@/components/MenuSubmission";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#FFF2F2]">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col ">
        <DashboardHeader />

        <div className="flex justify-between gap-4 p-6 ">
         <div className="flex flex-col w-3/4">
           {/* Stats Cards */}
          <StatsCards />
          
          {/* Charts and Right Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left side - Charts */}
            <div className="lg:col-span-4 space-y-6">
              <SalesChart />
              <VisitorsChart />
            </div>
            
            
          </div>
         </div>

          {/* Right side - Activities and Menu */}
            <div className="">
              <Activities />
              <MenuSubmission />
            </div>
        </div>
      </div>
    </div>
  );
}
