import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Client, ClientFormData } from '@/hooks/useClients';
import { ClientForm } from './ClientForm';

interface ClientCardProps {
  client: Client;
  onUpdate: (id: string, data: ClientFormData) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isDeleting?: boolean;
}

export const ClientCard = ({
  client,
  onUpdate,
  onDelete,
  isDeleting = false,
}: ClientCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (data: ClientFormData) => {
    setIsUpdating(true);
    try {
      await onUpdate(client.id, data);
      setIsEditing(false);
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(client.id);
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  if (isEditing) {
    return (
      <Card className="group hover:shadow-lg transition-all duration-200 shadow-sm bg-white rounded-xl overflow-hidden border">
        <CardContent>
          <ClientForm
            onSubmit={handleUpdate}
            initialData={{
              name: client.name,
              sector: client.sector,
            }}
            submitLabel="Save"
            isLoading={isUpdating}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(false)}
            className="mt-2 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 shadow-sm bg-white rounded-xl overflow-hidden border">
      <CardContent>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {client.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-600 font-medium">
                {client.sector}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="border-blue-200 text-blue-600 hover:bg-blue-50 px-3 py-1 text-xs"
          >
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};