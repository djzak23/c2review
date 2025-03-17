import React from "react";
import { Card, CardContent } from "./ui/card";
import DashboardHeader from "./dashboard/DashboardHeader";
import AnalyticsSummary from "./dashboard/AnalyticsSummary";
import ReviewsChart from "./dashboard/ReviewsChart";
import RecentReviewsList from "./dashboard/RecentReviewsList";
import RequestsActivity from "./dashboard/RequestsActivity";
import QuickActions from "./dashboard/QuickActions";
import ReviewWidget from "./widget/ReviewWidget";
import WidgetConfigurator from "./widget/WidgetConfigurator";
import RequestForm from "./requests/RequestForm";
import IntegrationSettings from "./settings/IntegrationSettings";
import TemplateEditor from "./settings/TemplateEditor";
import ReviewsList from "./reviews/ReviewsList";

const Storyboard = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Review Automation Components</h1>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Dashboard Header</h2>
            <DashboardHeader />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Analytics Summary</h2>
            <AnalyticsSummary />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Reviews Chart</h2>
              <ReviewsChart />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Recent Reviews List</h2>
              <RecentReviewsList />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Requests Activity</h2>
              <RequestsActivity />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <QuickActions />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Review Widget</h2>
              <div className="max-w-md mx-auto">
                <ReviewWidget />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Reviews List</h2>
              <ReviewsList />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Widget Configurator</h2>
            <WidgetConfigurator />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Request Form</h2>
            <RequestForm />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Integration Settings</h2>
            <IntegrationSettings />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Template Editor</h2>
            <TemplateEditor />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Storyboard;
