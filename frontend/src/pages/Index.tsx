import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
          Create Beautiful Newsletter Forms
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Design and implement professional newsletter signup forms with our easy-to-use builder. Capture leads, grow your audience, and engage with your subscribers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/subscribe">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
              Try Demo Form
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="border-gray-300 hover:bg-gray-100 transition-all duration-300">
            Learn More
          </Button>
        </div>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Easy to Customize</h3>
          <p className="text-gray-600">Tailor your forms to match your brand with our intuitive customization options.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Secure & Compliant</h3>
          <p className="text-gray-600">Built with security and data protection regulations in mind for peace of mind.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Integration Ready</h3>
          <p className="text-gray-600">Connect with popular email marketing platforms for seamless subscriber management.</p>
        </div>
      </div>
    </div>
  );
}