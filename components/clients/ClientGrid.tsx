import { Client, ClientFormData } from '@/hooks/useClients';
import { ClientCard } from './ClientCard';

interface ClientGridProps {
  clients: Client[];
  onUpdate: (id: string, data: ClientFormData) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  deletingId?: string | null;
}

export const ClientGrid = ({
  clients,
  onUpdate,
  onDelete,
  deletingId,
}: ClientGridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {clients.map((client, index) => (
      <ClientCard
        key={client.id || `${client.name}-${index}`}
        client={client}
        onUpdate={onUpdate}
        onDelete={onDelete}
        isDeleting={deletingId === client.id}
      />
    ))}
  </div>
);