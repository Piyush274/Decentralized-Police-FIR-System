
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, FileText, Search, Users, Clock, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Tamper-proof",
      description: "Records stored on blockchain cannot be altered or deleted"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Transparent",
      description: "Track your FIR status in real-time with complete transparency"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Accessible 24/7",
      description: "File complaints anytime, anywhere without visiting police stations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">DigitalFIR</h1>
                <p className="text-sm text-gray-600">Government of India</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/file-fir" className="text-gray-700 hover:text-blue-600 transition-colors">
                File FIR
              </Link>
              <Link to="/status" className="text-gray-700 hover:text-blue-600 transition-colors">
                Check Status
              </Link>
              <Link to="/admin" className="text-gray-700 hover:text-blue-600 transition-colors">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            <Shield className="h-4 w-4 mr-2" />
            Powered by Blockchain Technology
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Decentralized Police
            <span className="text-blue-600 block">FIR System</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A transparent, tamper-proof system for filing and tracking First Information Reports. 
            Built on blockchain technology to ensure integrity and accessibility for all Indian citizens.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/file-fir">
              <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                <FileText className="h-5 w-5 mr-2" />
                File an FIR
              </Button>
            </Link>
            <Link to="/status">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Search className="h-5 w-5 mr-2" />
                Check FIR Status
              </Button>
            </Link>
            <Link to="/admin">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <Users className="h-5 w-5 mr-2" />
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Digital FIR?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">1,247</div>
              <div className="text-gray-600">FIRs Filed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">892</div>
              <div className="text-gray-600">Cases Resolved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600">28</div>
              <div className="text-gray-600">Police Stations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-semibold">DigitalFIR</span>
              </div>
              <p className="text-gray-400">
                A secure, transparent platform for filing and tracking police complaints in India.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/file-fir" className="hover:text-white transition-colors">File FIR</Link></li>
                <li><Link to="/status" className="hover:text-white transition-colors">Check Status</Link></li>
                <li><Link to="/admin" className="hover:text-white transition-colors">Admin Portal</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">Emergency: 100</p>
              <p className="text-gray-400">Support: digitalfir@gov.in</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Government of India. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
