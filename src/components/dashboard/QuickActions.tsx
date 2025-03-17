import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileDown, Settings, Layout } from "lucide-react";

interface QuickActionsProps {
  onCreateRequest?: () => void;
  onExportReports?: () => void;
  onConfigureWidget?: () => void;
  onAccessSettings?: () => void;
}

const QuickActions = ({
  onCreateRequest = () => console.log("Create request clicked"),
  onExportReports = () => console.log("Export reports clicked"),
  onConfigureWidget = () => (window.location.href = "/widget"),
  onAccessSettings = () => (window.location.href = "/settings"),
}: QuickActionsProps) => {
  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Button
            onClick={onCreateRequest}
            className="flex flex-col items-center justify-center gap-2 h-auto py-4"
            variant="outline"
          >
            <PlusCircle className="h-5 w-5" />
            <span>New Request</span>
          </Button>

          <Button
            onClick={onExportReports}
            className="flex flex-col items-center justify-center gap-2 h-auto py-4"
            variant="outline"
          >
            <FileDown className="h-5 w-5" />
            <span>Export Reports</span>
          </Button>

          <Button
            onClick={onConfigureWidget}
            className="flex flex-col items-center justify-center gap-2 h-auto py-4"
            variant="outline"
          >
            <Layout className="h-5 w-5" />
            <span>Configure Widget</span>
          </Button>

          <Button
            onClick={onAccessSettings}
            className="flex flex-col items-center justify-center gap-2 h-auto py-4"
            variant="outline"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
