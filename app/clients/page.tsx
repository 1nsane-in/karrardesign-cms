"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Client {
  id: string;
  name: string;
  sector: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newClient, setNewClient] = useState({ name: "", sector: "" });
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [editForm, setEditForm] = useState({ name: "", sector: "" });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/TusharSahu02/117e211ec2dab089e7efca3b945fb3d0/raw/karrar-patners.json"
        );
        const data = await response.json();
        setClients(data || []);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleAddClient = async () => {
    if (!newClient.name.trim() || !newClient.sector.trim()) return;

    setAdding(true);
    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient),
      });

      const data = await response.json();
      if (data.success) {
        setClients(data.clients);
        setNewClient({ name: "", sector: "" });
      } else {
        console.error("Failed to add client:", data.error);
      }
    } catch (error) {
      console.error("Error adding client:", error);
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteClient = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch("/api/clients", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (data.success) {
        setClients(data.clients);
      } else {
        console.error("Failed to delete client:", data.error);
      }
    } catch (error) {
      console.error("Error deleting client:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdateClient = async () => {
    if (!editingClient || !editForm.name.trim() || !editForm.sector.trim())
      return;

    try {
      const response = await fetch("/api/clients", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingClient.id,
          name: editForm.name,
          sector: editForm.sector,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setClients(data.clients);
        setEditingClient(null);
        setEditForm({ name: "", sector: "" });
      } else {
        console.error("Failed to update client:", data.error);
      }
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  const startEdit = (client: Client) => {
    setEditingClient(client);
    setEditForm({ name: client.name, sector: client.sector });
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
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
                  <p className="text-gray-600 mt-1">
                    Manage your client relationships
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                    <span className="text-blue-700 font-semibold">
                      {clients.length}
                    </span>
                    <span className="text-blue-600 text-sm ml-1">
                      Total Clients
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 shadow-sm h-max py-6 px-6 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Add New Client
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label
                      htmlFor="clientName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Client Name
                    </Label>
                    <Input
                      id="clientName"
                      value={newClient.name}
                      onChange={(e) =>
                        setNewClient({ ...newClient, name: e.target.value })
                      }
                      placeholder="Enter client name"
                      className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="clientSector"
                      className="text-sm font-medium text-gray-700"
                    >
                      Sector
                    </Label>
                    <Input
                      id="clientSector"
                      value={newClient.sector}
                      onChange={(e) =>
                        setNewClient({ ...newClient, sector: e.target.value })
                      }
                      placeholder="Enter client sector"
                      className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleAddClient}
                  disabled={adding}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  {adding ? "Adding..." : "+ Add Client"}
                </Button>
              </div>

              {loading ? (
                <p>Loading clients...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {clients.map((client, index) => (
                    <Card
                      key={client.id || `${client.name}-${index}`}
                      className="group hover:shadow-lg transition-all duration-200 shadow-sm bg-white rounded-xl overflow-hidden border"
                    >
                      <CardContent>
                        {editingClient?.id === client.id ? (
                          <div>
                            <div className="space-y-3">
                              <Input
                                value={editForm.name}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    name: e.target.value,
                                  })
                                }
                                placeholder="Client name"
                                className="border-gray-300 focus:border-blue-500"
                              />
                              <Input
                                value={editForm.sector}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    sector: e.target.value,
                                  })
                                }
                                placeholder="Client sector"
                                className="border-gray-300 focus:border-blue-500"
                              />
                              <div className="flex gap-2 pt-2">
                                <Button
                                  size="sm"
                                  onClick={handleUpdateClient}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  Save
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setEditingClient(null)}
                                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {client?.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                  <span className="text-sm text-gray-600 font-medium">
                                    {client?.sector}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteClient(client.id)}
                                disabled={deletingId === client.id}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs "
                              >
                                {deletingId === client.id
                                  ? "Deleting..."
                                  : "Delete"}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => startEdit(client)}
                                className="border-blue-200 text-blue-600 hover:bg-blue-50 px-3 py-1 text-xs"
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
