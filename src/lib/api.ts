import { createClient } from "@supabase/supabase-js";
import { sendEmail, sendSms } from "./email";
import {
  mockReviews,
  mockRequests,
  mockReviewTrends,
  mockServiceTypes,
  mockTemplateSettings,
  mockTimingSettings,
} from "./mockData";

// Types
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

// Service types for C2 Catering
export const serviceTypes = mockServiceTypes;

// Reviews API
export const reviewsApi = {
  async getReviews(): Promise<Review[]> {
    try {
      // This is a placeholder - when connected to Supabase, this will fetch from the database
      if (!supabase) {
        return mockReviews;
      }

      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return mockReviews; // Fallback to mock data
    }
  },

  async getReviewById(id: string): Promise<Review | null> {
    try {
      if (!supabase) {
        return mockReviews.find((review) => review.id === id) || null;
      }

      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error fetching review ${id}:`, error);
      return mockReviews.find((review) => review.id === id) || null;
    }
  },

  async addReview(review: Omit<Review, "id">): Promise<Review | null> {
    try {
      if (!supabase) {
        // Mock adding a review
        const newReview = {
          ...review,
          id: Math.random().toString(36).substring(2, 11),
        };
        return newReview;
      }

      const { data, error } = await supabase
        .from("reviews")
        .insert([review])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error adding review:", error);
      return null;
    }
  },

  async updateReview(
    id: string,
    updates: Partial<Review>,
  ): Promise<Review | null> {
    try {
      if (!supabase) {
        // Mock updating a review
        const reviewIndex = mockReviews.findIndex((r) => r.id === id);
        if (reviewIndex === -1) return null;

        const updatedReview = {
          ...mockReviews[reviewIndex],
          ...updates,
        };
        return updatedReview;
      }

      const { data, error } = await supabase
        .from("reviews")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error updating review ${id}:`, error);
      return null;
    }
  },

  async deleteReview(id: string): Promise<boolean> {
    try {
      if (!supabase) {
        // Mock deleting a review
        return true;
      }

      const { error } = await supabase.from("reviews").delete().eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error(`Error deleting review ${id}:`, error);
      return false;
    }
  },
};

