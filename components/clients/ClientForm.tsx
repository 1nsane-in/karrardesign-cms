import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ClientFormData } from '@/hooks/useClients';

interface ClientFormProps {
  onSubmit: (data: ClientFormData) => Promise<void>;
  initialData?: ClientFormData;
  submitLabel?: string;
  isLoading?: boolean;
}

const INITIAL_FORM_STATE: ClientFormData = {
  name: '',
  sector: '',
};

export const ClientForm = ({
  onSubmit,
  initialData = INITIAL_FORM_STATE,
  submitLabel = 'Add Client',
  isLoading = false,
}: ClientFormProps) => {
  const [formData, setFormData] = useState<ClientFormData>(initialData);

  const isFormValid = formData.name.trim() && formData.sector.trim();

  const handleSubmit = async () => {
    if (!isFormValid) return;
    
    try {
      await onSubmit(formData);
      setFormData(INITIAL_FORM_STATE);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const updateField = (field: keyof ClientFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Client Name
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={updateField('name')}
            placeholder="Enter client name"
            className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <Label htmlFor="sector" className="text-sm font-medium text-gray-700">
            Sector
          </Label>
          <Input
            id="sector"
            value={formData.sector}
            onChange={updateField('sector')}
            placeholder="Enter client sector"
            className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      <Button
        onClick={handleSubmit}
        disabled={!isFormValid || isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
      >
        {isLoading ? 'Processing...' : `+ ${submitLabel}`}
      </Button>
    </div>
  );
};