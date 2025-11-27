"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { useClients, ClientFormData } from "@/hooks/useClients";
import { ClientForm } from "@/components/clients/ClientForm";
import { ClientGrid } from "@/components/clients/ClientGrid";
import { ClientStats } from "@/components/clients/ClientStats";

export default function ClientsPage() {
  const { clients, loading, addClient, updateClient, deleteClient } = useClients();
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAdd = async (data: ClientFormData) => {
    setAdding(true);
    try {
      await addClient(data);
    } finally {
      setAdding(false);
    }
  };

  const handleUpdate = async (id: string, data: ClientFormData) => {
    await updateClient(id, data);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteClient(id);
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
                  <ClientStats count={clients.length} />
                </div>
              </div>
              <div className="bg-white border border-gray-200 shadow-sm h-max py-6 px-6 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Add New Client
                  </h2>
                </div>
                <ClientForm onSubmit={handleAdd} isLoading={adding} />
              </div>

              {loading ? (
                <p>Loading clients...</p>
              ) : (
                <ClientGrid
                  clients={clients}
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
