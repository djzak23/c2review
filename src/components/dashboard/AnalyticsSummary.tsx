import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  StarIcon,
  ClockIcon,
  UsersIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalyticsSummaryProps {
  totalReviews?: number;
  averageRating?: number;
  submissionRate?: number;
  pendingRequests?: number;
  comparisonPeriod?: string;
  reviewsChange?: number;
  ratingChange?: number;
  submissionChange?: number;
  pendingChange?: number;
}

const AnalyticsSummary = ({
  totalReviews = 124,
  averageRating = 4.7,
  submissionRate = 68,
  pendingRequests = 12,
  comparisonPeriod = "last month",
  reviewsChange = 15,
  ratingChange = 0.2,
  submissionChange = -3,
  pendingChange = 5,
}: AnalyticsSummaryProps) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Analytics Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Reviews Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{totalReviews}</span>
                <div className="flex items-center mt-1">
                  <span
                    className={cn(
                      "text-xs font-medium flex items-center",
                      reviewsChange >= 0 ? "text-green-600" : "text-red-600",
                    )}
                  >
                    {reviewsChange >= 0 ? (
                      <ArrowUpIcon className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(reviewsChange)}% vs {comparisonPeriod}
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <UsersIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Average Rating Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="text-2xl font-bold mr-1">
                    {averageRating}
                  </span>
                  <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
                <div className="flex items-center mt-1">
                  <span
                    className={cn(
                      "text-xs font-medium flex items-center",
                      ratingChange >= 0 ? "text-green-600" : "text-red-600",
                    )}
                  >
                    {ratingChange >= 0 ? (
                      <ArrowUpIcon className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(ratingChange)} vs {comparisonPeriod}
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <StarIcon className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submission Rate Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Submission Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{submissionRate}%</span>
                <div className="flex items-center mt-1">
                  <span
                    className={cn(
                      "text-xs font-medium flex items-center",
                      submissionChange >= 0 ? "text-green-600" : "text-red-600",
                    )}
                  >
                    {submissionChange >= 0 ? (
                      <ArrowUpIcon className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(submissionChange)}% vs {comparisonPeriod}
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <ArrowUpIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Requests Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{pendingRequests}</span>
                <div className="flex items-center mt-1">
                  <span
                    className={cn(
                      "text-xs font-medium flex items-center",
                      pendingChange <= 0 ? "text-green-600" : "text-red-600",
                    )}
                  >
                    {pendingChange <= 0 ? (
                      <ArrowDownIcon className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowUpIcon className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(pendingChange)} vs {comparisonPeriod}
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <ClockIcon className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsSummary;
