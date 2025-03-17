import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "../ui/context/AppContext";
import { useToast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Globe, Mail, MessageSquare } from "lucide-react";

const googleFormSchema = z.object({
  apiKey: z.string().min(1, { message: "API Key is required" }),
  businessId: z.string().min(1, { message: "Business ID is required" }),
  locationId: z.string().min(1, { message: "Location ID is required" }),
  enabled: z.boolean().default(false),
});

const emailFormSchema = z.object({
  smtpServer: z.string().min(1, { message: "SMTP server is required" }),
  smtpPort: z.string().min(1, { message: "SMTP port is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  fromEmail: z.string().email({ message: "Valid email is required" }),
  fromName: z.string().min(1, { message: "From name is required" }),
  enabled: z.boolean().default(false),
});

const smsFormSchema = z.object({
  accountSid: z.string().min(1, { message: "Account SID is required" }),
  authToken: z.string().min(1, { message: "Auth token is required" }),
  fromNumber: z.string().min(1, { message: "From number is required" }),
  enabled: z.boolean().default(false),
});

type GoogleFormValues = z.infer<typeof googleFormSchema>;
type EmailFormValues = z.infer<typeof emailFormSchema>;
type SmsFormValues = z.infer<typeof smsFormSchema>;

const IntegrationSettings = () => {
  const { integrationSettings } = useAppContext();

  const googleForm = useForm<GoogleFormValues>({
    resolver: zodResolver(googleFormSchema),
    defaultValues: {
      apiKey: "",
      businessId: "",
      locationId: "",
      enabled: false,
    },
  });

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      smtpServer: "",
      smtpPort: "587",
      username: "",
      password: "",
      fromEmail: "",
      fromName: "",
      enabled: false,
    },
  });

  const smsForm = useForm<SmsFormValues>({
    resolver: zodResolver(smsFormSchema),
    defaultValues: {
      accountSid: "",
      authToken: "",
      fromNumber: "",
      enabled: false,
    },
  });

  // Update form values when context changes
  useEffect(() => {
    googleForm.reset({
      apiKey: integrationSettings.googleApiKey,
      businessId: integrationSettings.googleBusinessId,
      locationId: integrationSettings.googleLocationId,
      enabled: integrationSettings.googleEnabled,
    });

    emailForm.reset({
      smtpServer: integrationSettings.emailSmtpServer,
      smtpPort: integrationSettings.emailSmtpPort,
      username: integrationSettings.emailUsername,
      password: integrationSettings.emailPassword,
      fromEmail: integrationSettings.emailFromEmail,
      fromName: integrationSettings.emailFromName,
      enabled: integrationSettings.emailEnabled,
    });

    smsForm.reset({
      accountSid: integrationSettings.smsAccountSid,
      authToken: integrationSettings.smsAuthToken,
      fromNumber: integrationSettings.smsFromNumber,
      enabled: integrationSettings.smsEnabled,
    });
  }, [integrationSettings]);

  const { updateIntegrationSettings, isLoading } = useAppContext();
  const { toast } = useToast();

  const onGoogleSubmit = async (data: GoogleFormValues) => {
    try {
      await updateIntegrationSettings({
        googleEnabled: data.enabled,
        googleApiKey: data.apiKey,
        googleBusinessId: data.businessId,
        googleLocationId: data.locationId,
      });
      toast({
        title: "Google integration updated",
        description: "Your Google My Business settings have been saved.",
      });
    } catch (error) {
      console.error("Error saving Google integration:", error);
      toast({
        title: "Error saving settings",
        description:
          "There was a problem saving your Google integration settings.",
        variant: "destructive",
      });
    }
  };

  const onEmailSubmit = async (data: EmailFormValues) => {
    try {
      await updateIntegrationSettings({
        emailEnabled: data.enabled,
        emailSmtpServer: data.smtpServer,
        emailSmtpPort: data.smtpPort,
        emailUsername: data.username,
        emailPassword: data.password,
        emailFromEmail: data.fromEmail,
        emailFromName: data.fromName,
      });
      toast({
        title: "Email integration updated",
        description: "Your email service settings have been saved.",
      });
    } catch (error) {
      console.error("Error saving email integration:", error);
      toast({
        title: "Error saving settings",
        description:
          "There was a problem saving your email integration settings.",
        variant: "destructive",
      });
    }
  };

  const onSmsSubmit = async (data: SmsFormValues) => {
    try {
      await updateIntegrationSettings({
        smsEnabled: data.enabled,
        smsAccountSid: data.accountSid,
        smsAuthToken: data.authToken,
        smsFromNumber: data.fromNumber,
      });
      toast({
        title: "SMS integration updated",
        description: "Your SMS service settings have been saved.",
      });
    } catch (error) {
      console.error("Error saving SMS integration:", error);
      toast({
        title: "Error saving settings",
        description:
          "There was a problem saving your SMS integration settings.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Integration Settings</h1>
      <Tabs defaultValue="google" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="google" className="flex items-center gap-2">
            <Globe size={16} />
            Google My Business
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail size={16} />
            Email Service
          </TabsTrigger>
          <TabsTrigger value="sms" className="flex items-center gap-2">
            <MessageSquare size={16} />
            SMS (Twilio)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="google">
          <Card>
            <CardHeader>
              <CardTitle>Google My Business Integration</CardTitle>
              <CardDescription>
                Connect your Google My Business account to generate review links
                and display reviews.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...googleForm}>
                <form
                  onSubmit={googleForm.handleSubmit(onGoogleSubmit)}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">
                      Enable Google Integration
                    </h3>
                    <FormField
                      control={googleForm.control}
                      name="enabled"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={googleForm.control}
                    name="apiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Google API Key</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your Google API Key"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Your Google API key with Google My Business API access
                          enabled.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={googleForm.control}
                    name="businessId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business ID</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your Business ID"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Your Google My Business account ID.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={googleForm.control}
                    name="locationId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location ID</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your Location ID"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The location ID for your business listing.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <CardFooter className="px-0 pt-4">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Google Settings"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Service Integration</CardTitle>
              <CardDescription>
                Configure your email service to send review requests to
                customers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...emailForm}>
                <form
                  onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">
                      Enable Email Integration
                    </h3>
                    <FormField
                      control={emailForm.control}
                      name="enabled"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={emailForm.control}
                      name="smtpServer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SMTP Server</FormLabel>
                          <FormControl>
                            <Input placeholder="smtp.example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={emailForm.control}
                      name="smtpPort"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SMTP Port</FormLabel>
                          <FormControl>
                            <Input placeholder="587" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={emailForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="your-username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={emailForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={emailForm.control}
                      name="fromEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>From Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="reviews@yourbusiness.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={emailForm.control}
                      name="fromName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>From Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your Business Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <CardFooter className="px-0 pt-4">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Email Settings"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms">
          <Card>
            <CardHeader>
              <CardTitle>SMS Integration (Twilio)</CardTitle>
              <CardDescription>
                Configure Twilio to send SMS review requests to customers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...smsForm}>
                <form
                  onSubmit={smsForm.handleSubmit(onSmsSubmit)}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">
                      Enable SMS Integration
                    </h3>
                    <FormField
                      control={smsForm.control}
                      name="enabled"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={smsForm.control}
                    name="accountSid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twilio Account SID</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your Twilio Account SID"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Your Twilio Account SID from your Twilio dashboard.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={smsForm.control}
                    name="authToken"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twilio Auth Token</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your Twilio Auth Token"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Your Twilio Auth Token from your Twilio dashboard.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={smsForm.control}
                    name="fromNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1234567890" {...field} />
                        </FormControl>
                        <FormDescription>
                          Your Twilio phone number in E.164 format (e.g.,
                          +1234567890).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <CardFooter className="px-0 pt-4">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save SMS Settings"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationSettings;
