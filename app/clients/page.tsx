"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Client {
  name: string;
  sector: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [newClient, setNewClient] = useState({ name: "", sector: "" });

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
                <h1 className="text-2xl font-bold">Clients</h1>
                <Button
                  variant={"outline"}
                  className="flex items-center gap-3 "
                >
                  Total Clients : {clients.length}
                </Button>
              </div>
              <div className="border h-max py-5 px-4 rounded-lg">
                <h1 className="text-lg font-semibold mb-4">Add new clients</h1>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="clientName">Name</Label>
                    <Input
                      id="clientName"
                      value={newClient.name}
                      onChange={(e) =>
                        setNewClient({ ...newClient, name: e.target.value })
                      }
                      placeholder="Enter client name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientSector">Sector</Label>
                    <Input
                      id="clientSector"
                      value={newClient.sector}
                      onChange={(e) =>
                        setNewClient({ ...newClient, sector: e.target.value })
                      }
                      placeholder="Enter client sector"
                      className="mt-1"
                    />
                  </div>
                  <Button>Add Client</Button>
                </div>
              </div>

              {loading ? (
                <p>Loading clients...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clients.map((client, index) => (
                    <Card key={index} className="px-2 py-4">
                      <CardContent>
                        <h1 className=" text-xl font-semibold">
                          {client?.name}
                        </h1>
                        <p>{client.sector}</p>
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
