import React, { useState, useEffect } from "react";
import { reviewsApi, Review } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useAppContext } from "@/components/ui/context/AppContext";
import { Star, StarHalf, MessageSquare, ThumbsUp, Flag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface ReviewsListProps {
  reviews?: Review[];
  title?: string;
  showFilters?: boolean;
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

const SourceBadge = ({
  source,
}: {
  source: "google" | "facebook" | "yelp" | "other";
}) => {
  const getSourceColor = () => {
    switch (source) {
      case "google":
        return "bg-blue-100 text-blue-800";
      case "facebook":
        return "bg-indigo-100 text-indigo-800";
      case "yelp":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Badge variant="outline" className={cn("text-xs", getSourceColor())}>
      {source.charAt(0).toUpperCase() + source.slice(1)}
    </Badge>
  );
};

const ReviewsList = ({
  reviews: initialReviews,
  title = "All Reviews",
  showFilters = true,
}: ReviewsListProps) => {
  const { toast } = useToast();
  const { setIsLoading } = useAppContext();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<Record<string, string>>({});

  useEffect(() => {
    // If reviews are provided as props, use those
    if (initialReviews) {
      setReviews(initialReviews);
      return;
    }

    // Otherwise fetch from API
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const data = await reviewsApi.getReviews();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast({
          title: "Error loading reviews",
          description: "There was a problem loading the reviews.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [initialReviews, setIsLoading, toast]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(date);
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  const handleResponseChange = (id: string, text: string) => {
    setResponseText((prev) => ({ ...prev, [id]: text }));
  };

  const handleSubmitResponse = async (id: string) => {
    if (!responseText[id]?.trim()) {
      toast({
        title: "Empty response",
        description: "Please enter a response before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await reviewsApi.updateReview(id, {
        responded: true,
        response: responseText[id],
      });

      if (result) {
        // Update the local state
        setReviews((prev) =>
          prev.map((review) =>
            review.id === id
              ? { ...review, responded: true, response: responseText[id] }
              : review,
          ),
        );
        setExpandedReview(null);
        setResponseText((prev) => ({ ...prev, [id]: "" }));

        toast({
          title: "Response submitted",
          description: "Your response has been saved successfully.",
        });
      } else {
        throw new Error("Failed to submit response");
      }
    } catch (error) {
      console.error(`Error submitting response for review ${id}:`, error);
      toast({
        title: "Error submitting response",
        description: "There was a problem saving your response.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter reviews based on selected filter
  const filteredReviews = reviews.filter((review) => {
    if (filter === "all") return true;
    if (filter === "unresponded") return !review.responded;
    if (filter === "5star") return review.rating === 5;
    if (filter === "4star") return review.rating === 4;
    if (filter === "3star") return review.rating === 3;
    if (filter === "low") return review.rating < 3;
    return true;
  });

  // Sort reviews based on selected sort option
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortBy === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    if (sortBy === "highest") {
      return b.rating - a.rating;
    }
    if (sortBy === "lowest") {
      return a.rating - b.rating;
    }
    return 0;
  });

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        {showFilters && (
          <div className="flex items-center space-x-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter reviews" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reviews</SelectItem>
                <SelectItem value="unresponded">Unresponded</SelectItem>
                <SelectItem value="5star">5 Star</SelectItem>
                <SelectItem value="4star">4 Star</SelectItem>
                <SelectItem value="3star">3 Star</SelectItem>
                <SelectItem value="low">2 Star & Below</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="highest">Highest Rating</SelectItem>
                <SelectItem value="lowest">Lowest Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sortedReviews.length > 0 ? (
            sortedReviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage
                        src={review.avatar_url}
                        alt={review.customer_name}
                      />
                      <AvatarFallback>
                        {review.customer_name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{review.customer_name}</h4>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-gray-500">
                          {formatDate(review.date)}
                        </p>
                        <SourceBadge source={review.source} />
                      </div>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-sm text-gray-700">{review.review_text}</p>

                {review.responded && review.response && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center space-x-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Your Response</span>
                    </div>
                    <p className="text-sm text-gray-600">{review.response}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Flag className="h-4 w-4 mr-1" />
                      Report
                    </Button>
                  </div>

                  {!review.responded && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setExpandedReview(
                          expandedReview === review.id ? null : review.id,
                        )
                      }
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Respond
                    </Button>
                  )}
                </div>

                {expandedReview === review.id && (
                  <div className="mt-3 space-y-3">
                    <Textarea
                      placeholder="Write your response..."
                      className="min-h-[100px]"
                      value={responseText[review.id] || ""}
                      onChange={(e) =>
                        handleResponseChange(review.id, e.target.value)
                      }
                    />
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setExpandedReview(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleSubmitResponse(review.id)}
                      >
                        Submit Response
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MessageSquare className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-2">No reviews found</p>
              <p className="text-sm text-gray-400">
                Try adjusting your filters or check back later
              </p>
            </div>
          )}
        </div>

        {sortedReviews.length > 0 ? (
          <div className="mt-6 flex justify-center">
            <Button variant="outline">Load More Reviews</Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default ReviewsList;
