interface ClientStatsProps {
  count: number;
}

export const ClientStats = ({ count }: ClientStatsProps) => (
  <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
    <span className="text-blue-700 font-semibold">{count}</span>
    <span className="text-blue-600 text-sm ml-1">Total Clients</span>
  </div>
);