"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  description: string;
}

export default function TestimonialPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    quote: "",
    name: "",
    description: "",
  });
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);
  const [editForm, setEditForm] = useState({
    quote: "",
    name: "",
    description: "",
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          `https://gist.githubusercontent.com/TusharSahu02/6cf3a9f4c0b75370ab1f03d27747476a/raw/karrar-testimonials.json?t=${Date.now()}`
        );
        const data = await response.json();
        setTestimonials(data || []);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleAddTestimonial = async () => {
    if (
      !newTestimonial.quote.trim() ||
      !newTestimonial.name.trim() ||
      !newTestimonial.description.trim()
    )
      return;

    setAdding(true);
    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTestimonial),
      });

      const data = await response.json();
      if (data.success) {
        setTestimonials(data.testimonials);
        setNewTestimonial({ quote: "", name: "", description: "" });
      } else {
        console.error("Failed to add testimonial:", data.error);
      }
    } catch (error) {
      console.error("Error adding testimonial:", error);
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch("/api/testimonials", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (data.success) {
        setTestimonials(data.testimonials);
      } else {
        console.error("Failed to delete testimonial:", data.error);
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdateTestimonial = async () => {
    if (
      !editingTestimonial ||
      !editForm.quote.trim() ||
      !editForm.name.trim() ||
      !editForm.description.trim()
    )
      return;

    try {
      const response = await fetch("/api/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingTestimonial.id,
          quote: editForm.quote,
          name: editForm.name,
          description: editForm.description,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setTestimonials(data.testimonials);
        setEditingTestimonial(null);
        setEditForm({ quote: "", name: "", description: "" });
      } else {
        console.error("Failed to update testimonial:", data.error);
      }
    } catch (error) {
      console.error("Error updating testimonial:", error);
    }
  };

  const startEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setEditForm({
      quote: testimonial.quote,
      name: testimonial.name,
      description: testimonial.description,
    });
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
                  <div className="bg-purple-50 px-4 py-2 rounded-lg border border-purple-200">
                    <span className="text-purple-700 font-semibold">
                      {testimonials.length}
                    </span>
                    <span className="text-purple-600 text-sm ml-1">
                      Total Testimonials
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 shadow-sm h-max py-6 px-6 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Add New Testimonial
                  </h2>
                </div>
                <div className="space-y-4 mb-4">
                  <div>
                    <Label
                      htmlFor="testimonialQuote"
                      className="text-sm font-medium text-gray-700"
                    >
                      Quote
                    </Label>
                    <Textarea
                      id="testimonialQuote"
                      value={newTestimonial.quote}
                      onChange={(e) =>
                        setNewTestimonial({
                          ...newTestimonial,
                          quote: e.target.value,
                        })
                      }
                      placeholder="Enter testimonial quote"
                      className="mt-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="testimonialName"
                        className="text-sm font-medium text-gray-700"
                      >
                        Name
                      </Label>
                      <Input
                        id="testimonialName"
                        value={newTestimonial.name}
                        onChange={(e) =>
                          setNewTestimonial({
                            ...newTestimonial,
                            name: e.target.value,
                          })
                        }
                        placeholder="Enter client name"
                        className="mt-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="testimonialDescription"
                        className="text-sm font-medium text-gray-700"
                      >
                        Description
                      </Label>
                      <Input
                        id="testimonialDescription"
                        value={newTestimonial.description}
                        onChange={(e) =>
                          setNewTestimonial({
                            ...newTestimonial,
                            description: e.target.value,
                          })
                        }
                        placeholder="Enter client description/title"
                        className="mt-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleAddTestimonial}
                  disabled={adding}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  {adding ? "Adding..." : "+ Add Testimonial"}
                </Button>
              </div>

              {loading ? (
                <p>Loading testimonials...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {testimonials.map((testimonial, index) => (
                    <Card
                      key={testimonial.id || `${testimonial.name}-${index}`}
                      className="group hover:shadow-lg transition-all duration-200 shadow-sm border bg-white rounded-xl overflow-hidden"
                    >
                      <CardContent>
                        {editingTestimonial?.id === testimonial.id ? (
                          <div>
                            <div className="space-y-3">
                              <Textarea
                                value={editForm.quote}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    quote: e.target.value,
                                  })
                                }
                                placeholder="Testimonial quote"
                                className="border-gray-300 focus:border-purple-500"
                                rows={3}
                              />
                              <Input
                                value={editForm.name}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    name: e.target.value,
                                  })
                                }
                                placeholder="Client name"
                                className="border-gray-300 focus:border-purple-500"
                              />
                              <Input
                                value={editForm.description}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    description: e.target.value,
                                  })
                                }
                                placeholder="Client description"
                                className="border-gray-300 focus:border-purple-500"
                              />
                              <div className="flex gap-2 pt-2">
                                <Button
                                  size="sm"
                                  onClick={handleUpdateTestimonial}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  Save
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setEditingTestimonial(null)}
                                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="mb-3">
                              <p className="text-gray-700 italic text-sm leading-relaxed mb-3">
                                "{testimonial?.quote}"
                              </p>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                <h3 className="font-semibold text-gray-900">
                                  {testimonial?.name}
                                </h3>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                {testimonial?.description}
                              </p>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() =>
                                  handleDeleteTestimonial(testimonial.id)
                                }
                                disabled={deletingId === testimonial.id}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs"
                              >
                                {deletingId === testimonial.id
                                  ? "Deleting..."
                                  : "Delete"}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => startEdit(testimonial)}
                                className="border-purple-200 text-purple-600 hover:bg-purple-50 px-3 py-1 text-xs"
                              >
                                Edit
                              </Button>
                            </div>
                          </div>
                        )}
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
