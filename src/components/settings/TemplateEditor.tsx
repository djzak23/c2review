import React, { useState, useEffect } from "react";
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
import { Mail, MessageSquare, FileText, Loader2 } from "lucide-react";
import { useAppContext } from "../ui/context/AppContext";
import { useToast } from "../ui/use-toast";

const TemplateEditor = () => {
  const { toast } = useToast();
  const { templateSettings, updateTemplateSettings, isLoading } =
    useAppContext();
  const [activeTab, setActiveTab] = useState("email");
  const [emailTemplate, setEmailTemplate] = useState(
    templateSettings.email.body,
  );

  const [smsTemplate, setSmsTemplate] = useState(templateSettings.sms.body);

  const [emailSubject, setEmailSubject] = useState(
    templateSettings.email.subject,
  );

  // Update local state when context changes
  useEffect(() => {
    setEmailTemplate(templateSettings.email.body);
    setSmsTemplate(templateSettings.sms.body);
    setEmailSubject(templateSettings.email.subject);
  }, [templateSettings]);

  const handleSaveEmail = async () => {
    try {
      await updateTemplateSettings({
        email: {
          subject: emailSubject,
          body: emailTemplate,
        },
      });
    } catch (error) {
      toast({
        title: "Error saving template",
        description: "There was a problem saving your email template.",
        variant: "destructive",
      });
    }
  };

  const handleSaveSms = async () => {
    try {
      await updateTemplateSettings({
        sms: {
          body: smsTemplate,
        },
      });
    } catch (error) {
      toast({
        title: "Error saving template",
        description: "There was a problem saving your SMS template.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Message Templates</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail size={16} />
            Email Template
          </TabsTrigger>
          <TabsTrigger value="sms" className="flex items-center gap-2">
            <MessageSquare size={16} />
            SMS Template
          </TabsTrigger>
          <TabsTrigger value="variables" className="flex items-center gap-2">
            <FileText size={16} />
            Available Variables
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Template Editor</CardTitle>
              <CardDescription>
                Customize the email template sent to customers for review
                requests
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Subject</label>
                <Input
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Enter email subject line"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Body (HTML)</label>
                <Textarea
                  value={emailTemplate}
                  onChange={(e) => setEmailTemplate(e.target.value)}
                  placeholder="Enter email template content"
                  className="min-h-[300px] font-mono text-sm"
                  disabled={isLoading}
                />
              </div>
              <div className="bg-muted p-4 rounded-md">
                <h3 className="text-sm font-medium mb-2">Preview</h3>
                <div
                  className="p-4 bg-white border rounded-md"
                  dangerouslySetInnerHTML={{ __html: emailTemplate }}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveEmail} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Email Template"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="sms">
          <Card>
            <CardHeader>
              <CardTitle>SMS Template Editor</CardTitle>
              <CardDescription>
                Customize the SMS template sent to customers for review requests
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">SMS Message</label>
                <Textarea
                  value={smsTemplate}
                  onChange={(e) => setSmsTemplate(e.target.value)}
                  placeholder="Enter SMS template content"
                  className="min-h-[150px]"
                  disabled={isLoading}
                />
                <p className="text-sm text-muted-foreground">
                  Character count: {smsTemplate.length} / 160
                  {smsTemplate.length > 160 && (
                    <span className="text-red-500">
                      {" "}
                      (Message will be split into multiple SMS)
                    </span>
                  )}
                </p>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <h3 className="text-sm font-medium mb-2">Preview</h3>
                <div className="p-4 bg-white border rounded-md">
                  <p className="text-sm">{smsTemplate}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSms} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save SMS Template"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="variables">
          <Card>
            <CardHeader>
              <CardTitle>Available Template Variables</CardTitle>
              <CardDescription>
                Use these variables in your templates to personalize messages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Customer Variables</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <code className="bg-muted px-2 py-1 rounded">
                        {"{{customer_name}}"}
                      </code>
                      <span className="text-sm text-muted-foreground">
                        Customer's full name
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <code className="bg-muted px-2 py-1 rounded">
                        {"{{customer_email}}"}
                      </code>
                      <span className="text-sm text-muted-foreground">
                        Customer's email address
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <code className="bg-muted px-2 py-1 rounded">
                        {"{{customer_phone}}"}
                      </code>
                      <span className="text-sm text-muted-foreground">
                        Customer's phone number
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Business Variables</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <code className="bg-muted px-2 py-1 rounded">
                        {"{{business_name}}"}
                      </code>
                      <span className="text-sm text-muted-foreground">
                        Your business name
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <code className="bg-muted px-2 py-1 rounded">
                        {"{{review_link}}"}
                      </code>
                      <span className="text-sm text-muted-foreground">
                        Google review link
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Service Variables</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <code className="bg-muted px-2 py-1 rounded">
                        {"{{service_type}}"}
                      </code>
                      <span className="text-sm text-muted-foreground">
                        Type of service provided
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <code className="bg-muted px-2 py-1 rounded">
                        {"{{service_date}}"}
                      </code>
                      <span className="text-sm text-muted-foreground">
                        Date of service
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Other Variables</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <code className="bg-muted px-2 py-1 rounded">
                        {"{{current_date}}"}
                      </code>
                      <span className="text-sm text-muted-foreground">
                        Current date
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <code className="bg-muted px-2 py-1 rounded">
                        {"{{unsubscribe_link}}"}
                      </code>
                      <span className="text-sm text-muted-foreground">
                        Unsubscribe link
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TemplateEditor;
