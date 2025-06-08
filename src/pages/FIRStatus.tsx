
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, Search, Clock, CheckCircle, AlertCircle, FileText, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const FIRStatus = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [firData, setFirData] = useState(null);

  // Mock FIR data
  const mockFirData = {
    id: "FIR202400001",
    status: "Under Review",
    complainant: "Raj Kumar",
    type: "Theft",
    date: "2024-06-08",
    time: "14:30",
    location: "MG Road, Bangalore",
    description: "Mobile phone stolen from metro station",
    filedDate: "2024-06-08T14:45:00Z",
    lastUpdated: "2024-06-08T16:20:00Z",
    officerAssigned: "Inspector Sharma",
    station: "MG Road Police Station",
    timeline: [
      {
        status: "Filed",
        timestamp: "2024-06-08T14:45:00Z",
        description: "FIR filed successfully on blockchain",
        completed: true
      },
      {
        status: "Acknowledged",
        timestamp: "2024-06-08T15:30:00Z",
        description: "FIR acknowledged by police station",
        completed: true
      },
      {
        status: "Under Review",
        timestamp: "2024-06-08T16:20:00Z",
        description: "Case assigned to investigating officer",
        completed: true
      },
      {
        status: "Investigation",
        timestamp: null,
        description: "Investigation in progress",
        completed: false
      },
      {
        status: "Resolved",
        timestamp: null,
        description: "Case resolved and closed",
        completed: false
      }
    ]
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Query Required",
        description: "Please enter a FIR ID or wallet address",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, show mock data for any search
      setFirData(mockFirData);
      
      toast({
        title: "FIR Found",
        description: "FIR details retrieved successfully",
      });
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Could not find FIR with the provided ID",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "filed":
      case "acknowledged":
      case "under review":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "investigation":
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case "resolved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "filed":
        return "bg-blue-100 text-blue-800";
      case "acknowledged":
        return "bg-purple-100 text-purple-800";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">DigitalFIR</h1>
                <p className="text-sm text-gray-600">Track FIR Status</p>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/file-fir" className="text-gray-700 hover:text-blue-600 transition-colors">File FIR</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Check FIR Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="search">FIR ID or Wallet Address</Label>
                <Input
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter FIR ID (e.g., FIR202400001) or wallet address"
                  className="mt-2"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FIR Details */}
        {firData && (
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    FIR Details
                  </span>
                  <Badge className={getStatusColor(firData.status)}>
                    {getStatusIcon(firData.status)}
                    <span className="ml-2">{firData.status}</span>
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">FIR ID</Label>
                      <p className="text-lg font-semibold">{firData.id}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Complainant</Label>
                      <p>{firData.complainant}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Complaint Type</Label>
                      <p>{firData.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{firData.date} at {firData.time}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Investigating Officer</Label>
                      <p>{firData.officerAssigned}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Police Station</Label>
                      <p>{firData.station}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{firData.location}</span>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Last Updated</Label>
                      <p>{new Date(firData.lastUpdated).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <Separator className="my-6" />
                <div>
                  <Label className="text-sm font-medium text-gray-500">Description</Label>
                  <p className="mt-2 text-gray-700">{firData.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Status Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {firData.timeline.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-blue-600' : 'bg-gray-300'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="h-4 w-4 text-white" />
                        ) : (
                          <div className={`w-3 h-3 rounded-full ${step.completed ? 'bg-white' : 'bg-gray-500'}`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                            {step.status}
                          </h4>
                          {step.timestamp && (
                            <span className="text-sm text-gray-500">
                              {new Date(step.timestamp).toLocaleString()}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm ${step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                          {step.description}
                        </p>
                        {index < firData.timeline.length - 1 && (
                          <div className={`w-px h-6 ml-4 mt-2 ${step.completed ? 'bg-blue-200' : 'bg-gray-200'}`} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default FIRStatus;
