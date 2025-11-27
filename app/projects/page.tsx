"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Project {
  image: string;
  title: string;
  slug: string;
  category: string;
  service: string;
  location: string;
  details: {
    category: string;
    service: string;
    location: string;
    year: string;
    area: string;
    description: string;
    fullDescription: string;
    description2?: string;
    images: string[];
  };
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/TusharSahu02/91087bfc220058c1f4624c8586c80462/raw/karrar-projects.json"
        );
        const data = await response.json();
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Projects</h1>
                <Button asChild>
                  <Link href="/projects/new-project">Add new record</Link>
                </Button>
              </div>

              {loading ? (
                <p>Loading projects...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden rounded-2xl shadow-sm border hover:shadow-md transition-all"
                    >
                      <div className="aspect-video overflow-hidden bg-gray-50">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-xl font-semibold">
                            {project.title}
                          </CardTitle>
                          {project.details?.year && (
                            <span className="text-xs bg-black/5 px-2 py-1 rounded-full text-gray-600">
                              {project.details.year}
                            </span>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent>
                        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                          {project.details?.description ||
                            "No description available"}
                        </p>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-400 text-xs uppercase">
                              Service
                            </span>
                            <span className="font-semibold text-gray-800">
                              {project.service}
                            </span>
                          </div>

                          <div className="flex flex-col">
                            <span className="font-medium text-gray-400 text-xs uppercase">
                              Category
                            </span>
                            <span className="font-semibold text-gray-800">
                              {project.details?.category || project.category}
                            </span>
                          </div>

                          <div className="flex flex-col">
                            <span className="font-medium text-gray-400 text-xs uppercase">
                              Location
                            </span>
                            <span className="font-semibold text-gray-800">
                              {project.location}
                            </span>
                          </div>

                          {project.details?.area && (
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-400 text-xs uppercase">
                                Area
                              </span>
                              <span className="font-semibold text-gray-800">
                                {project.details.area}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
