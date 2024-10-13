"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";

export default function InsightsDisplay() {
  const [insights, setInsights] = useState(null);
  const [activeTab, setActiveTab] = useState("financial");

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const response = await fetch("/api/decisions/insights");
      const data = await response.json();
      setInsights(data);
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  };

  const handleFeedback = async (insightId, isPositive) => {
    try {
      await fetch("/api/decisions/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ insightId, isPositive }),
      });
      // Optionally, update the local state to reflect the feedback
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  if (!insights) return <div>Loading insights...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Generated Insights</CardTitle>
        <CardDescription>View and filter insights by category</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="operational">Operational</TabsTrigger>
            <TabsTrigger value="strategic">Strategic</TabsTrigger>
          </TabsList>
          {Object.entries(insights).map(([category, categoryInsights]) => {
            console.log("category: ", categoryInsights);

            return (
              <TabsContent key={category} value={category}>
                {categoryInsights.map((insight) => (
                  <div key={insight.id} className="mb-4 p-4 border rounded">
                    <p>{insight.text}</p>
                    <div className="mt-2 flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFeedback(insight.id, true)}
                      >
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Helpful
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFeedback(insight.id, false)}
                      >
                        <ThumbsDown className="w-4 h-4 mr-2" />
                        Not Helpful
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
}
