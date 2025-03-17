import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { cn } from "../../lib/utils";

interface ReviewsChartProps {
  data?: ReviewData[];
  className?: string;
}

interface ReviewData {
  date: string;
  count: number;
  averageRating: number;
}

const ReviewsChart = ({ data = mockData, className }: ReviewsChartProps) => {
  const [dateRange, setDateRange] = useState("30days");
  const [chartType, setChartType] = useState("bar");

  // Filter data based on selected date range
  const filteredData = React.useMemo(() => {
    // Ensure data is not null or undefined
    const dataToFilter = data || mockData;

    if (dateRange === "all") return dataToFilter;

    const now = new Date();
    let cutoffDate = new Date();

    if (dateRange === "7days") {
      cutoffDate.setDate(now.getDate() - 7);
    } else if (dateRange === "30days") {
      cutoffDate.setDate(now.getDate() - 30);
    } else if (dateRange === "90days") {
      cutoffDate.setDate(now.getDate() - 90);
    }

    return dataToFilter.filter((item) => new Date(item.date) >= cutoffDate);
  }, [data, dateRange]);

  return (
    <Card className={cn("w-full bg-white", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Review Trends</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="bar"
          value={chartType}
          onValueChange={setChartType}
          className="w-full"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            <TabsTrigger value="line">Line Chart</TabsTrigger>
          </TabsList>
          <TabsContent value="bar" className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="count"
                  name="Review Count"
                  fill="#8884d8"
                />
                <Bar
                  yAxisId="right"
                  dataKey="averageRating"
                  name="Avg Rating"
                  fill="#82ca9d"
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="line" className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={filteredData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="count"
                  name="Review Count"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="averageRating"
                  name="Avg Rating"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Mock data for default display
const mockData: ReviewData[] = [
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

export default ReviewsChart;
