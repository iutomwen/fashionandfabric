import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "../../components/SidebarNav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Settings",
  description: "App Settings.",
};
const path = "/dashboard/settings";
const sidebarNavItems = [
  {
    title: "App Settings",
    href: `${path}/`,
  },
  {
    title: "Categories",
    href: `${path}/categories`,
  },
  {
    title: "Subcategories",
    href: `${path}/subcategories`,
  },
  {
    title: "Countries",
    href: `${path}/countries`,
  },
  {
    title: "States",
    href: `${path}/states`,
  },
  {
    title: "Cities",
    href: `${path}/cities`,
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className=" space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Global Settings</h2>
        <p className="text-muted-foreground">
          View the current products avaliable in the system.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-5xl p-6 border rounded-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
