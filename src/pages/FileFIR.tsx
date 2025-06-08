
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Upload, Wallet, Info, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const FileFIR = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    aadhar: "",
    address: "",
    complaintType: "",
    incidentDate: "",
    incidentTime: "",
    location: "",
    description: "",
    evidence: null as File | null
  });

  const complaintTypes = [
    "Theft",
    "Fraud",
    "Assault",
    "Harassment",
    "Cybercrime",
    "Property Dispute",
    "Missing Person",
    "Traffic Violation",
    "Domestic Violence",
    "Other"
  ];

  const handleConnectWallet = async () => {
    try {
      // Placeholder for MetaMask connection
      console.log("Connecting to MetaMask...");
      setIsConnected(true);
      toast({
        title: "Wallet Connected",
        description: "MetaMask wallet connected successfully",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet before submitting",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Placeholder for blockchain submission
      console.log("Submitting FIR to blockchain...", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "FIR Submitted Successfully",
        description: "Your FIR has been recorded on the blockchain. FIR ID: #FIR202400001",
      });
      
      // Reset form
      setFormData({
        name: "", aadhar: "", address: "", complaintType: "",
        incidentDate: "", incidentTime: "", location: "", description: "", evidence: null
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Failed to submit FIR. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 10MB",
          variant: "destructive"
        });
        return;
      }
      setFormData(prev => ({ ...prev, evidence: file }));
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
                <p className="text-sm text-gray-600">File New Complaint</p>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/status" className="text-gray-700 hover:text-blue-600 transition-colors">Check Status</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Wallet Connection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Wallet Connection
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!isConnected ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Connect your MetaMask wallet to file an FIR</p>
                  <p className="text-sm text-gray-500">Your identity will be verified through blockchain</p>
                </div>
                <Button onClick={handleConnectWallet} className="bg-orange-500 hover:bg-orange-600">
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect MetaMask
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Badge variant="default" className="bg-green-100 text-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Wallet Connected
                </Badge>
                <span className="text-gray-600">0x1234...abcd</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* FIR Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              File First Information Report (FIR)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aadhar" className="flex items-center gap-2">
                    Aadhar Number *
                    <div className="group relative">
                      <Info className="h-4 w-4 text-gray-400 cursor-help" />
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Will be hashed for privacy
                      </div>
                    </div>
                  </Label>
                  <Input
                    id="aadhar"
                    value={formData.aadhar}
                    onChange={(e) => setFormData(prev => ({ ...prev, aadhar: e.target.value }))}
                    required
                    placeholder="XXXX-XXXX-XXXX"
                    maxLength={14}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  required
                  placeholder="Enter your complete address"
                  rows={3}
                />
              </div>

              {/* Incident Details */}
              <div className="space-y-2">
                <Label htmlFor="complaintType">Type of Complaint *</Label>
                <Select value={formData.complaintType} onValueChange={(value) => setFormData(prev => ({ ...prev, complaintType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select complaint type" />
                  </SelectTrigger>
                  <SelectContent>
                    {complaintTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="incidentDate">Date of Incident *</Label>
                  <Input
                    id="incidentDate"
                    type="date"
                    value={formData.incidentDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, incidentDate: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="incidentTime">Time of Incident *</Label>
                  <Input
                    id="incidentTime"
                    type="time"
                    value={formData.incidentTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, incidentTime: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location of Incident *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  required
                  placeholder="Enter the location where incident occurred"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description of Incident *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  placeholder="Provide detailed description of the incident..."
                  rows={6}
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="evidence">Evidence (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-2">Upload images, documents, or videos as evidence</p>
                  <p className="text-sm text-gray-500 mb-4">Supported formats: PDF, JPG, PNG, MP4 (Max 10MB)</p>
                  <Input
                    id="evidence"
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png,.mp4"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('evidence')?.click()}
                  >
                    Choose File
                  </Button>
                  {formData.evidence && (
                    <p className="text-sm text-green-600 mt-2">
                      Selected: {formData.evidence.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Privacy Notice */}
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Your personal information will be encrypted and stored securely on the blockchain. 
                  Only authorized personnel will have access to your FIR details.
                </AlertDescription>
              </Alert>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!isConnected || isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting to Blockchain...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Submit FIR
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FileFIR;
