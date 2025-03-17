// Mock data for use when database is not connected

export interface Review {
  id: string;
  customer_name: string;
  customer_email?: string;
  rating: number;
  review_text: string;
  date: string;
  source: "google" | "facebook" | "yelp" | "other";
  responded: boolean;
  response?: string;
  avatar_url?: string;
}

export interface ReviewRequest {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  service_type: string;
  service_date: string;
  service_notes?: string;
  sent_date: string;
  status: "delivered" | "opened" | "completed" | "pending" | "failed";
  method: "email" | "sms" | "both";
}

export const mockReviews: Review[] = [
  {
    id: "1",
    customer_name: "Sarah Johnson",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    rating: 5,
    review_text:
      "Excellent service! The team was professional and completed the work ahead of schedule. Would definitely recommend to others looking for quality service.",
    date: "2023-06-15",
    source: "google",
    responded: true,
    response:
      "Thank you for your kind words, Sarah! We're thrilled to hear you had a great experience with our team. We look forward to serving you again in the future.",
  },
  {
    id: "2",
    customer_name: "Michael Chen",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    rating: 4,
    review_text:
      "Very satisfied with the quality of work. The only reason for not giving 5 stars is the slight delay in starting the project. Otherwise, the team was knowledgeable and efficient.",
    date: "2023-06-10",
    source: "facebook",
    responded: false,
  },
  {
    id: "3",
    customer_name: "Emily Rodriguez",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    rating: 5,
    review_text:
      "Absolutely fantastic experience from start to finish. The attention to detail was impressive! The team went above and beyond to ensure everything was perfect.",
    date: "2023-06-05",
    source: "google",
    responded: true,
    response:
      "Emily, thank you so much for your wonderful review! Our team takes great pride in our attention to detail, and we're delighted that you noticed. We appreciate your business!",
  },
  {
    id: "4",
    customer_name: "David Wilson",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    rating: 3,
    review_text:
      "The service was okay. There were some communication issues throughout the process, but the end result was satisfactory. Could improve on keeping customers updated.",
    date: "2023-05-28",
    source: "yelp",
    responded: false,
  },
  {
    id: "5",
    customer_name: "Jennifer Lopez",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=jennifer",
    rating: 2,
    review_text:
      "Disappointed with the service. The work took much longer than initially quoted and there were additional charges that weren't clearly explained beforehand.",
    date: "2023-05-20",
    source: "google",
    responded: true,
    response:
      "Jennifer, we sincerely apologize for your experience. We'd like to make this right and address your concerns. Our manager will be reaching out to discuss the issues you encountered and find a resolution. We appreciate your feedback as it helps us improve.",
  },
  {
    id: "6",
    customer_name: "Robert Brown",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
    rating: 5,
    review_text:
      "Top-notch service! The team was punctual, professional, and thorough. They explained everything clearly and made sure I was satisfied before leaving. Highly recommend!",
    date: "2023-05-15",
    source: "facebook",
    responded: false,
  },
];

export const mockRequests: ReviewRequest[] = [
  {
    id: "1",
    customer_name: "John Smith",
    customer_email: "john.smith@example.com",
    customer_phone: "+1 (555) 123-4567",
    service_type: "catering",
    service_date: "2023-06-10",
    sent_date: "2023-06-12T14:30:00Z",
    status: "delivered",
    method: "email",
  },
  {
    id: "2",
    customer_name: "Sarah Johnson",
    customer_email: "sarah.j@example.com",
    customer_phone: "+1 (555) 987-6543",
    service_type: "bar",
    service_date: "2023-06-08",
    sent_date: "2023-06-11T11:15:00Z",
    status: "opened",
    method: "both",
  },
  {
    id: "3",
    customer_name: "Michael Brown",
    customer_email: "",
    customer_phone: "+1 (555) 456-7890",
    service_type: "catering",
    service_date: "2023-06-05",
    sent_date: "2023-06-07T16:45:00Z",
    status: "completed",
    method: "sms",
  },
  {
    id: "4",
    customer_name: "Emily Davis",
    customer_email: "emily.davis@example.com",
    customer_phone: "",
    service_type: "event-planning",
    service_date: "2023-06-09",
    sent_date: "2023-06-11T10:20:00Z",
    status: "pending",
    method: "email",
  },
  {
    id: "5",
    customer_name: "Robert Wilson",
    customer_email: "robert.w@example.com",
    customer_phone: "+1 (555) 789-0123",
    service_type: "catering",
    service_date: "2023-05-15",
    sent_date: "2023-05-17T15:10:00Z",
    status: "failed",
    method: "both",
  },
];

export const mockReviewTrends = [
  { date: "2023-01-01", count: 4, averageRating: 4.2 },
  { date: "2023-01-08", count: 6, averageRating: 4.5 },
  { date: "2023-01-15", count: 8, averageRating: 4.1 },
  { date: "2023-01-22", count: 10, averageRating: 4.3 },
  { date: "2023-01-29", count: 7, averageRating: 4.7 },
  { date: "2023-02-05", count: 12, averageRating: 4.4 },
  { date: "2023-02-12", count: 9, averageRating: 4.6 },
  { date: "2023-02-19", count: 11, averageRating: 4.2 },
  { date: "2023-02-26", count: 14, averageRating: 4.5 },
  { date: "2023-03-05", count: 16, averageRating: 4.8 },
  { date: "2023-03-12", count: 13, averageRating: 4.3 },
  { date: "2023-03-19", count: 18, averageRating: 4.6 },
];

export const mockServiceTypes = [
  { value: "catering", label: "Catering" },
  { value: "bar", label: "Bar Service" },
  { value: "event-planning", label: "Event Planning" },
  { value: "staffing", label: "Staffing" },
  { value: "equipment-rental", label: "Equipment Rental" },
  { value: "other", label: "Other" },
];

export const mockTemplateSettings = {
  email: {
    subject: "We'd love your feedback on your recent experience!",
    body: `<p>Dear {{customer_name}},</p>
<p>Thank you for choosing {{business_name}} for your recent {{service_type}}. We hope you were satisfied with our service.</p>
<p>We would greatly appreciate it if you could take a moment to share your experience with us by leaving a review. Your feedback helps us improve and lets others know about our services.</p>
<p>Click the link below to leave your review:</p>
<p><a href="{{review_link}}">Leave a Review</a></p>
<p>Thank you for your time!</p>
<p>Best regards,<br>{{business_name}} Team</p>`,
  },
  sms: {
    body: `Thanks for choosing {{business_name}} for your recent {{service_type}}! We'd love your feedback. Please take a moment to leave a review: {{review_link}}`,
  },
};

export const mockBusinessSettings = {
  businessName: "C2 Catering",
  businessLogo: "",
  primaryColor: "#4f46e5",
  secondaryColor: "#f97316",
};

export const mockIntegrationSettings = {
  googleEnabled: false,
  googleApiKey: "",
  googleBusinessId: "",
  googleLocationId: "",
  emailEnabled: true,
  emailSmtpServer: "smtp.example.com",
  emailSmtpPort: "587",
  emailUsername: "reviews@c2catering.com",
  emailPassword: "password123",
  emailFromEmail: "reviews@c2catering.com",
  emailFromName: "C2 Catering Reviews",
  smsEnabled: false,
  smsAccountSid: "",
  smsAuthToken: "",
  smsFromNumber: "",
};

export const mockTimingSettings = {
  initialDelay: 2,
  initialDelayUnit: "days",
  followUpDelay: 3,
  followUpDelayUnit: "days",
  maxFollowUps: 2,
};
