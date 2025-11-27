import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <BreadcrumbNav />
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            asChild
            size="sm"
            className="hidden sm:flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Link
              href="https://karrardesign.vercel.app/"
              rel="noopener noreferrer"
              target="_blank"
              className="flex items-center gap-2"
            >
              Visit Karrar website
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