// Review Requests API
export const requestsApi = {
  async getRequests(): Promise<ReviewRequest[]> {
    try {
      if (!supabase) {
        return mockRequests;
      }

      const { data, error } = await supabase
        .from("review_requests")
        .select("*")
        .order("sent_date", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching review requests:", error);
      return mockRequests; // Fallback to mock data
    }
  },

  async getRequestById(id: string): Promise<ReviewRequest | null> {
    try {
      if (!supabase) {
        return mockRequests.find((request) => request.id === id) || null;
      }

      const { data, error } = await supabase
        .from("review_requests")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error fetching request ${id}:`, error);
      return mockRequests.find((request) => request.id === id) || null;
    }
  },

  async createRequest(
    request: Omit<ReviewRequest, "id" | "sent_date" | "status">,
  ): Promise<ReviewRequest | null> {
    try {
      // First, attempt to send the actual email/SMS
      const {
        customer_name,
        customer_email,
        customer_phone,
        service_type,
        method,
      } = request;
      const businessName = "C2 Catering";
      const reviewLink = "https://g.page/r/your-review-link";

      let emailSent = false;
      let smsSent = false;

      // Send email if requested
      if (method === "email" || method === "both") {
        // Get email template from context
        const emailSubject =
          "We'd love your feedback on your recent experience!";
        const emailBody = `<p>Dear ${customer_name},</p>
<p>Thank you for choosing ${businessName} for your recent ${service_type}. We hope you were satisfied with our service.</p>
<p>We would greatly appreciate it if you could take a moment to share your experience with us by leaving a review. Your feedback helps us improve and lets others know about our services.</p>
<p>Click the link below to leave your review:</p>
<p><a href="${reviewLink}">Leave a Review</a></p>
<p>Thank you for your time!</p>
<p>Best regards,<br>${businessName} Team</p>`;

        emailSent = await sendEmail({
          to: customer_email,
          subject: emailSubject,
          body: emailBody,
        });

        if (!emailSent) {
          console.error("Failed to send email");
        }
      }

      // Send SMS if requested
      if (method === "sms" || method === "both") {
        if (!customer_phone) {
          throw new Error("Phone number is required for SMS");
        }

        // Get SMS template
        const smsBody = `Thanks for choosing ${businessName} for your recent ${service_type}! We'd love your feedback. Please take a moment to leave a review: ${reviewLink}`;

        smsSent = await sendSms(customer_phone, smsBody);

        if (!smsSent) {
          console.error("Failed to send SMS");
        }
      }

      const newRequest = {
        ...request,
        sent_date: new Date().toISOString(),
        status: "pending" as const,
      };

      if (!supabase) {
        // Mock creating a request
        if (
          (method === "email" && emailSent) ||
          (method === "sms" && smsSent) ||
          (method === "both" && (emailSent || smsSent))
        ) {
          return {
            ...newRequest,
            id: Math.random().toString(36).substring(2, 11),
            status: "delivered",
          };
        } else {
          throw new Error("Failed to send notification");
        }
      }

      const { data, error } = await supabase
        .from("review_requests")
        .insert([newRequest])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating review request:", error);
      return null;
    }
  },

  async updateRequest(
    id: string,
    updates: Partial<ReviewRequest>,
  ): Promise<ReviewRequest | null> {
    try {
      if (!supabase) {
        // Mock updating a request
        const requestIndex = mockRequests.findIndex((r) => r.id === id);
        if (requestIndex === -1) return null;

        const updatedRequest = {
          ...mockRequests[requestIndex],
          ...updates,
        };
        return updatedRequest;
      }

      const { data, error } = await supabase
        .from("review_requests")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error updating request ${id}:`, error);
      return null;
    }
  },

  async deleteRequest(id: string): Promise<boolean> {
    try {
      if (!supabase) {
        // Mock deleting a request
        return true;
      }

      const { error } = await supabase
        .from("review_requests")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error(`Error deleting request ${id}:`, error);
      return false;
    }
  },

  async sendFollowUp(id: string): Promise<boolean> {
    try {
      // In a real implementation, this would trigger an email/SMS
      if (!supabase) {
        return true;
      }

      // Update the request status
      const { error } = await supabase
        .from("review_requests")
        .update({ status: "delivered" })
        .eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error(`Error sending follow-up for request ${id}:`, error);
      return false;
    }
  },
};

// Analytics API
export const analyticsApi = {
  async getAnalyticsSummary() {
    try {
      if (!supabase) {
        // Return mock data
        return {
          totalReviews: 124,
          averageRating: 4.7,
          submissionRate: 68,
          pendingRequests: 12,
          reviewsChange: 15,
          ratingChange: 0.2,
          submissionChange: -3,
          pendingChange: 5,
        };
      }

      // In a real implementation, this would calculate analytics from the database
      // This is a simplified example
      const { data: reviews, error: reviewsError } = await supabase
        .from("reviews")
        .select("rating");

      const { data: requests, error: requestsError } = await supabase
        .from("review_requests")
        .select("status");

      if (reviewsError || requestsError) throw reviewsError || requestsError;

      const totalReviews = reviews?.length || 0;
      const averageRating =
        reviews?.reduce((sum, review) => sum + review.rating, 0) /
          totalReviews || 0;
      const pendingRequests =
        requests?.filter((req) => req.status === "pending").length || 0;

      return {
        totalReviews,
        averageRating,
        submissionRate: 68, // This would be calculated in a real implementation
        pendingRequests,
        reviewsChange: 15,
        ratingChange: 0.2,
        submissionChange: -3,
        pendingChange: 5,
      };
    } catch (error) {
      console.error("Error fetching analytics summary:", error);
      // Return mock data as fallback
      return {
        totalReviews: 124,
        averageRating: 4.7,
        submissionRate: 68,
        pendingRequests: 12,
        reviewsChange: 15,
        ratingChange: 0.2,
        submissionChange: -3,
        pendingChange: 5,
      };
    }
  },

  async getReviewTrends() {
    try {
      if (!supabase) {
        // Return mock data
        return mockReviewTrends;
      }

      // In a real implementation, this would aggregate review data by date
      // This is a simplified example
      const { data, error } = await supabase
        .from("reviews")
        .select("date, rating")
        .order("date", { ascending: true });

      if (error) throw error;

      // Group by date and calculate averages
      const trends = data?.reduce(
        (acc, review) => {
          const date = new Date(review.date).toISOString().split("T")[0];
          if (!acc[date]) {
            acc[date] = { count: 0, ratingSum: 0 };
          }
          acc[date].count += 1;
          acc[date].ratingSum += review.rating;
          return acc;
        },
        {} as Record<string, { count: number; ratingSum: number }>,
      );

      return Object.entries(trends || {}).map(
        ([date, { count, ratingSum }]) => ({
          date,
          count,
          averageRating: ratingSum / count,
        }),
      );
    } catch (error) {
      console.error("Error fetching review trends:", error);
      return mockReviewTrends; // Fallback to mock data
    }
  },
};

// Settings API
export const settingsApi = {
  async getIntegrationSettings() {
    try {
      if (!supabase) {
        return {
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
      }

      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .eq("type", "integration")
        .single();

      if (error) throw error;
      return data?.settings || {};
    } catch (error) {
      console.error("Error fetching integration settings:", error);
      return {};
    }
  },

  async updateIntegrationSettings(settings: any) {
    try {
      if (!supabase) {
        console.log("Mock updating integration settings:", settings);
        return true;
      }

      const { error } = await supabase
        .from("settings")
        .update({ settings })
        .eq("type", "integration");

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error updating integration settings:", error);
      return false;
    }
  },

  async getTemplates() {
    try {
      if (!supabase) {
        return mockTemplateSettings;
      }

      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .eq("type", "templates")
        .single();

      if (error) throw error;
      return data?.settings || {};
    } catch (error) {
      console.error("Error fetching templates:", error);
      return {};
    }
  },

  async updateTemplates(templates: any) {
    try {
      if (!supabase) {
        console.log("Mock updating templates:", templates);
        return true;
      }

      const { error } = await supabase
        .from("settings")
        .update({ settings: templates })
        .eq("type", "templates");

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error updating templates:", error);
      return false;
    }
  },

  async getTimingSettings() {
    try {
      if (!supabase) {
        return mockTimingSettings;
      }

      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .eq("type", "timing")
        .single();

      if (error) throw error;
      return data?.settings || {};
    } catch (error) {
      console.error("Error fetching timing settings:", error);
      return {};
    }
  },

  async updateTimingSettings(settings: any) {
    try {
      if (!supabase) {
        console.log("Mock updating timing settings:", settings);
        return true;
      }

      const { error } = await supabase
        .from("settings")
        .update({ settings })
        .eq("type", "timing");

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error updating timing settings:", error);
      return false;
    }
  },
};

// Import supabase client
import { supabase } from "./supabase";
