"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function IncidentPageSkeleton() {
  return (
    <div className="container mx-auto p-4 space-y-6 animate-pulse">
      {/* Title */}
      <div className="h-6 w-32 bg-gray-300 rounded mb-2"></div>
      <div className="h-8 w-1/2 bg-gray-300 rounded mx-auto mb-1"></div>
      <div className="h-4 w-1/3 bg-gray-200 rounded mx-auto"></div>

      {/* Overview Section */}
      <Card>
        <CardHeader>
          <CardTitle className="h-6 w-32 bg-gray-300 rounded"></CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx}>
                <div className="h-4 w-24 bg-gray-300 rounded mb-1"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
              </div>
            ))}
            <Separator className="md:col-span-2" />
            <div>
              <div className="h-4 w-32 bg-gray-300 rounded mb-1"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
            </div>
            <div>
              <div className="h-4 w-32 bg-gray-300 rounded mb-1"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* People Section */}
      <Card>
        <CardHeader>
          <CardTitle className="h-6 w-32 bg-gray-300 rounded"></CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx}>
              <div className="h-4 w-24 bg-gray-300 rounded mb-1"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Car Section */}
      <Card>
        <CardHeader>
          <CardTitle className="h-6 w-32 bg-gray-300 rounded"></CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx}>
              <div className="h-4 w-20 bg-gray-300 rounded mb-1"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Images Section */}
      <Card>
        <CardHeader>
          <CardTitle className="h-6 w-32 bg-gray-300 rounded"></CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="h-48 w-full bg-gray-200 rounded border border-gray-300"
            ></div>
          ))}
        </CardContent>
      </Card>

      {/* Status Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="h-6 w-32 bg-gray-300 rounded"></CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="h-4 w-full bg-gray-200 rounded"></div>
          ))}
        </CardContent>
      </Card>

      {/* Logs Section */}
      <Card>
        <CardHeader>
          <CardTitle className="h-6 w-32 bg-gray-300 rounded"></CardTitle>
          <CardDescription className="h-3 w-48 bg-gray-200 rounded mt-1"></CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="h-12 w-full bg-gray-200 rounded"></div>
          ))}
        </CardContent>
      </Card>

      {/* Comment Box */}
      <div className="h-20 w-full bg-gray-200 rounded"></div>
    </div>
  );
}
