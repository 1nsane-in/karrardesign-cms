"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const routeMap: Record<string, string> = {
  "/": "Dashboard",
  "/clients": "Clients",
  "/projects": "Projects",
  "/testimonial": "Testimonials",
  "/projects/new-project": "New Project",
};

export function BreadcrumbNav() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbs = [
    { href: "/", label: "Dashboard" },
    ...pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      return {
        href,
        label:
          routeMap[href] || segment.charAt(0).toUpperCase() + segment.slice(1),
      };
    }),
  ];

  if (pathname === "/") {
    return (
      <span className="text-base font-medium" suppressHydrationWarning>
        Dashboard
      </span>
    );
  }

  return (
    <Breadcrumb suppressHydrationWarning>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.href}>
            <BreadcrumbItem>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
