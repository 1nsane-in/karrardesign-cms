import { useState, useEffect } from 'react';

export interface Client {
  id: string;
  name: string;
  sector: string;
}

export interface ClientFormData {
  name: string;
  sector: string;
}

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    try {
      const response = await fetch(
        'https://gist.githubusercontent.com/TusharSahu02/117e211ec2dab089e7efca3b945fb3d0/raw/karrar-patners.json'
      );
      const data = await response.json();
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const addClient = async (client: ClientFormData) => {
    const response = await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client),
    });
    const data = await response.json();
    if (data.success) {
      setClients(data.clients);
      return true;
    }
    throw new Error(data.error);
  };

  const updateClient = async (id: string, client: ClientFormData) => {
    const response = await fetch('/api/clients', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...client }),
    });
    const data = await response.json();
    if (data.success) {
      setClients(data.clients);
      return true;
    }
    throw new Error(data.error);
  };

  const deleteClient = async (id: string) => {
    const response = await fetch('/api/clients', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    if (data.success) {
      setClients(data.clients);
      return true;
    }
    throw new Error(data.error);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    loading,
    addClient,
    updateClient,
    deleteClient,
  };
};