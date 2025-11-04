// Map status values to their Notion colors
export const getStatusColor = (status: string): string => {
  switch (status) {
    case "Not Enterprise Viable":
      return "bg-red-100 text-red-800 border-red-200";
    case "Watchlist":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "Emerging":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Active":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Feature Risk":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "Deferred":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "Adopted":
      return "bg-green-100 text-green-800 border-green-200";
    case "Reviewed":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-slate-100 text-slate-800 border-slate-200";
  }
};
