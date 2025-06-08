import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Search, Filter, Calendar, Users, FileText, AlertCircle, Home, ArrowLeft, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  // Mock admin data
  const mockFIRs = [
    {
      id: "FIR202400001",
      complainant: "Raj Kumar",
      type: "Theft",
      date: "2024-06-08",
      location: "MG Road, Bangalore",
      status: "Under Review",
      officer: "Inspector Sharma"
    },
    {
      id: "FIR202400002",
      complainant: "Priya Singh",
      type: "Fraud",
      date: "2024-06-07",
      location: "Koramangala, Bangalore",
      status: "Investigation",
      officer: "Inspector Patel"
    },
    {
      id: "FIR202400003",
      complainant: "Amit Gupta",
      type: "Assault",
      date: "2024-06-06",
      location: "Whitefield, Bangalore",
      status: "Resolved",
      officer: "Inspector Kumar"
    },
    {
      id: "FIR202400004",
      complainant: "Sunita Devi",
      type: "Harassment",
      date: "2024-06-05",
      location: "Indiranagar, Bangalore",
      status: "Filed",
      officer: "Not Assigned"
    }
  ];

  const stats = {
    totalFIRs: 1247,
    pending: 342,
    underReview: 198,
    resolved: 707
  };

  const handleConnectWallet = async () => {
    try {
      console.log("Connecting admin wallet...");
      setIsConnected(true);
      toast({
        title: "Admin Access Granted",
        description: "Connected as authorized administrator",
      });
    } catch (error) {
      toast({
        title: "Access Denied",
        description: "Only authorized wallets can access admin dashboard",
        variant: "destructive"
      });
    }
  };

  const handleStatusUpdate = async (firId: string, newStatus: string) => {
    try {
      console.log(`Updating FIR ${firId} to status: ${newStatus}`);
      
      toast({
        title: "Status Updated",
        description: `FIR ${firId} status changed to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update FIR status",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "filed":
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

  const filteredFIRs = mockFIRs.filter(fir => {
    const matchesSearch = fir.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         fir.complainant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || fir.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center">
        <Card className="w-full max-w-md border-purple-100 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 mb-4">
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle className="text-2xl">Admin Access Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Connect your authorized wallet to access the DigitalFIR admin dashboard
            </p>
            <Button 
              onClick={handleConnectWallet}
              className="w-full bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-100"
            >
              Connect Admin Wallet
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-purple-300 text-purple-600 hover:bg-purple-50"
              onClick={() => navigate("/")}
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">DigitalFIR Admin</h1>
                <p className="text-sm text-gray-600">Police Administration Portal</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-green-200 bg-green-50 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Admin Connected
              </Badge>
              <nav className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Home</Link>
                <Link to="/file-fir" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">File FIR</Link>
                <Link to="/status" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Check Status</Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-purple-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total FIRs</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.totalFIRs}</p>
                </div>
                <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-purple-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-purple-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Under Review</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.underReview}</p>
                </div>
                <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-purple-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
                </div>
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6 border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-purple-600" />
              FIR Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by FIR ID or complainant name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48 border-purple-300">
                  <SelectValue placeholder="Filter by status" />
                  <ChevronDown className="h-4 w-4 text-purple-600" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="filed">Filed</SelectItem>
                  <SelectItem value="under review">Under Review</SelectItem>
                  <SelectItem value="investigation">Investigation</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full md:w-auto border-purple-300 text-purple-600 hover:bg-purple-50">
                <FileText className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* FIRs Table */}
        <Card className="border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div>
                Recent FIRs <span className="text-purple-600">({filteredFIRs.length})</span>
              </div>
              <Link to='/file-fir'>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <FileText className="h-4 w-4 mr-2" />
                New FIR
              </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-purple-600">FIR ID</TableHead>
                    <TableHead className="text-purple-600">Complainant</TableHead>
                    <TableHead className="text-purple-600">Type</TableHead>
                    <TableHead className="text-purple-600">Date</TableHead>
                    <TableHead className="text-purple-600">Location</TableHead>
                    <TableHead className="text-purple-600">Officer</TableHead>
                    <TableHead className="text-purple-600">Status</TableHead>
                    <TableHead className="text-purple-600">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFIRs.map((fir) => (
                    <TableRow key={fir.id} className="hover:bg-purple-50">
                      <TableCell className="font-medium">{fir.id}</TableCell>
                      <TableCell>{fir.complainant}</TableCell>
                      <TableCell>{fir.type}</TableCell>
                      <TableCell>{fir.date}</TableCell>
                      <TableCell className="max-w-48 truncate">{fir.location}</TableCell>
                      <TableCell>
                        {fir.officer === "Not Assigned" ? (
                          <Badge variant="outline" className="border-gray-300 text-gray-600">
                            {fir.officer}
                          </Badge>
                        ) : (
                          fir.officer
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(fir.status)} px-3 py-1 rounded-full`}>
                          {fir.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={fir.status}
                          onValueChange={(value) => handleStatusUpdate(fir.id, value)}
                        >
                          <SelectTrigger className="w-32 border-purple-300">
                            <SelectValue />
                            <ChevronDown className="h-4 w-4 text-purple-600" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Filed">Filed</SelectItem>
                            <SelectItem value="Under Review">Under Review</SelectItem>
                            <SelectItem value="Investigation">Investigation</SelectItem>
                            <SelectItem value="Resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredFIRs.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <AlertCircle className="h-8 w-8 mx-auto mb-4 text-gray-400" />
                <p className="text-lg">No FIRs found matching your criteria</p>
                <Button 
                  variant="ghost" 
                  className="mt-4 text-purple-600 hover:bg-purple-50"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer Attribution */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p className="mt-1 text-xs text-gray-400">
            Made by Piyush Sangam with love
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;