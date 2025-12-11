import { useState, useEffect } from "react";

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  description: string;
}

export interface TestimonialFormData {
  quote: string;
  name: string;
  description: string;
}

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(
        `https://gist.githubusercontent.com/TusharSahu02/6cf3a9f4c0b75370ab1f03d27747476a/raw/karrar-testimonials.json?t=${Date.now()}`
      );
      const data = await response.json();
      setTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTestimonial = async (testimonial: TestimonialFormData) => {
    const response = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testimonial),
    });
    const data = await response.json();
    if (data.success) {
      setTestimonials(data.testimonials);
      return true;
    }
    throw new Error(data.error);
  };

  const updateTestimonial = async (
    id: string,
    testimonial: TestimonialFormData
  ) => {
    const response = await fetch("/api/testimonials", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...testimonial }),
    });
    const data = await response.json();
    if (data.success) {
      setTestimonials(data.testimonials);
      return true;
    }
    throw new Error(data.error);
  };

  const deleteTestimonial = async (id: string) => {
    const response = await fetch("/api/testimonials", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    if (data.success) {
      setTestimonials(data.testimonials);
      return true;
    }
    throw new Error(data.error);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return {
    testimonials,
    loading,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
  };
};
