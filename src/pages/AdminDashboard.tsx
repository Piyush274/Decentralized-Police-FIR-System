
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Search, Filter, Calendar, Users, FileText, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isConnected, setIsConnected] = useState(false);

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

  const filteredFIRs = mockFIRs.filter(fir => {
    const matchesSearch = fir.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         fir.complainant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || fir.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <CardTitle>Admin Access Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Connect your authorized wallet to access the admin dashboard
            </p>
            <Button 
              onClick={handleConnectWallet}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Connect Admin Wallet
            </Button>
            <Link to="/" className="block">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">DigitalFIR Admin</h1>
                <p className="text-sm text-gray-600">Police Administration Portal</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Badge variant="default" className="bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Admin Connected
              </Badge>
              <nav className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
                <Link to="/file-fir" className="text-gray-700 hover:text-blue-600 transition-colors">File FIR</Link>
                <Link to="/status" className="text-gray-700 hover:text-blue-600 transition-colors">Check Status</Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total FIRs</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalFIRs}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Under Review</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.underReview}</p>
                </div>
                <Users className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              FIR Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by FIR ID or complainant name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="filed">Filed</SelectItem>
                  <SelectItem value="under review">Under Review</SelectItem>
                  <SelectItem value="investigation">Investigation</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full md:w-auto">
                <Search className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* FIRs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent FIRs ({filteredFIRs.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>FIR ID</TableHead>
                    <TableHead>Complainant</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Officer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFIRs.map((fir) => (
                    <TableRow key={fir.id}>
                      <TableCell className="font-medium">{fir.id}</TableCell>
                      <TableCell>{fir.complainant}</TableCell>
                      <TableCell>{fir.type}</TableCell>
                      <TableCell>{fir.date}</TableCell>
                      <TableCell className="max-w-48 truncate">{fir.location}</TableCell>
                      <TableCell>{fir.officer}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(fir.status)}>
                          {fir.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={fir.status}
                          onValueChange={(value) => handleStatusUpdate(fir.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
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
              <div className="text-center py-8 text-gray-500">
                No FIRs found matching your criteria
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
