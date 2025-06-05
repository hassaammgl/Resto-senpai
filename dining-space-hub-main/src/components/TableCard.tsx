
import { cn } from "@/lib/utils";
import { Users, Clock } from "lucide-react";

interface TableCardProps {
  number: number;
  capacity: number;
  status: "available" | "occupied" | "reserved";
  occupiedSince?: string;
  reservedFor?: string;
}

const TableCard = ({ number, capacity, status, occupiedSince, reservedFor }: TableCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-50 border-green-200 text-green-800";
      case "occupied": return "bg-red-50 border-red-200 text-red-800";
      case "reserved": return "bg-yellow-50 border-yellow-200 text-yellow-800";
      default: return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  return (
    <div className={cn(
      "rounded-lg border-2 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer",
      getStatusColor(status)
    )}>
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Table {number}</h3>
        <div className="flex items-center justify-center gap-1 mb-3">
          <Users className="h-4 w-4" />
          <span className="text-sm">{capacity} seats</span>
        </div>
        
        <div className="text-xs uppercase font-semibold tracking-wide mb-2">
          {status}
        </div>
        
        {occupiedSince && (
          <div className="flex items-center justify-center gap-1 text-xs">
            <Clock className="h-3 w-3" />
            <span>Since {occupiedSince}</span>
          </div>
        )}
        
        {reservedFor && (
          <div className="text-xs">
            Reserved for {reservedFor}
          </div>
        )}
      </div>
    </div>
  );
};

export default TableCard;
