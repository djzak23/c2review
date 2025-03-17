import React from "react";
import DashboardHeader from "../dashboard/DashboardHeader";
import WidgetConfigurator from "./WidgetConfigurator";
import ReviewWidget from "./ReviewWidget";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { Code, Copy, ExternalLink, Smartphone, Monitor } from "lucide-react";

const WidgetPage = () => {
  const [widgetConfig, setWidgetConfig] = React.useState({
    title: "Our Customer Reviews",
    reviewCount: "3",
    minRating: "4",
    showAvatar: true,
    primaryColor: "#4f46e5",
    secondaryColor: "#f97316",
    ctaText: "Leave a Review",
    widgetStyle: "card",
  });

  const [previewDevice, setPreviewDevice] = React.useState("desktop");

  const handleSaveConfig = (config) => {
    setWidgetConfig(config);
    console.log("Widget configuration saved:", config);
    // Implementation for saving configuration would go here
  };

  const generateEmbedCode = () => {
    const configParams = Object.entries(widgetConfig)
      .map(([key, value]) => `data-${key.toLowerCase()}="${value}"`)
      .join(" ");

    return `<div class="review-widget" ${configParams}></div>\n<script src="https://yourwebsite.com/review-widget.js"></script>`;
  };

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(generateEmbedCode());
    // Could add toast notification here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader activeTab="settings" />

      <div className="container mx-auto py-6 px-4">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h1 className="text-2xl font-bold mb-2">Review Widget</h1>
          <p className="text-gray-500">
            Customize and embed a review widget on your website
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WidgetConfigurator
              onSave={handleSaveConfig}
              initialConfig={widgetConfig}
            />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Widget Preview</CardTitle>
                <CardDescription>
                  See how your widget will appear on your website
                </CardDescription>
                <div className="flex space-x-2 mt-2">
                  <Button
                    variant={
                      previewDevice === "desktop" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setPreviewDevice("desktop")}
                  >
                    <Monitor className="h-4 w-4 mr-2" />
                    Desktop
                  </Button>
                  <Button
                    variant={previewDevice === "mobile" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewDevice("mobile")}
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    Mobile
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className={`border rounded-lg p-4 bg-gray-50 ${previewDevice === "mobile" ? "max-w-[320px] mx-auto" : ""}`}
                >
                  <ReviewWidget
                    title={widgetConfig.title}
                    maxReviews={parseInt(widgetConfig.reviewCount)}
                    ctaText={widgetConfig.ctaText}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Embed Code</CardTitle>
                <CardDescription>
                  Copy this code to embed the widget on your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
                    {generateEmbedCode()}
                  </pre>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={copyEmbedCode}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4">
                  <Button className="w-full" variant="outline">
                    <Code className="h-4 w-4 mr-2" />
                    Advanced Integration Guide
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Live Demo</CardTitle>
                <CardDescription>
                  See the widget in action on a demo page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Demo Page
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetPage;
