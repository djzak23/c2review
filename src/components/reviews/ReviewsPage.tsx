import React, { useState } from "react";
import DashboardHeader from "../dashboard/DashboardHeader";
import ReviewsList from "./ReviewsList";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Star, MessageSquare, Flag, Download } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { reviewsApi } from "@/lib/api";
import { exportReviewsToPdf } from "@/lib/exportUtils";

const ReviewsPage = () => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const handleExportReviews = async () => {
    setIsExporting(true);
    try {
      const reviews = await reviewsApi.getReviews();
      exportReviewsToPdf(reviews, {
        title: "Customer Reviews Report",
        filename: `reviews-export-${new Date().toISOString().split("T")[0]}`,
      });
      toast({
        title: "Export successful",
        description: "Your reviews have been exported to PDF",
      });
    } catch (error) {
      console.error("Error exporting reviews:", error);
      toast({
        title: "Export failed",
        description: "There was a problem exporting your reviews",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader activeTab="reviews" />

      <div className="container mx-auto py-6 px-4">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Customer Reviews</h1>
              <p className="text-gray-500">
                Manage and respond to all your reviews in one place
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Button variant="outline" onClick={() => handleExportReviews()}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button>
                <MessageSquare className="h-4 w-4 mr-2" />
                Request Reviews
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">
                      Total Reviews
                    </p>
                    <h3 className="text-2xl font-bold">124</h3>
                  </div>
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-yellow-600 font-medium">
                      Average Rating
                    </p>
                    <div className="flex items-center">
                      <h3 className="text-2xl font-bold mr-2">4.7</h3>
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    </div>
                  </div>
                  <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-medium">
                      Response Rate
                    </p>
                    <h3 className="text-2xl font-bold">92%</h3>
                  </div>
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-600 font-medium">
                      Flagged Reviews
                    </p>
                    <h3 className="text-2xl font-bold">3</h3>
                  </div>
                  <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Flag className="h-5 w-5 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Reviews</TabsTrigger>
            <TabsTrigger value="google">Google</TabsTrigger>
            <TabsTrigger value="facebook">Facebook</TabsTrigger>
            <TabsTrigger value="yelp">Yelp</TabsTrigger>
            <TabsTrigger value="unresponded">Unresponded</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <ReviewsList title="All Reviews" />
          </TabsContent>

          <TabsContent value="google">
            <ReviewsList
              title="Google Reviews"
              reviews={
                [
                  // Filter mock data for Google reviews
                ]
              }
            />
          </TabsContent>

          <TabsContent value="facebook">
            <ReviewsList
              title="Facebook Reviews"
              reviews={
                [
                  // Filter mock data for Facebook reviews
                ]
              }
            />
          </TabsContent>

          <TabsContent value="yelp">
            <ReviewsList
              title="Yelp Reviews"
              reviews={
                [
                  // Filter mock data for Yelp reviews
                ]
              }
            />
          </TabsContent>

          <TabsContent value="unresponded">
            <ReviewsList
              title="Unresponded Reviews"
              reviews={
                [
                  // Filter mock data for unresponded reviews
                ]
              }
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReviewsPage;
