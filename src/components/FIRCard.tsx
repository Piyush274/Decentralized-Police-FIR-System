
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, User, FileText } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface FIRCardProps {
  fir: {
    id: string;
    complainant: string;
    type: string;
    date: string;
    location: string;
    status: string;
    description?: string;
  };
  onViewDetails?: (firId: string) => void;
  onUpdateStatus?: (firId: string, newStatus: string) => void;
  showActions?: boolean;
}

export const FIRCard = ({ fir, onViewDetails, onUpdateStatus, showActions = false }: FIRCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "filed":
        return "bg-blue-100 text-blue-800";
      case "under review":
        return "bg-yellow-100 text-yellow-800";
      case "investigation":
        return "bg-orange-100 text-orange-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{fir.id}</CardTitle>
          <Badge className={getStatusColor(fir.status)}>
            {fir.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="h-4 w-4" />
          <span>{fir.complainant}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FileText className="h-4 w-4" />
          <span>{fir.type}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(fir.date)}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span className="truncate">{fir.location}</span>
        </div>
        
        {fir.description && (
          <p className="text-sm text-gray-700 line-clamp-2">
            {fir.description}
          </p>
        )}
        
        {showActions && (
          <div className="flex gap-2 pt-3">
            {onViewDetails && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(fir.id)}
                className="flex-1"
              >
                View Details
              </Button>
            )}
            {onUpdateStatus && (
              <Button
                size="sm"
                onClick={() => onUpdateStatus(fir.id, "Investigation")}
                className="flex-1"
              >
                Update Status
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
