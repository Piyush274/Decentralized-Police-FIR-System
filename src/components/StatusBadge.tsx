
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, FileText } from "lucide-react";

interface StatusBadgeProps {
  status: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export const StatusBadge = ({ status, size = "md", showIcon = true }: StatusBadgeProps) => {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "filed":
        return {
          color: "bg-blue-100 text-blue-800",
          icon: <FileText className="h-3 w-3" />
        };
      case "acknowledged":
        return {
          color: "bg-purple-100 text-purple-800",
          icon: <CheckCircle className="h-3 w-3" />
        };
      case "under review":
        return {
          color: "bg-yellow-100 text-yellow-800",
          icon: <Clock className="h-3 w-3" />
        };
      case "investigation":
        return {
          color: "bg-orange-100 text-orange-800",
          icon: <AlertCircle className="h-3 w-3" />
        };
      case "resolved":
        return {
          color: "bg-green-100 text-green-800",
          icon: <CheckCircle className="h-3 w-3" />
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: <Clock className="h-3 w-3" />
        };
    }
  };

  const config = getStatusConfig(status);
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2"
  };

  return (
    <Badge className={`${config.color} ${sizeClasses[size]} flex items-center gap-1`}>
      {showIcon && config.icon}
      <span>{status}</span>
    </Badge>
  );
};
