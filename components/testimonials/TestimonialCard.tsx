import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Testimonial, TestimonialFormData } from '@/hooks/useTestimonials';
import { TestimonialForm } from './TestimonialForm';

interface TestimonialCardProps {
  testimonial: Testimonial;
  onUpdate: (id: string, data: TestimonialFormData) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isDeleting?: boolean;
}

export const TestimonialCard = ({
  testimonial,
  onUpdate,
  onDelete,
  isDeleting = false,
}: TestimonialCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (data: TestimonialFormData) => {
    setIsUpdating(true);
    try {
      await onUpdate(testimonial.id, data);
      setIsEditing(false);
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(testimonial.id);
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  if (isEditing) {
    return (
      <Card className="group hover:shadow-lg transition-all duration-200 shadow-sm border bg-white rounded-xl overflow-hidden">
        <CardContent>
          <TestimonialForm
            onSubmit={handleUpdate}
            initialData={{
              quote: testimonial.quote,
              name: testimonial.name,
              description: testimonial.description,
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
    <Card className="group hover:shadow-lg transition-all duration-200 shadow-sm border bg-white rounded-xl overflow-hidden">
      <CardContent>
        <div className="mb-3">
          <p className="text-gray-700 italic text-sm leading-relaxed mb-3">
            "{testimonial.quote}"
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
          </div>
          <p className="text-sm text-gray-600 mt-1">{testimonial.description}</p>
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
            className="border-purple-200 text-purple-600 hover:bg-purple-50 px-3 py-1 text-xs"
          >
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};