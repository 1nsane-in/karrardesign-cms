import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TestimonialFormData } from '@/hooks/useTestimonials';

interface TestimonialFormProps {
  onSubmit: (data: TestimonialFormData) => Promise<void>;
  initialData?: TestimonialFormData;
  submitLabel?: string;
  isLoading?: boolean;
}

const INITIAL_FORM_STATE: TestimonialFormData = {
  quote: '',
  name: '',
  description: '',
};

export const TestimonialForm = ({
  onSubmit,
  initialData = INITIAL_FORM_STATE,
  submitLabel = 'Add Testimonial',
  isLoading = false,
}: TestimonialFormProps) => {
  const [formData, setFormData] = useState<TestimonialFormData>(initialData);

  const isFormValid = formData.quote.trim() && formData.name.trim() && formData.description.trim();

  const handleSubmit = async () => {
    if (!isFormValid) return;
    
    try {
      await onSubmit(formData);
      setFormData(INITIAL_FORM_STATE);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const updateField = (field: keyof TestimonialFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="quote" className="text-sm font-medium text-gray-700">
          Quote
        </Label>
        <Textarea
          id="quote"
          value={formData.quote}
          onChange={updateField('quote')}
          placeholder="Enter testimonial quote"
          className="mt-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          rows={3}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={updateField('name')}
            placeholder="Enter client name"
            className="mt-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div>
          <Label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description
          </Label>
          <Input
            id="description"
            value={formData.description}
            onChange={updateField('description')}
            placeholder="Enter client description/title"
            className="mt-1 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
      </div>
      <Button
        onClick={handleSubmit}
        disabled={!isFormValid || isLoading}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
      >
        {isLoading ? 'Processing...' : `+ ${submitLabel}`}
      </Button>
    </div>
  );
};