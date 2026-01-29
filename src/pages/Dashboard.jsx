import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Maximize2 } from "lucide-react";

const Dashboard = () => {
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const iframeContainerRef1 = useRef(null);
  const iframeContainerRef2 = useRef(null);

  const enterFullScreen = (ref) => {
    if (ref.current) {
      if (ref.current.requestFullscreen) {
        ref.current.requestFullscreen();
      } else if (ref.current.webkitRequestFullscreen) {
        ref.current.webkitRequestFullscreen();
      } else if (ref.current.mozRequestFullScreen) {
        ref.current.mozRequestFullScreen();
      } else if (ref.current.msRequestFullscreen) {
        ref.current.msRequestFullscreen();
      }
    }
  };

  return (
    <main className="min-h-screen py-12 px-4 md:px-12 bg-gray-50 text-black">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Thyroid Analysis Dashboards
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore visual insights from the thyroid dataset. These dashboards highlight critical risk factors, trends, and health indicators to help you understand the patterns in thyroid conditions.
        </p>
      </div>

      <div className="grid gap-12">
         {/* Dashboard 2 */}
         <Card className="shadow-lg rounded-2xl bg-white">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Dashboard 1: Risk Factors Overview 
                </h2>
               
                <p className="text-gray-600 text-sm">
                  Understand the distribution of risk factors among patients. This dashboard highlights key contributors to thyroid disorders, helping you visualize potential areas of concern and common trends in the dataset.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => enterFullScreen(iframeContainerRef2)}
              >
                <Maximize2 className="w-4 h-4 mr-2" />
                Full Screen
              </Button>
            </div>

            {loading2 && (
              <Skeleton className="w-full h-[600px] rounded-xl mb-6" />
            )}

            <div
              ref={iframeContainerRef2}
              className="relative w-full rounded-xl overflow-hidden"
              style={{ paddingTop: "56.25%" }}
            >
              <iframe
                src="https://public.tableau.com/views/ThyroidDashboard_17440343166360/Dashboard2?:embed=true&:showVizHome=no"
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 rounded-xl ${
                  loading2 ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setLoading2(false)}
                frameBorder="0"
                allowFullScreen
                title="Dashboard 2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Dashboard 1 */}
        <Card className="shadow-lg rounded-2xl bg-white">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Dashboard 2: Additional Insights
                </h2>
                <p className="text-gray-600 text-sm">
                  Dive deeper into the data to explore additional trends and insights related to thyroid conditions. This dashboard helps you examine more granular details and correlations for better understanding.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => enterFullScreen(iframeContainerRef1)}
              >
                <Maximize2 className="w-4 h-4 mr-2" />
                Full Screen
              </Button>
            </div>

            {loading1 && (
              <Skeleton className="w-full h-[600px] rounded-xl mb-6" />
            )}

            <div
              ref={iframeContainerRef1}
              className="relative w-full rounded-xl overflow-hidden"
              style={{ paddingTop: "56.25%" }}
            >
              <iframe
                src="https://public.tableau.com/views/ThyroidDashboard_17440343166360/Dashboard1?:embed=true&:showVizHome=no"
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 rounded-xl ${
                  loading1 ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setLoading1(false)}
                frameBorder="0"
                allowFullScreen
                title="Dashboard 1"
              />
            </div>
          </CardContent>
        </Card>

       
      </div>
    </main>
  );
};

export default Dashboard;
