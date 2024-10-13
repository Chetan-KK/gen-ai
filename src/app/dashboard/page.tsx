"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as d3 from "d3";
import DashboardLayout from "@/components/DashboardLayout";

// Define the type for insights
interface InsightData {
  summary: string;
  chartData: { date: string; value: number }[];
}

export default function Dashboard() {
  const [inputData, setInputData] = useState("");

  // Type `insights` as `InsightData | null` since it may start as `null`
  const [insights, setInsights] = useState<InsightData | null>(null);

  const chartRef = useRef(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/decisions/insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: inputData }),
      });
      const data = await response.json();
      setInsights(data); // TypeScript now knows the shape of `data`
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  };

  useEffect(() => {
    if (insights) {
      renderChart(insights.chartData);
    }
  }, [insights]);

  const renderChart = (chartData: { date: string; value: number }[]) => {
    // Clear any previous chart
    d3.select(chartRef.current).select("svg").remove();

    // Set chart dimensions
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", "100%")
      .attr("height", 300)
      .attr("viewBox", "0 0 600 300");

    // Create scales
    const x = d3
      .scaleTime()
      .domain(
        d3.extent(chartData, (d: any) => new Date(d.date)) as [Date, Date]
      )
      .range([50, 550]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d: any) => d.value) as number])
      .range([250, 50]);

    // Create axes
    svg
      .append("g")
      .attr("transform", "translate(0,250)")
      .call(d3.axisBottom(x));

    svg.append("g").attr("transform", "translate(50,0)").call(d3.axisLeft(y));

    // Create line
    const line = d3
      .line()
      .x((d: any) => x(new Date(d.date)))
      .y((d: any) => y(d.value));

    svg
      .append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("d", line);
  };

  return (
    <DashboardLayout>
      <div className="">
        <Card>
          <CardHeader>
            <CardTitle>Input Business Data</CardTitle>
            <CardDescription>
              Enter your business data to get AI-generated insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder="Enter your business data here..."
              className="mb-4"
            />
            <Button onClick={handleSubmit}>Get Insights</Button>
          </CardContent>
        </Card>
        {insights && (
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{insights.summary}</p>
              <div ref={chartRef}></div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
