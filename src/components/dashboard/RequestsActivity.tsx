import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  MessageSquare,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
} from "lucide-react";

interface RequestActivityItem {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  sentDate: string;
  status: "delivered" | "opened" | "completed" | "pending" | "failed";
  method: "email" | "sms" | "both";
}

interface RequestsActivityProps {
  activities?: RequestActivityItem[];
  onSendFollowUp?: (id: string) => void;
}

const getStatusColor = (status: RequestActivityItem["status"]) => {
  switch (status) {
    case "delivered":
      return "secondary";
    case "opened":
      return "secondary";
    case "completed":
      return "default";
    case "pending":
      return "outline";
    case "failed":
      return "destructive";
    default:
      return "outline";
  }
};

const getStatusIcon = (status: RequestActivityItem["status"]) => {
  switch (status) {
    case "delivered":
      return <Send className="h-3 w-3 mr-1" />;
    case "opened":
      return <CheckCircle className="h-3 w-3 mr-1" />;
    case "completed":
      return <CheckCircle className="h-3 w-3 mr-1" />;
    case "pending":
      return <Clock className="h-3 w-3 mr-1" />;
    case "failed":
      return <AlertCircle className="h-3 w-3 mr-1" />;
    default:
      return <Clock className="h-3 w-3 mr-1" />;
  }
};

const getMethodIcon = (method: RequestActivityItem["method"]) => {
  switch (method) {
    case "email":
      return <Mail className="h-4 w-4 mr-2" />;
    case "sms":
      return <MessageSquare className="h-4 w-4 mr-2" />;
    case "both":
      return (
        <div className="flex">
          <Mail className="h-4 w-4 mr-1" />
          <MessageSquare className="h-4 w-4" />
        </div>
      );
    default:
      return <Mail className="h-4 w-4 mr-2" />;
  }
};

const RequestsActivity = ({
  activities = defaultActivities,
  onSendFollowUp = () => {},
}: RequestsActivityProps) => {
  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">
          Recent Request Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start justify-between border-b pb-3"
            >
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">{getMethodIcon(activity.method)}</div>
                <div>
                  <h4 className="font-medium">{activity.customerName}</h4>
                  <div className="text-sm text-muted-foreground">
                    {activity.method === "email" || activity.method === "both"
                      ? activity.email
                      : null}
                    {activity.method === "both" ? " / " : null}
                    {activity.method === "sms" || activity.method === "both"
                      ? activity.phone
                      : null}
                  </div>
                  <div className="flex items-center mt-1">
                    <Badge
                      variant={getStatusColor(activity.status)}
                      className="flex items-center text-xs"
                    >
                      {getStatusIcon(activity.status)}
                      {activity.status.charAt(0).toUpperCase() +
                        activity.status.slice(1)}
                    </Badge>
                    <span className="text-xs text-muted-foreground ml-2">
                      {activity.sentDate}
                    </span>
                  </div>
                </div>
              </div>
              {(activity.status === "delivered" ||
                activity.status === "opened" ||
                activity.status === "failed") && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 mt-1"
                  onClick={() => onSendFollowUp(activity.id)}
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Follow-up
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Default mock data
const defaultActivities: RequestActivityItem[] = [
  {
    id: "1",
    customerName: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    sentDate: "Today, 2:30 PM",
    status: "delivered",
    method: "email",
  },
  {
    id: "2",
    customerName: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 987-6543",
    sentDate: "Today, 11:15 AM",
    status: "opened",
    method: "both",
  },
  {
    id: "3",
    customerName: "Michael Brown",
    email: "",
    phone: "+1 (555) 456-7890",
    sentDate: "Yesterday, 4:45 PM",
    status: "completed",
    method: "sms",
  },
  {
    id: "4",
    customerName: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "",
    sentDate: "Yesterday, 10:20 AM",
    status: "pending",
    method: "email",
  },
  {
    id: "5",
    customerName: "Robert Wilson",
    email: "robert.w@example.com",
    phone: "+1 (555) 789-0123",
    sentDate: "May 15, 3:10 PM",
    status: "failed",
    method: "both",
  },
];

export default RequestsActivity;
