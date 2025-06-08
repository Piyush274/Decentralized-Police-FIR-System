import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, ArrowLeft, Shield } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    // You could also log this to an error tracking service
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
      <div className="max-w-md w-full p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-purple-100 mb-6">
          <AlertCircle className="h-10 w-10 text-purple-600" />
        </div>
        
        <h1 className="text-5xl font-bold text-purple-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h2>
        
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
          <br />
          <span className="text-sm bg-purple-50 text-purple-700 px-2 py-1 rounded-md mt-2 inline-block">
            {location.pathname}
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => navigate(-1)} 
            variant="outline" 
            className="border-purple-300 text-purple-600 hover:bg-purple-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
          
          <Button 
            onClick={() => navigate("/")} 
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Home className="h-4 w-4 mr-2" />
            Return Home
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-purple-100">
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Shield className="h-4 w-4 mr-2 text-purple-400" />
            DigitalFIR - Ministry of Home Affairs
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Made by Piyush Sangam with love
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;