import { Testimonial, TestimonialFormData } from '@/hooks/useTestimonials';
import { TestimonialCard } from './TestimonialCard';

interface TestimonialGridProps {
  testimonials: Testimonial[];
  onUpdate: (id: string, data: TestimonialFormData) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  deletingId?: string | null;
}

export const TestimonialGrid = ({
  testimonials,
  onUpdate,
  onDelete,
  deletingId,
}: TestimonialGridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {testimonials.map((testimonial, index) => (
      <TestimonialCard
        key={testimonial.id || `${testimonial.name}-${index}`}
        testimonial={testimonial}
        onUpdate={onUpdate}
        onDelete={onDelete}
        isDeleting={deletingId === testimonial.id}
      />
    ))}
  </div>
);