import React from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardHeaderProps {
  activeTab?: string;
  onTabChange?: (value: string) => void;
  userName?: string;
  userAvatar?: string;
}

const DashboardHeader = ({
  activeTab = "analytics",
  onTabChange = () => {},
  userName = "Admin User",
  userAvatar = "",
}: DashboardHeaderProps) => {
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-xl font-bold">Review Automation</h1>
        </div>

        <Tabs value={activeTab} onValueChange={onTabChange} className="ml-8">
          <TabsList>
            <TabsTrigger
              value="analytics"
              onClick={() => (window.location.href = "/")}
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              onClick={() => (window.location.href = "/reviews")}
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="requests"
              onClick={() => (window.location.href = "/requests")}
            >
              Requests
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              onClick={() => (window.location.href = "/settings")}
            >
              Settings
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2 ml-2">
          <span className="text-sm font-medium">{userName}</span>
          <Avatar>
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
