interface TestimonialStatsProps {
  count: number;
}

export const TestimonialStats = ({ count }: TestimonialStatsProps) => (
  <div className="bg-purple-50 px-4 py-2 rounded-lg border border-purple-200">
    <span className="text-purple-700 font-semibold">{count}</span>
    <span className="text-purple-600 text-sm ml-1">Total Testimonials</span>
  </div>
);