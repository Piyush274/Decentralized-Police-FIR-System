import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Upload, Wallet, Info, FileText, ChevronRight, Loader2, CheckCircle } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-[#5F259F] p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">DigitalFIR</h1>
                <p className="text-sm text-gray-600">Blockchain Security</p>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-1">
              <Link 
                to="/" 
                className="px-4 py-2 text-gray-700 hover:text-[#5F259F] transition-colors font-medium rounded-lg hover:bg-purple-50"
              >
                Home
              </Link>
              <Link 
                to="/status" 
                className="px-4 py-2 text-gray-700 hover:text-[#5F259F] transition-colors font-medium rounded-lg hover:bg-purple-50"
              >
                Track Status
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="flex flex-col items-center relative z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isConnected ? 'bg-[#5F259F] text-white' : 'bg-[#5F259F]/10 text-[#5F259F]'}`}>
              {isConnected ? <CheckCircle className="h-5 w-5" /> : <Wallet className="h-5 w-5" />}
            </div>
            <span className={`text-sm mt-2 ${isConnected ? 'text-[#5F259F] font-medium' : 'text-gray-500'}`}>Wallet</span>
          </div>
          <div className="flex-1 h-1 bg-gray-200 mx-2 relative">
            <div className={`absolute top-0 left-0 h-full ${isConnected ? 'bg-[#5F259F]' : 'bg-gray-200'}`} style={{ width: isConnected ? '100%' : '0%' }}></div>
          </div>
          <div className="flex flex-col items-center relative z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isSubmitting ? 'bg-[#5F259F] text-white' : 'bg-[#5F259F]/10 text-[#5F259F]'}`}>
              {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileText className="h-5 w-5" />}
            </div>
            <span className={`text-sm mt-2 ${isSubmitting ? 'text-[#5F259F] font-medium' : 'text-gray-500'}`}>FIR Details</span>
          </div>
        </div>

        {/* Wallet Connection */}
        <Card className="mb-8 border border-gray-200 hover:border-[#5F259F]/30 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="bg-[#5F259F]/10 p-2 rounded-full">
                <Wallet className="h-5 w-5 text-[#5F259F]" />
              </div>
              Wallet Connection
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!isConnected ? (
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <p className="text-gray-600">Connect your wallet to file an FIR</p>
                  <p className="text-sm text-gray-500">Your identity will be verified through blockchain</p>
                </div>
                <Button 
                  onClick={handleConnectWallet} 
                  className="bg-[#5F259F] hover:bg-[#4a1d7c] px-6"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-100 text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Wallet Connected
                  </Badge>
                  <span className="text-gray-600 font-mono">0x1234...abcd</span>
                </div>
                <Button variant="outline" className="border-[#5F259F] text-[#5F259F] hover:bg-[#5F259F]/10">
                  Change Wallet
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* FIR Form */}
        <Card className="border border-gray-200 hover:border-[#5F259F]/30 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="bg-[#5F259F]/10 p-2 rounded-full">
                <FileText className="h-5 w-5 text-[#5F259F]" />
              </div>
              File First Information Report (FIR)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#5F259F] mr-1" />
                  Personal Information
                </h3>
                <p className="text-sm text-gray-500 mb-4">Enter your personal details for verification</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    placeholder="Enter your full name"
                    className="focus:ring-[#5F259F] focus:border-[#5F259F]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aadhar" className="flex items-center gap-2">
                    Aadhar Number <span className="text-red-500">*</span>
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
                    className="focus:ring-[#5F259F] focus:border-[#5F259F]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  required
                  placeholder="Enter your complete address"
                  rows={3}
                  className="focus:ring-[#5F259F] focus:border-[#5F259F]"
                />
              </div>

              {/* Incident Details */}
              <div className="space-y-1 mt-8">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#5F259F] mr-1" />
                  Incident Details
                </h3>
                <p className="text-sm text-gray-500 mb-4">Provide details about the incident</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="complaintType">Type of Complaint <span className="text-red-500">*</span></Label>
                <Select 
                  value={formData.complaintType} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, complaintType: value }))}
                >
                  <SelectTrigger className="focus:ring-[#5F259F] focus:border-[#5F259F]">
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
                  <Label htmlFor="incidentDate">Date of Incident <span className="text-red-500">*</span></Label>
                  <Input
                    id="incidentDate"
                    type="date"
                    value={formData.incidentDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, incidentDate: e.target.value }))}
                    required
                    className="focus:ring-[#5F259F] focus:border-[#5F259F]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="incidentTime">Time of Incident <span className="text-red-500">*</span></Label>
                  <Input
                    id="incidentTime"
                    type="time"
                    value={formData.incidentTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, incidentTime: e.target.value }))}
                    required
                    className="focus:ring-[#5F259F] focus:border-[#5F259F]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location of Incident <span className="text-red-500">*</span></Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  required
                  placeholder="Enter the location where incident occurred"
                  className="focus:ring-[#5F259F] focus:border-[#5F259F]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description of Incident <span className="text-red-500">*</span></Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  placeholder="Provide detailed description of the incident..."
                  rows={6}
                  className="focus:ring-[#5F259F] focus:border-[#5F259F]"
                />
              </div>

              {/* File Upload */}
              <div className="space-y-1 mt-8">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <ChevronRight className="h-5 w-5 text-[#5F259F] mr-1" />
                  Supporting Evidence
                </h3>
                <p className="text-sm text-gray-500 mb-4">Upload any relevant files to support your case</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="evidence">Evidence (Optional)</Label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    formData.evidence 
                      ? 'border-[#5F259F] bg-[#5F259F]/5' 
                      : 'border-gray-300 hover:border-[#5F259F]/50 hover:bg-[#5F259F]/5'
                  }`}
                >
                  <Upload className={`h-8 w-8 mx-auto mb-2 ${
                    formData.evidence ? 'text-[#5F259F]' : 'text-gray-400'
                  }`} />
                  <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
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
                    className="border-[#5F259F] text-[#5F259F] hover:bg-[#5F259F]/10"
                  >
                    Choose File
                  </Button>
                  {formData.evidence && (
                    <div className="mt-4 p-3 bg-[#5F259F]/10 rounded-lg flex items-center justify-between">
                      <span className="text-sm text-[#5F259F] truncate max-w-xs">
                        {formData.evidence.name}
                      </span>
                      <button 
                        type="button" 
                        onClick={() => setFormData(prev => ({ ...prev, evidence: null }))}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Privacy Notice */}
              <Alert className="border-[#5F259F]/30 bg-[#5F259F]/5">
                <Shield className="h-5 w-5 text-[#5F259F]" />
                <AlertDescription className="text-gray-700">
                  Your personal information will be encrypted and stored securely on the blockchain. 
                  Only authorized personnel will have access to your FIR details.
                </AlertDescription>
              </Alert>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!isConnected || isSubmitting}
                className="w-full bg-[#5F259F] hover:bg-[#4a1d7c] py-6 text-lg"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Submitting to Blockchain...
                  </>
                ) : (
                  <>
                    <FileText className="h-5 w-5 mr-2" />
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