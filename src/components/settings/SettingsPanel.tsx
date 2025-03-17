import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  Globe,
  Mail,
  MessageSquare,
  Clock,
  Users,
  FileText,
  Bell,
  List,
} from "lucide-react";
import IntegrationSettings from "./IntegrationSettings";
import TemplateEditor from "./TemplateEditor";
import ServiceTypeManager from "./ServiceTypeManager";

interface SettingsPanelProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const SettingsPanel = ({
  activeTab = "integrations",
  onTabChange = () => {},
}: SettingsPanelProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    onTabChange(value);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Settings className="h-8 w-8 mr-3 text-primary" />
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          <div className="bg-white rounded-lg shadow p-4 h-fit">
            <nav className="space-y-2">
              <Button
                variant={currentTab === "integrations" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleTabChange("integrations")}
              >
                <Globe className="mr-2 h-5 w-5" />
                Integrations
              </Button>
              <Button
                variant={currentTab === "email-sms" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleTabChange("email-sms")}
              >
                <Mail className="mr-2 h-5 w-5" />
                Email & SMS
              </Button>
              <Button
                variant={currentTab === "templates" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleTabChange("templates")}
              >
                <FileText className="mr-2 h-5 w-5" />
                Templates
              </Button>
              <Button
                variant={currentTab === "timing" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleTabChange("timing")}
              >
                <Clock className="mr-2 h-5 w-5" />
                Timing
              </Button>
              <Button
                variant={currentTab === "services" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleTabChange("services")}
              >
                <List className="mr-2 h-5 w-5" />
                Service Types
              </Button>
              <Button
                variant={currentTab === "notifications" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleTabChange("notifications")}
              >
                <Bell className="mr-2 h-5 w-5" />
                Notifications
              </Button>
              <Button
                variant={currentTab === "access" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleTabChange("access")}
              >
                <Users className="mr-2 h-5 w-5" />
                Access Control
              </Button>
            </nav>
          </div>

          <div className="bg-white rounded-lg shadow">
            {currentTab === "integrations" && <IntegrationSettings />}
            {currentTab === "templates" && <TemplateEditor />}
            {currentTab === "email-sms" && <EmailSmsSettings />}
            {currentTab === "timing" && <TimingSettings />}
            {currentTab === "services" && <ServiceTypeManager />}
            {currentTab === "notifications" && <NotificationSettings />}
            {currentTab === "access" && <AccessControlSettings />}
          </div>
        </div>
      </div>
    </div>
  );
};

const EmailSmsSettings = () => {
  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6">Email & SMS Settings</h1>
      <Tabs defaultValue="email" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail size={16} />
            Email Settings
          </TabsTrigger>
          <TabsTrigger value="sms" className="flex items-center gap-2">
            <MessageSquare size={16} />
            SMS Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Notification Settings</CardTitle>
              <CardDescription>
                Configure how email notifications are sent to customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">
                    Send Review Request Emails
                  </h3>
                  <p className="text-sm text-gray-500">
                    Enable or disable automated review request emails
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">Send Follow-up Emails</h3>
                  <p className="text-sm text-gray-500">
                    Send follow-up emails if no response is received
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Subject Line</h3>
                <Input defaultValue="We'd love your feedback on your recent experience!" />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Preview Text</h3>
                <Input defaultValue="Please take a moment to share your experience with us" />
              </div>
              <div className="pt-4">
                <Button>Save Email Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms">
          <Card>
            <CardHeader>
              <CardTitle>SMS Notification Settings</CardTitle>
              <CardDescription>
                Configure how SMS notifications are sent to customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">
                    Send Review Request SMS
                  </h3>
                  <p className="text-sm text-gray-500">
                    Enable or disable automated review request SMS
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">Send Follow-up SMS</h3>
                  <p className="text-sm text-gray-500">
                    Send follow-up SMS if no response is received
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-medium">SMS Message Template</h3>
                <Textarea
                  defaultValue="Thanks for choosing C2 Catering! We'd love your feedback. Please take a moment to leave a review: [REVIEW_LINK]"
                  className="min-h-[100px]"
                />
                <p className="text-sm text-gray-500">
                  Available variables: [Business Name], [REVIEW_LINK], [Customer
                  Name]
                </p>
              </div>
              <div className="pt-4">
                <Button>Save SMS Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const TimingSettings = () => {
  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6">Timing Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Review Request Timing</CardTitle>
          <CardDescription>
            Configure when review requests are sent to customers after service
            completion
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Initial Request Delay</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input type="number" defaultValue="2" min="0" />
              </div>
              <div>
                <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                  <option value="hours">Hours</option>
                  <option value="days" selected>
                    Days
                  </option>
                  <option value="weeks">Weeks</option>
                </select>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Time to wait after service completion before sending the first
              request
            </p>
          </div>
          <Separator />
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Follow-up Timing</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input type="number" defaultValue="3" min="0" />
              </div>
              <div>
                <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                  <option value="hours">Hours</option>
                  <option value="days" selected>
                    Days
                  </option>
                  <option value="weeks">Weeks</option>
                </select>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Time to wait before sending a follow-up if no response is received
            </p>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Maximum Follow-ups</h3>
              <p className="text-sm text-gray-500">
                Maximum number of follow-up messages to send
              </p>
            </div>
            <Input
              type="number"
              defaultValue="2"
              min="0"
              max="5"
              className="w-20"
            />
          </div>
          <div className="pt-4">
            <Button>Save Timing Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const NotificationSettings = () => {
  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6">Notification Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Admin Notifications</CardTitle>
          <CardDescription>
            Configure notifications for administrators about review activity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">New Review Notifications</h3>
              <p className="text-sm text-gray-500">
                Receive notifications when new reviews are submitted
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Negative Review Alerts</h3>
              <p className="text-sm text-gray-500">
                Get immediate alerts for reviews below 4 stars
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Weekly Summary Report</h3>
              <p className="text-sm text-gray-500">
                Receive a weekly email summary of review activity
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              Notification Email Addresses
            </h3>
            <Textarea
              defaultValue="admin@example.com, manager@example.com"
              placeholder="Enter email addresses separated by commas"
              className="min-h-[80px]"
            />
          </div>
          <div className="pt-4">
            <Button>Save Notification Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AccessControlSettings = () => {
  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6">Access Control Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Role-Based Access Control</CardTitle>
          <CardDescription>
            Configure which user roles have access to different features of the
            review system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="font-medium">Feature</div>
            <div className="font-medium">Administrator</div>
            <div className="font-medium">Editor</div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>View Analytics Dashboard</div>
            <div>
              <Switch defaultChecked disabled />
            </div>
            <div>
              <Switch defaultChecked />
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>Send Review Requests</div>
            <div>
              <Switch defaultChecked disabled />
            </div>
            <div>
              <Switch defaultChecked />
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>Modify Templates</div>
            <div>
              <Switch defaultChecked disabled />
            </div>
            <div>
              <Switch defaultChecked />
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>Configure Integrations</div>
            <div>
              <Switch defaultChecked disabled />
            </div>
            <div>
              <Switch />
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>Access Control Settings</div>
            <div>
              <Switch defaultChecked disabled />
            </div>
            <div>
              <Switch />
            </div>
          </div>
          <div className="pt-4">
            <Button>Save Access Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPanel;
