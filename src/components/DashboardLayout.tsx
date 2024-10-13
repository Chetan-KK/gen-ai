import Link from "next/link";
import React, { ReactNode } from "react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ui/mode-toggle";
import { usePathname, useRouter } from "next/navigation";

type Props = { children: ReactNode };

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="grid grid-cols-[auto_1fr] h-screen">
      <Sidebar />
      <div className="p-5 overflow-auto h-screen">{children}</div>
    </div>
  );
};

const Sidebar = () => {
  const path = usePathname();
  console.log("path ", path);

  const links = [
    {
      name: "Dashboard",
      route: "/dashboard",
    },
    {
      name: "Insights",
      route: "/dashboard/visualizations",
    },
    {
      name: "QAInteraction",
      route: "/dashboard/qa-interaction",
    },
    {
      name: "RealTimeUpdates",
      route: "/dashboard/real-time-updates",
    },
    {
      name: "DecisionTracking",
      route: "/dashboard/decision-tracking",
    },
    {
      name: "BusinessMetrics",
      route: "/dashboard/business-metrics",
    },
    {
      name: "Settings",
      route: "/dashboard/settings",
    },
  ];

  return (
    <div className="p-3 border-r border-border w-60">
      <div className="flex justify-between items-center pb-2 border-b border-border">
        <h1 className="font-bold">DMS</h1>
        <ModeToggle />
      </div>
      <div className="space-y-1 pt-2">
        {links.map((link, _) => (
          <Link
            key={_}
            href={link.route}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full justify-start"
            )}
            style={{
              backgroundColor:
                path === link.route ? "hsl(var(--border))" : undefined,
            }}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardLayout;
