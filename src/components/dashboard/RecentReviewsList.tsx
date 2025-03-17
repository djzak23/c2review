import React from "react";
import { Star, StarHalf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  customerName: string;
  avatarUrl?: string;
  rating: number;
  reviewText: string;
  date: string;
}

interface RecentReviewsListProps {
  reviews?: Review[];
  maxReviews?: number;
  title?: string;
}

const StarRating = ({ rating = 0 }: { rating?: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center">
      {Array(5)
        .fill(0)
        .map((_, i) => {
          if (i < fullStars) {
            return (
              <Star
                key={i}
                className="h-4 w-4 fill-yellow-400 text-yellow-400"
              />
            );
          } else if (i === fullStars && hasHalfStar) {
            return (
              <StarHalf
                key={i}
                className="h-4 w-4 fill-yellow-400 text-yellow-400"
              />
            );
          } else {
            return <Star key={i} className="h-4 w-4 text-gray-300" />;
          }
        })}
      <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

const RecentReviewsList = ({
  reviews = [
    {
      id: "1",
      customerName: "Sarah Johnson",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      rating: 5,
      reviewText:
        "Excellent service! The team was professional and completed the work ahead of schedule. Would definitely recommend to others.",
      date: "2023-06-15",
    },
    {
      id: "2",
      customerName: "Michael Chen",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      rating: 4.5,
      reviewText:
        "Very satisfied with the quality of work. The only reason for not giving 5 stars is the slight delay in starting the project.",
      date: "2023-06-10",
    },
    {
      id: "3",
      customerName: "Emily Rodriguez",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      rating: 5,
      reviewText:
        "Absolutely fantastic experience from start to finish. The attention to detail was impressive!",
      date: "2023-06-05",
    },
    {
      id: "4",
      customerName: "David Wilson",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      rating: 4,
      reviewText:
        "Good service overall. There were a few communication issues but the end result was satisfactory.",
      date: "2023-05-28",
    },
  ],
  maxReviews = 4,
  title = "Recent Reviews",
}: RecentReviewsListProps) => {
  const displayedReviews = reviews.slice(0, maxReviews);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayedReviews.length > 0 ? (
            displayedReviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col space-y-2 border-b pb-4 last:border-0"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage
                        src={review.avatarUrl}
                        alt={review.customerName}
                      />
                      <AvatarFallback>
                        {review.customerName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{review.customerName}</h4>
                      <p className="text-xs text-gray-500">
                        {formatDate(review.date)}
                      </p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-sm text-gray-700">{review.reviewText}</p>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <p className="text-gray-500">No reviews yet</p>
            </div>
          )}
        </div>
        {displayedReviews.length > 0 && (
          <div className="mt-4 text-center">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
              View all reviews
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentReviewsList;
