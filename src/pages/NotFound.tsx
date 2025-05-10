
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dineflex-offwhite">
      <motion.div 
        className="text-center px-4 max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-8xl font-bold text-dineflex-burgundy mb-6">404</h1>
        <p className="text-2xl text-dineflex-charcoal mb-4 font-light">Oops! This table hasn't been set yet</p>
        <p className="text-gray-600 mb-8">
          We couldn't find the page you were looking for. Perhaps you'd like to browse our restaurants instead?
        </p>
        <Link to="/">
          <Button className="bg-dineflex-burgundy hover:bg-dineflex-burgundy/90 text-white py-6 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transform transition-all hover:-translate-y-1">
            Return to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
