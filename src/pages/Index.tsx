import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, FileText, Search, Clock, Lock, AlertCircle, CheckCircle, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Immutable Records",
      description: "All FIRs are stored on blockchain, making them tamper-proof and permanent"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Complete Transparency",
      description: "Real-time tracking of your FIR status with full audit trail"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "24/7 Accessibility",
      description: "File complaints anytime from anywhere without physical visits"
    },
    {
      icon: <AlertCircle className="h-6 w-6" />,
      title: "Instant Notification",
      description: "Get SMS/email alerts for all status updates on your case"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Verified Identity",
      description: "Secure authentication via Aadhaar and blockchain wallet"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Geo-Tagged Reports",
      description: "Automatic location tagging for accurate incident reporting"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">DigitalFIR</h1>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Home
              </Link>
              <Link to="/file-fir" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                File FIR
              </Link>
              <Link to="/status" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Track Status
              </Link>
              <Link to="/admin" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Police Portal
              </Link>
            </nav>
            <div className="md:hidden">
              {/* Mobile menu button would go here */}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <Badge variant="outline" className="mb-6 border-purple-200 bg-purple-50 text-purple-600">
            <Shield className="h-4 w-4 mr-2" />
            Blockchain-Powered Security
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Revolutionizing <span className="text-purple-600">Police Reporting</span><br />with Blockchain Technology
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Decentralized FIR system ensuring transparency, security, and efficiency in law enforcement processes. 
            Empowering citizens with direct access to police services.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/file-fir">
              <Button size="lg" className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-100">
                <FileText className="h-5 w-5 mr-2" />
                File an FIR Now
              </Button>
            </Link>
            <Link to="/status">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-purple-300 text-purple-600 hover:bg-purple-50">
                <Search className="h-5 w-5 mr-2" />
                Track Existing FIR
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why DigitalFIR is Different
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our blockchain-based system addresses the key challenges in traditional FIR processes
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow border-purple-50 hover:border-purple-100">
              <CardHeader>
                <div className="mx-auto w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold">5,247</div>
              <div className="text-purple-100">FIRs Processed</div>
            </div>
            <div>
              <div className="text-4xl font-bold">3.2k</div>
              <div className="text-purple-100">Cases Resolved</div>
            </div>
            <div>
              <div className="text-4xl font-bold">42</div>
              <div className="text-purple-100">Police Stations</div>
            </div>
            <div>
              <div className="text-4xl font-bold">99.97%</div>
              <div className="text-purple-100">System Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Citizens Are Saying
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from people who have used DigitalFIR system
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote: "Filed my FIR in 10 minutes without visiting the station. Got updates via SMS regularly.",
              author: "Rajesh Kumar, Delhi"
            },
            {
              quote: "The transparency gave me confidence that my complaint wouldn't get lost in the system.",
              author: "Priya Sharma, Bangalore"
            },
            {
              quote: "As a senior citizen, this digital system has been a blessing for me.",
              author: "S. Iyer, Chennai"
            }
          ].map((testimonial, index) => (
            <Card key={index} className="border-purple-100">
              <CardContent className="pt-6">
                <div className="mb-4 text-purple-600">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <p className="text-gray-900 font-medium">{testimonial.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to File Your FIR?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of citizens who are using DigitalFIR for secure, transparent police reporting
          </p>
          <Link to="/file-fir">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-100 px-8">
              <FileText className="h-5 w-5 mr-2" />
              File Your FIR Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-6 w-6 text-purple-400" />
                <span className="text-lg font-semibold">DigitalFIR</span>
              </div>
              <p className="text-gray-400 mb-4">
                Blockchain-based FIR system.
              </p>
              <div className="flex items-center text-gray-400 text-sm mt-2">
                <Heart className="h-4 w-4 mr-1 text-red-400" />
                Made by Piyush Sangam
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/file-fir" className="hover:text-white transition-colors">File FIR</Link></li>
                <li><Link to="/status" className="hover:text-white transition-colors">Track Status</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Knowledge Base</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">FAQs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Disclaimer</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Emergency: 100/112</li>
                <li>Support: help@digitalfir.gov.in</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} DigitalFIR, All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;