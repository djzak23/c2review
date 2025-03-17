import React, { useState } from "react";
import DashboardHeader from "../dashboard/DashboardHeader";
import RequestsActivity from "../dashboard/RequestsActivity";
import RequestForm from "./RequestForm";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import {
  PlusCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Download,
} from "lucide-react";
import { useToast } from "../ui/use-toast";
import { requestsApi } from "@/lib/api";
import { exportRequestsToPdf } from "@/lib/exportUtils";

const RequestsPage = () => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleCreateRequest = () => {
    setShowRequestForm(true);
  };

  const handleRequestFormClose = () => {
    setShowRequestForm(false);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader activeTab="requests" />

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
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={handleExportRequests}
                  disabled={isExporting}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isExporting ? "Exporting..." : "Export PDF"}
                </Button>
                <Button onClick={handleCreateRequest}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create New Request
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">
                      Total Requests
                    </p>
                    <h3 className="text-2xl font-bold">156</h3>
                  </div>
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Send className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-yellow-600 font-medium">
                      Pending
                    </p>
                    <h3 className="text-2xl font-bold">12</h3>
                  </div>
                  <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-medium">
                      Completed
                    </p>
                    <h3 className="text-2xl font-bold">87</h3>
                  </div>
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-600 font-medium">Failed</p>
                    <h3 className="text-2xl font-bold">5</h3>
                  </div>
                  <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="recent">
          <TabsList className="mb-6">
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
          </TabsList>

          <TabsContent value="recent">
            <RequestsActivity />
          </TabsContent>

          <TabsContent value="scheduled">
            <RequestsActivity />
          </TabsContent>

          <TabsContent value="completed">
            <RequestsActivity />
          </TabsContent>

          <TabsContent value="failed">
            <RequestsActivity />
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showRequestForm} onOpenChange={setShowRequestForm}>
        <DialogContent className="max-w-4xl">
          <RequestForm onSubmit={handleRequestFormClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RequestsPage;
