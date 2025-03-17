import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Star, Code, Copy, Eye, Settings, Palette } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ReviewWidget from "../widget/ReviewWidget";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  reviewCount: z.string(),
  minRating: z.string(),
  showAvatar: z.boolean().default(true),
  primaryColor: z.string().default("#4f46e5"),
  secondaryColor: z.string().default("#f97316"),
  ctaText: z.string().min(2, { message: "CTA text is required" }),
  widgetStyle: z.enum(["card", "minimal", "detailed"]),
});

type WidgetConfiguratorProps = {
  onSave?: (config: z.infer<typeof formSchema>) => void;
  initialConfig?: z.infer<typeof formSchema>;
};

const WidgetConfigurator = ({
  onSave = () => {},
  initialConfig = {
    title: "Our Customer Reviews",
    reviewCount: "3",
    minRating: "4",
    showAvatar: true,
    primaryColor: "#4f46e5",
    secondaryColor: "#f97316",
    ctaText: "Leave a Review",
    widgetStyle: "card",
  },
}: WidgetConfiguratorProps) => {
  const [activeTab, setActiveTab] = useState("settings");
  const [previewMode, setPreviewMode] = useState("desktop");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialConfig,
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSave(values);
  };

  const generateShortcode = () => {
    const config = form.getValues();
    const shortcodeParams = Object.entries(config)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");

    return `[review_widget ${shortcodeParams}]`;
  };

  const copyShortcode = () => {
    const shortcode = generateShortcode();
    navigator.clipboard.writeText(shortcode);
    // Could add toast notification here
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Review Widget Configurator
        </CardTitle>
        <CardDescription>
          Customize how your review widget appears on your website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Palette className="w-4 h-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="code">
              <Code className="w-4 h-4 mr-2" />
              Get Code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Widget Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Our Customer Reviews"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The heading displayed at the top of the widget
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ctaText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Call-to-Action Text</FormLabel>
                        <FormControl>
                          <Input placeholder="Leave a Review" {...field} />
                        </FormControl>
                        <FormDescription>
                          Text for the button that leads to your review page
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reviewCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Reviews</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of reviews" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 Review</SelectItem>
                            <SelectItem value="2">2 Reviews</SelectItem>
                            <SelectItem value="3">3 Reviews</SelectItem>
                            <SelectItem value="4">4 Reviews</SelectItem>
                            <SelectItem value="5">5 Reviews</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          How many reviews to display in the widget
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="minRating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Rating</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select minimum rating" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 Star & Above</SelectItem>
                            <SelectItem value="2">2 Stars & Above</SelectItem>
                            <SelectItem value="3">3 Stars & Above</SelectItem>
                            <SelectItem value="4">4 Stars & Above</SelectItem>
                            <SelectItem value="5">5 Stars Only</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Only show reviews with this rating or higher
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="widgetStyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Widget Style</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select widget style" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="card">Card Style</SelectItem>
                            <SelectItem value="minimal">Minimal</SelectItem>
                            <SelectItem value="detailed">Detailed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose the visual style of the widget
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="showAvatar"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Show Customer Avatars
                          </FormLabel>
                          <FormDescription>
                            Display customer profile images with reviews
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

                <Button type="submit" className="mt-4">
                  Save Configuration
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="primaryColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Color</FormLabel>
                      <div className="flex gap-2">
                        <div
                          className="w-10 h-10 rounded-md border"
                          style={{ backgroundColor: field.value }}
                        />
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                      </div>
                      <FormDescription>
                        Main color for headings and buttons
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="secondaryColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secondary Color</FormLabel>
                      <div className="flex gap-2">
                        <div
                          className="w-10 h-10 rounded-md border"
                          style={{ backgroundColor: field.value }}
                        />
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                      </div>
                      <FormDescription>
                        Color for stars and accents
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  onClick={() => form.handleSubmit(handleSubmit)()}
                  className="w-full mt-4"
                >
                  Apply Changes
                </Button>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Preview</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewMode("desktop")}
                      className={previewMode === "desktop" ? "bg-muted" : ""}
                    >
                      Desktop
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewMode("mobile")}
                      className={previewMode === "mobile" ? "bg-muted" : ""}
                    >
                      Mobile
                    </Button>
                  </div>
                </div>

                <div
                  className={`preview-container ${previewMode === "mobile" ? "max-w-[320px] mx-auto" : "w-full"}`}
                >
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <ReviewWidget
                      title={form.watch("title")}
                      reviewCount={parseInt(form.watch("reviewCount"))}
                      minRating={parseInt(form.watch("minRating"))}
                      showAvatar={form.watch("showAvatar")}
                      primaryColor={form.watch("primaryColor")}
                      secondaryColor={form.watch("secondaryColor")}
                      ctaText={form.watch("ctaText")}
                      widgetStyle={form.watch("widgetStyle")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="code" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">WordPress Shortcode</CardTitle>
                  <CardDescription>
                    Copy this shortcode to embed the widget in your WordPress
                    content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                      {generateShortcode()}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={copyShortcode}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Gutenberg Block</CardTitle>
                  <CardDescription>
                    Use the Review Widget block in the WordPress editor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="text-sm">
                      Search for "Review Widget" in the block inserter
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Star className="h-5 w-5 text-amber-500" />
                      <span className="font-medium">Review Widget</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Preview Widget</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    onClick={() => window.open("/widget-preview", "_blank")}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Open Preview in New Tab
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WidgetConfigurator;
