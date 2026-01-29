import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Skeleton } from "./components/ui/skeleton";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import ForgotPassword from "./pages/ForgotPassword";
import Testimonial from "./pages/Testimonial";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PredictionForm from "./pages/Prediction";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="p-6 space-y-4 w-full max-w-md">
          <Skeleton className="h-8 w-1/3" /> 
          <Skeleton className="h-6 w-1/2" /> 
          <Skeleton className="h-4 w-full" /> 
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }
  

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {user ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/testimonial" element={<Testimonial />} />
                <Route path="/prediction" element={<PredictionForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
