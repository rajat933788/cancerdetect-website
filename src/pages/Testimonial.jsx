import { useState } from "react";
import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonial() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "testimonials"), {
        name,
        message,
        timestamp: serverTimestamp(),
      });
      toast.success("Thank you for your testimonial!");
      setSuccess(true);
      setTimeout(() => {
        navigate("/"); // Redirect after short delay
      }, 2000);
    } catch (error) {
      console.error(error);
      if (error.code === "unavailable") {
        toast.error(
          "Network error! Please check your connection or disable any ad blockers."
        );
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 p-4 min-h-screen">
      <div className="text-center mb-8 mt-5">
        <h1 className="text-3xl font-bold text-gray-800">Share Your Experience</h1>
        <p className="text-gray-600 mt-2">
          Your feedback helps us improve and inspire others!
        </p>
      </div>

      <AnimatePresence>
        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-xl text-center"
          >
            <CheckCircle2 className="text-green-500 w-12 h-12 mb-3" />
            <h2 className="text-xl font-semibold text-gray-800">Thank You!</h2>
            <p className="text-gray-600 mt-2">
              Your testimonial has been submitted successfully.
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Redirecting you to the home page...
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <Card className="shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Write a Testimonial</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-1 text-sm text-gray-700">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-1 text-sm text-gray-700">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Share your thoughts..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Tell us about your experience or how this platform helped you.
                    </p>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" /> Submitting...
                      </>
                    ) : (
                      "Submit Testimonial"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-8 text-sm text-gray-500 text-center">
              <p>💡 Sharing your testimonial helps others trust our platform and stay hopeful.</p>
              <p className="mt-2">We truly appreciate your time and support!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
