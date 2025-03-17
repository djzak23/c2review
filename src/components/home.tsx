import React, { useState, useEffect } from "react";
import { analyticsApi, reviewsApi, requestsApi } from "@/lib/api";
import { useAppContext } from "./ui/context/AppContext";
import { DbConnectionBanner } from "./ui/db-connection-banner";
import DashboardHeader from "./dashboard/DashboardHeader";
import AnalyticsSummary from "./dashboard/AnalyticsSummary";
import ReviewsChart from "./dashboard/ReviewsChart";
import RecentReviewsList from "./dashboard/RecentReviewsList";
import RequestsActivity from "./dashboard/RequestsActivity";
import QuickActions from "./dashboard/QuickActions";
import SettingsPanel from "./settings/SettingsPanel";
import RequestForm from "./requests/RequestForm";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { useToast } from "./ui/use-toast";
import {
  exportAnalyticsToPdf,
  exportReviewsToPdf,
  exportRequestsToPdf,
} from "@/lib/exportUtils";

const Home = () => {
  const [activeTab, setActiveTab] = useState("analytics");
  const [showRequestForm, setShowRequestForm] = useState(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleCreateRequest = () => {
    setShowRequestForm(true);
  };

  const handleRequestFormClose = () => {
    setShowRequestForm(false);
  };

  const { setIsLoading } = useAppContext();
  const { toast } = useToast();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [reviewTrends, setReviewTrends] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportAnalytics = async () => {
    setIsExporting(true);
    try {
      exportAnalyticsToPdf(analyticsData, reviewTrends, {
        title: "Analytics Dashboard Report",
        filename: `analytics-export-${new Date().toISOString().split("T")[0]}`,
      });
      toast({
        title: "Export successful",
        description: "Your analytics data has been exported to PDF",
      });
    } catch (error) {
      console.error("Error exporting analytics:", error);
      toast({
        title: "Export failed",
        description: "There was a problem exporting your analytics data",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

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

  const handleExportRequests = async () => {
    setIsExporting(true);
    try {
      const requests = await requestsApi.getRequests();
      exportRequestsToPdf(requests, {
        title: "Review Requests Report",
        filename: `requests-export-${new Date().toISOString().split("T")[0]}`,
        orientation: "landscape",
      });
      toast({
        title: "Export successful",
        description: "Your review requests have been exported to PDF",
      });
    } catch (error) {
      console.error("Error exporting requests:", error);
      toast({
        title: "Export failed",
        description: "There was a problem exporting your review requests",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [analytics, trends] = await Promise.all([
          analyticsApi.getAnalyticsSummary(),
          analyticsApi.getReviewTrends(),
        ]);
        setAnalyticsData(analytics);
        setReviewTrends(trends);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setIsLoading]);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader activeTab={activeTab} onTabChange={handleTabChange} />

      {activeTab === "analytics" && (
        <div className="container mx-auto py-6 px-4 space-y-6">
          <DbConnectionBanner />

          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            <Button
              variant="outline"
              onClick={handleExportAnalytics}
              disabled={isExporting}
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? "Exporting..." : "Export PDF"}
            </Button>
          </div>

          <AnalyticsSummary
            totalReviews={analyticsData?.totalReviews}
            averageRating={analyticsData?.averageRating}
            submissionRate={analyticsData?.submissionRate}
            pendingRequests={analyticsData?.pendingRequests}
            reviewsChange={analyticsData?.reviewsChange}
            ratingChange={analyticsData?.ratingChange}
            submissionChange={analyticsData?.submissionChange}
            pendingChange={analyticsData?.pendingChange}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReviewsChart data={reviewTrends} />
            <RecentReviewsList />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RequestsActivity />
            <QuickActions onCreateRequest={handleCreateRequest} />
          </div>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="container mx-auto py-6 px-4">
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">Customer Reviews</h1>
                <p className="text-gray-500">
                  Manage and respond to all your Google reviews in one place
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button
                  variant="outline"
                  onClick={handleExportReviews}
                  disabled={isExporting}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isExporting ? "Exporting..." : "Export PDF"}
                </Button>
              </div>
            </div>
          </div>

          <RecentReviewsList title="All Reviews" maxReviews={10} />
        </div>
      )}

      {activeTab === "requests" && (
        <div className="container mx-auto py-6 px-4">
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">Review Requests</h1>
                <p className="text-gray-500">
                  Create and manage review requests sent to your customers
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button
                  variant="outline"
                  onClick={handleExportRequests}
                  disabled={isExporting}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isExporting ? "Exporting..." : "Export PDF"}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <RequestsActivity />
            <div className="flex justify-end">
              <button
                onClick={handleCreateRequest}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Create New Request
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "settings" && <SettingsPanel />}

      <Dialog open={showRequestForm} onOpenChange={setShowRequestForm}>
        <DialogContent className="max-w-4xl">
          <RequestForm onSubmit={handleRequestFormClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
