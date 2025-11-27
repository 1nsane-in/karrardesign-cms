"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { useTestimonials, TestimonialFormData } from "@/hooks/useTestimonials";
import { TestimonialForm } from "@/components/testimonials/TestimonialForm";
import { TestimonialGrid } from "@/components/testimonials/TestimonialGrid";
import { TestimonialStats } from "@/components/testimonials/TestimonialStats";

export default function TestimonialPage() {
  const { testimonials, loading, addTestimonial, updateTestimonial, deleteTestimonial } = useTestimonials();
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAdd = async (data: TestimonialFormData) => {
    setAdding(true);
    try {
      await addTestimonial(data);
    } finally {
      setAdding(false);
    }
  };

  const handleUpdate = async (id: string, data: TestimonialFormData) => {
    await updateTestimonial(id, data);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteTestimonial(id);
    } finally {
      setDeletingId(null);
    }
  };

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
        <div className="flex flex-1 flex-col w-full">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Testimonials
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Manage customer testimonials
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <TestimonialStats count={testimonials.length} />
                </div>
              </div>

              <div className="bg-white border border-gray-200 shadow-sm h-max py-6 px-6 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Add New Testimonial
                  </h2>
                </div>
                <TestimonialForm onSubmit={handleAdd} isLoading={adding} />
              </div>

              {loading ? (
                <p>Loading testimonials...</p>
              ) : (
                <TestimonialGrid
                  testimonials={testimonials}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  deletingId={deletingId}
                />
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
