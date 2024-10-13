"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";

export default function QAInteraction() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/decisions/qa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      setAnswer(data.answer);
      setHistory([...history, { question, answer: data.answer }]);
      setQuestion("");
    } catch (error) {
      console.error("Error fetching answer:", error);
    }
  };

  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>Business Q&A</CardTitle>
          <CardDescription>
            Ask questions about your business data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question..."
            />
            <Button type="submit">Submit</Button>
          </form>
          {answer && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h3 className="font-semibold">Answer:</h3>
              <p>{answer}</p>
            </div>
          )}
          {history.length > 0 && (
            <div className="mt-8">
              <h3 className="font-semibold mb-2">Question History:</h3>
              {history.map((item, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-100 rounded">
                  <p className="font-medium">Q: {item.question}</p>
                  <p>A: {item.answer}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
