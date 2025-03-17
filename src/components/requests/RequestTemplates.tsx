import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useAppContext } from "../ui/context/AppContext";
import { useToast } from "../ui/use-toast";

interface RequestTemplatesProps {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  serviceType: string;
  serviceDate: string;
  onSendEmail: () => void;
  onSendSms: () => void;
}

const RequestTemplates: React.FC<RequestTemplatesProps> = ({
  customerName = "",
  customerEmail = "",
  customerPhone = "",
  serviceType = "",
  serviceDate = "",
  onSendEmail = () => {},
  onSendSms = () => {},
}) => {
  const { toast } = useToast();
  const { businessSettings, templateSettings } = useAppContext();
  const [activeTab, setActiveTab] = useState("email");

  // Replace template variables with actual values
  const replaceVariables = (template: string) => {
    return template
      .replace(/{{customer_name}}/g, customerName)
      .replace(/{{customer_email}}/g, customerEmail)
      .replace(/{{customer_phone}}/g, customerPhone || "")
      .replace(/{{business_name}}/g, businessSettings.businessName)
      .replace(/{{service_type}}/g, serviceType)
      .replace(/{{service_date}}/g, serviceDate)
      .replace(/{{current_date}}/g, new Date().toLocaleDateString())
      .replace(/{{review_link}}/g, "https://g.page/r/your-review-link");
  };

  const emailSubject = replaceVariables(templateSettings.email.subject);
  const emailBody = replaceVariables(templateSettings.email.body);
  const smsBody = replaceVariables(templateSettings.sms.body);

  const handleSendEmail = () => {
    toast({
      title: "Email Sent",
      description: `Review request email sent to ${customerName} at ${customerEmail}`,
    });
    onSendEmail();
  };

  const handleSendSms = () => {
    if (!customerPhone) {
      toast({
        title: "Error",
        description: "Customer phone number is required to send SMS",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "SMS Sent",
      description: `Review request SMS sent to ${customerName} at ${customerPhone}`,
    });
    onSendSms();
  };

  return (
    <div className="w-full bg-white rounded-lg">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail size={16} />
            Email Preview
          </TabsTrigger>
          <TabsTrigger value="sms" className="flex items-center gap-2">
            <MessageSquare size={16} />
            SMS Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Preview</CardTitle>
              <CardDescription>
                Preview the email that will be sent to {customerName}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input value={emailSubject} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Content</label>
                <div
                  className="p-4 bg-muted border rounded-md min-h-[200px]"
                  dangerouslySetInnerHTML={{ __html: emailBody }}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSendEmail}
                disabled={!customerEmail}
                className="flex items-center gap-2"
              >
                <Send size={16} />
                Send Email Now
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="sms">
          <Card>
            <CardHeader>
              <CardTitle>SMS Preview</CardTitle>
              <CardDescription>
                Preview the SMS that will be sent to {customerName}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <div className="p-4 bg-muted border rounded-md min-h-[100px]">
                  <p className="text-sm">{smsBody}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Character count: {smsBody.length} / 160
                  {smsBody.length > 160 && (
                    <span className="text-red-500">
                      {" "}
                      (Message will be split into multiple SMS)
                    </span>
                  )}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSendSms}
                disabled={!customerPhone}
                className="flex items-center gap-2"
              >
                <Send size={16} />
                Send SMS Now
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RequestTemplates;
