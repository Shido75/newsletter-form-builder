import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import NotFound from "@/pages/NotFound";
import Subscribe from "./pages/Subscribe";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <nav className="bg-white shadow-sm py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              Newsletter Builder
            </Link>
            <div className="space-x-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/subscribe"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Subscribe
              </Link>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      <Toaster />
    </Router>
  );
}

export default App;