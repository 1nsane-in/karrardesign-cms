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
  number: string;
  category: string;
  service: string;
  location: string;
}

interface ProjectDetail {
  title: string;
  category: string;
  service: string;
  location: string;
  year: string;
  area: string;
  description: string;
  fullDescription: string;
  description2?: string;
  images: string[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectData, setProjectData] = useState<Record<string, ProjectDetail>>(
    {}
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/TusharSahu02/91087bfc220058c1f4624c8586c80462/raw/karrar-projects.json"
        );
        const data = await response.json();
        setProjects(data.projects || []);
        setProjectData(data.projectData || {});
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
                  {projects.map((project, index) => {
                    const details = projectData[project.slug];
                    return (
                      <Card key={index} className="overflow-hidden">
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">
                              {project.title}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">
                            {details?.description || "No description available"}
                          </p>
                          <div className="space-y-2">
                            <div>
                              <span className="text-sm font-medium">
                                Service:{" "}
                              </span>
                              <span className="text-sm">{project.service}</span>
                            </div>
                            <div>
                              <span className="text-sm font-medium">
                                Category:{" "}
                              </span>
                              <span className="text-sm">
                                {details?.category || project.category}
                              </span>
                            </div>
                            <div>
                              <span className="text-sm font-medium">
                                Location:{" "}
                              </span>
                              <span className="text-sm">
                                {project.location}
                              </span>
                            </div>
                            {details?.year && (
                              <div>
                                <span className="text-sm font-medium">
                                  Year:{" "}
                                </span>
                                <span className="text-sm">{details.year}</span>
                              </div>
                            )}
                            {details?.area && (
                              <div>
                                <span className="text-sm font-medium">
                                  Area:{" "}
                                </span>
                                <span className="text-sm">{details.area}</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
