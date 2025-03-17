import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star, ExternalLink } from "lucide-react";

interface ReviewData {
  id: string;
  customerName: string;
  rating: number;
  reviewText: string;
  date: string;
  avatarUrl?: string;
}

interface ReviewWidgetProps {
  title?: string;
  description?: string;
  reviews?: ReviewData[];
  maxReviews?: number;
  ctaText?: string;
  ctaLink?: string;
  averageRating?: number;
  totalReviews?: number;
  className?: string;
}

const ReviewWidget = ({
  title = "Customer Reviews",
  description = "See what our customers are saying about us",
  reviews = [
    {
      id: "1",
      customerName: "Sarah Johnson",
      rating: 5,
      reviewText:
        "Excellent service! The team was professional and completed the work ahead of schedule.",
      date: "2023-05-15",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      id: "2",
      customerName: "Michael Chen",
      rating: 4,
      reviewText:
        "Very satisfied with the quality of work. Would recommend to others.",
      date: "2023-05-10",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
    {
      id: "3",
      customerName: "Emily Rodriguez",
      rating: 5,
      reviewText:
        "Fantastic experience from start to finish. The attention to detail was impressive.",
      date: "2023-05-05",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    },
  ],
  maxReviews = 3,
  ctaText = "Leave a Review",
  ctaLink = "https://g.page/review",
  averageRating = 4.7,
  totalReviews = 128,
  className,
}: ReviewWidgetProps) => {
  // Display only the specified number of reviews
  const displayedReviews = reviews.slice(0, maxReviews);

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={cn(
            "inline-block",
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300",
          )}
        />
      ));
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card
      className={cn("w-full max-w-md mx-auto bg-white shadow-md", className)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="flex items-center mt-2">
          <div className="flex mr-2">{renderStars(averageRating)}</div>
          <span className="text-sm font-medium">
            {averageRating.toFixed(1)} ({totalReviews} reviews)
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayedReviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
          >
            <div className="flex items-center mb-2">
              {review.avatarUrl && (
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                  <img
                    src={review.avatarUrl}
                    alt={review.customerName}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <div className="font-medium">{review.customerName}</div>
                <div className="flex items-center">
                  {renderStars(review.rating)}
                  <span className="text-xs text-gray-500 ml-2">
                    {formatDate(review.date)}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">{review.reviewText}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => window.open(ctaLink, "_blank")}
        >
          {ctaText} <ExternalLink size={16} className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReviewWidget;
