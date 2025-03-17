import jsPDF from "jspdf";
import "jspdf-autotable";
import { Review } from "./mockData";
import { format } from "date-fns";

export interface ExportOptions {
  title?: string;
  filename?: string;
  includeHeader?: boolean;
  includeFooter?: boolean;
  pageSize?: "a4" | "letter" | "legal";
  orientation?: "portrait" | "landscape";
}

const defaultOptions: ExportOptions = {
  title: "Review Report",
  filename: "reviews-export",
  includeHeader: true,
  includeFooter: true,
  pageSize: "a4",
  orientation: "portrait",
};

export const exportReviewsToPdf = (
  reviews: Review[],
  options: ExportOptions = {},
): void => {
  const opts = { ...defaultOptions, ...options };
  const doc = new jsPDF({
    orientation: opts.orientation,
    unit: "mm",
    format: opts.pageSize,
  });

  // Add title
  if (opts.includeHeader) {
    doc.setFontSize(18);
    doc.text(opts.title || "Review Report", 14, 22);
    doc.setFontSize(11);
    doc.text(`Generated on: ${format(new Date(), "PPP")}`, 14, 30);
    doc.setFontSize(10);
  }

  // Prepare table data
  const tableColumn = [
    "Customer",
    "Rating",
    "Date",
    "Source",
    "Review Text",
    "Response Status",
  ];
  const tableRows = reviews.map((review) => [
    review.customer_name,
    review.rating.toString(),
    format(new Date(review.date), "PP"),
    review.source.charAt(0).toUpperCase() + review.source.slice(1),
    review.review_text.length > 100
      ? review.review_text.substring(0, 100) + "..."
      : review.review_text,
    review.responded ? "Responded" : "Not Responded",
  ]);

  // Add table
  (doc as any).autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: opts.includeHeader ? 40 : 14,
    styles: { fontSize: 8, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 15, halign: "center" },
      2: { cellWidth: 25 },
      3: { cellWidth: 20 },
      4: { cellWidth: "auto" },
      5: { cellWidth: 25, halign: "center" },
    },
    headStyles: {
      fillColor: [79, 70, 229],
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [240, 240, 250],
    },
    margin: { top: 15 },
  });

  // Add footer
  if (opts.includeFooter) {
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Page ${i} of ${pageCount} - C2 Catering Review System`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: "center" },
      );
    }
  }

  // Save the PDF
  doc.save(`${opts.filename || "reviews-export"}.pdf`);
};

export const exportAnalyticsToPdf = (
  analyticsData: any,
  reviewTrends: any[],
  options: ExportOptions = {},
): void => {
  const opts = { ...defaultOptions, ...options };
  const doc = new jsPDF({
    orientation: opts.orientation,
    unit: "mm",
    format: opts.pageSize,
  });

  // Add title
  doc.setFontSize(18);
  doc.text("Analytics Report", 14, 22);
  doc.setFontSize(11);
  doc.text(`Generated on: ${format(new Date(), "PPP")}`, 14, 30);
  doc.setFontSize(10);

  // Add summary section
  doc.text("Summary Statistics", 14, 45);

  const summaryData = [
    ["Total Reviews", analyticsData?.totalReviews || "N/A"],
    ["Average Rating", analyticsData?.averageRating?.toFixed(1) || "N/A"],
    ["Submission Rate", `${analyticsData?.submissionRate || 0}%`],
    ["Pending Requests", analyticsData?.pendingRequests || "N/A"],
  ];

  (doc as any).autoTable({
    body: summaryData,
    startY: 50,
    theme: "grid",
    styles: { fontSize: 10 },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 40 },
      1: { cellWidth: 30 },
    },
  });

  // Add trends section
  doc.text("Review Trends", 14, 90);

  const trendsHeaders = ["Date", "Review Count", "Average Rating"];
  const trendsRows = reviewTrends.map((trend) => [
    trend.date,
    trend.count.toString(),
    trend.averageRating.toFixed(1),
  ]);

  (doc as any).autoTable({
    head: [trendsHeaders],
    body: trendsRows,
    startY: 95,
    styles: { fontSize: 8 },
    headStyles: {
      fillColor: [79, 70, 229],
      textColor: 255,
      fontStyle: "bold",
    },
  });

  // Add footer
  if (opts.includeFooter) {
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Page ${i} of ${pageCount} - C2 Catering Analytics Report`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: "center" },
      );
    }
  }

  // Save the PDF
  doc.save(`${opts.filename || "analytics-export"}.pdf`);
};

export const exportRequestsToPdf = (
  requests: any[],
  options: ExportOptions = {},
): void => {
  const opts = { ...defaultOptions, ...options };
  const doc = new jsPDF({
    orientation: opts.orientation,
    unit: "mm",
    format: opts.pageSize,
  });

  // Add title
  if (opts.includeHeader) {
    doc.setFontSize(18);
    doc.text("Review Requests Report", 14, 22);
    doc.setFontSize(11);
    doc.text(`Generated on: ${format(new Date(), "PPP")}`, 14, 30);
    doc.setFontSize(10);
  }

  // Prepare table data
  const tableColumn = [
    "Customer",
    "Contact",
    "Service Type",
    "Service Date",
    "Sent Date",
    "Status",
    "Method",
  ];
  const tableRows = requests.map((request) => [
    request.customer_name,
    request.method === "email"
      ? request.customer_email
      : request.method === "sms"
        ? request.customer_phone
        : `${request.customer_email} / ${request.customer_phone}`,
    request.service_type,
    format(new Date(request.service_date), "PP"),
    format(new Date(request.sent_date), "PP"),
    request.status.charAt(0).toUpperCase() + request.status.slice(1),
    request.method.toUpperCase(),
  ]);

  // Add table
  (doc as any).autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: opts.includeHeader ? 40 : 14,
    styles: { fontSize: 8, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 40 },
      2: { cellWidth: 25 },
      3: { cellWidth: 25 },
      4: { cellWidth: 25 },
      5: { cellWidth: 20 },
      6: { cellWidth: 15, halign: "center" },
    },
    headStyles: {
      fillColor: [79, 70, 229],
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [240, 240, 250],
    },
    margin: { top: 15 },
  });

  // Add footer
  if (opts.includeFooter) {
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Page ${i} of ${pageCount} - C2 Catering Request System`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: "center" },
      );
    }
  }

  // Save the PDF
  doc.save(`${opts.filename || "requests-export"}.pdf`);
};
