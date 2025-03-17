import React from "react";
import { requestsApi } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useAppContext } from "@/components/ui/context/AppContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, MessageSquare, User, Briefcase, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RequestTemplates from "./RequestTemplates";

const formSchema = z.object({
  customerName: z.string().min(2, { message: "Customer name is required" }),
  customerEmail: z.string().email({ message: "Invalid email address" }),
  customerPhone: z.string().optional(),
  serviceType: z.string().min(1, { message: "Service type is required" }),
  serviceDate: z.string().min(1, { message: "Service date is required" }),
  serviceNotes: z.string().optional(),
  sendEmail: z.boolean().default(true),
  sendSMS: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface RequestFormProps {
  onSubmit?: (data: FormValues) => void;
  isLoading?: boolean;
}

const RequestForm = ({
  onSubmit,
  isLoading = false,
}: RequestFormProps = {}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      serviceType: "",
      serviceDate: "",
      serviceNotes: "",
      sendEmail: true,
      sendSMS: false,
    },
  });

  const { toast } = useToast();
  const { setIsLoading } = useAppContext();
  const [activeTab, setActiveTab] = React.useState("form");
  const [formData, setFormData] = React.useState<FormValues | null>(null);

  const handleSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // Store form data for preview
      setFormData(data);
      setActiveTab("preview");
    } catch (error) {
      console.error("Error processing form:", error);
      toast({
        title: "Error processing form",
        description: "There was a problem processing your request.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendRequest = async () => {
    if (!formData) return;

    setIsLoading(true);
    try {
      // Create the request via API
      const result = await requestsApi.createRequest({
        customer_name: formData.customerName,
        customer_email: formData.customerEmail,
        customer_phone: formData.customerPhone,
        service_type: formData.serviceType,
        service_date: formData.serviceDate,
        service_notes: formData.serviceNotes,
        method:
          formData.sendEmail && formData.sendSMS
            ? "both"
            : formData.sendEmail
              ? "email"
              : "sms",
      });

      if (result) {
        toast({
          title: "Request sent successfully",
          description: `Review request sent to ${formData.customerName}`,
        });

        if (onSubmit) {
          onSubmit(formData);
        }

        // Reset form and go back to form tab
        form.reset();
        setFormData(null);
        setActiveTab("form");
      } else {
        throw new Error("Failed to create request");
      }
    } catch (error) {
      console.error("Error creating request:", error);
      toast({
        title: "Error sending request",
        description: "There was a problem sending the review request.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">New Review Request</CardTitle>
        <CardDescription>
          Create a new review request to send to your customer after service
          completion.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 w-full justify-start">
            <TabsTrigger value="form">Request Form</TabsTrigger>
            <TabsTrigger value="preview" disabled={!formData}>
              Message Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Customer Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customer Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                className="pl-10"
                                placeholder="John Doe"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customerEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                className="pl-10"
                                placeholder="customer@example.com"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customerPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormDescription>
                            Required for SMS notifications
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Service Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="serviceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <div className="relative">
                                <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <SelectTrigger className="pl-10">
                                  <SelectValue placeholder="Select service type" />
                                </SelectTrigger>
                              </div>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="catering">Catering</SelectItem>
                              <SelectItem value="bar">Bar Service</SelectItem>
                              <SelectItem value="event-planning">
                                Event Planning
                              </SelectItem>
                              <SelectItem value="staffing">Staffing</SelectItem>
                              <SelectItem value="equipment-rental">
                                Equipment Rental
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="serviceDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Date</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-10" type="date" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="serviceNotes"
                      render={({ field }) => (
                        <FormItem className="col-span-1 md:col-span-2">
                          <FormLabel>Service Notes (Optional)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MessageSquare className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Textarea
                                className="pl-10 min-h-[100px]"
                                placeholder="Additional details about the service provided..."
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="sendEmail"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Email Notification
                            </FormLabel>
                            <FormDescription>
                              Send a review request via email
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sendSMS"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              SMS Notification
                            </FormLabel>
                            <FormDescription>
                              Send a review request via SMS
                            </FormDescription>
                          </div>
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
                </div>

                <CardFooter className="flex justify-end space-x-4 px-0">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Preview Request"}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="preview">
            {formData && (
              <div className="space-y-6">
                <div className="bg-muted p-4 rounded-md mb-6">
                  <h3 className="font-medium mb-2">Request Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Customer:</p>
                      <p className="text-sm">{formData.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Email:</p>
                      <p className="text-sm">{formData.customerEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Phone:</p>
                      <p className="text-sm">
                        {formData.customerPhone || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Service Type:</p>
                      <p className="text-sm">{formData.serviceType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Service Date:</p>
                      <p className="text-sm">{formData.serviceDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Notification Method:
                      </p>
                      <p className="text-sm">
                        {formData.sendEmail && formData.sendSMS
                          ? "Email & SMS"
                          : formData.sendEmail
                            ? "Email Only"
                            : "SMS Only"}
                      </p>
                    </div>
                  </div>
                  {formData.serviceNotes && (
                    <div className="mt-4">
                      <p className="text-sm font-medium">Service Notes:</p>
                      <p className="text-sm">{formData.serviceNotes}</p>
                    </div>
                  )}
                </div>

                <RequestTemplates
                  customerName={formData.customerName}
                  customerEmail={formData.customerEmail}
                  customerPhone={formData.customerPhone}
                  serviceType={formData.serviceType}
                  serviceDate={formData.serviceDate}
                  onSendEmail={() => handleSendRequest()}
                  onSendSms={() => handleSendRequest()}
                />

                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("form")}
                  >
                    Back to Form
                  </Button>
                  <Button onClick={handleSendRequest} disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Review Request"}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RequestForm;
