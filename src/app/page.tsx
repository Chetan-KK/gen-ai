import Header from "@/components/header";
import Authentication from "@/components/Authentication";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

export default function Home() {
  const user = null;

  return (
    <main className="">
      <Header />
      <Link href={"/dashboard"}>dashboard</Link>
      {/*     
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <InsightsDisplay />
          <Visualizations />
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RealTimeUpdates />
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DecisionTracking />
          <BusinessMetrics />
        </div>
        <div className="mt-8">
          {" "}
          <Settings user={user} />{" "}
        </div>
      </div> */}
    </main>
  );
}
