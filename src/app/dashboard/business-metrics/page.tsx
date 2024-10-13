"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as d3 from "d3";
import DashboardLayout from "@/components/DashboardLayout";

export default function BusinessMetrics() {
  const [metrics, setMetrics] = useState<any>(null);
  const chartRef = useRef(null);

  useEffect(() => {
    fetchMetrics();
  }, []);

  useEffect(() => {
    if (metrics) {
      if (metrics.chartData) {
        renderChart(metrics.chartData);
      }
    }
  }, [metrics]);

  const fetchMetrics = async () => {
    try {
      const response = await fetch("/api/metrics");
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error("Error fetching business metrics:", error);
    }
  };

  const renderChart = (chartData: any) => {
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", "100%")
      .attr("height", 400)
      .attr("viewBox", "0 0 600 400");

    const x = d3
      .scaleTime()
      .domain(d3.extent(chartData, (d) => new Date(d.date)))
      .range([0, 580]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => d.value)])
      .range([380, 0]);

    svg
      .append("g")
      .attr("transform", "translate(10,380)")
      .call(d3.axisBottom(x));

    svg.append("g").attr("transform", "translate(10,0)").call(d3.axisLeft(y));

    const line = d3
      .line()
      .x((d) => x(new Date(d.date)) + 10)
      .y((d) => y(d.value));

    svg
      .append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("d", line);
  };

  if (!metrics) return <div>Loading business metrics...</div>;

  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>Business Metrics Dashboard</CardTitle>
          <CardDescription>
            Real-time overview of key business metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {Object.entries(metrics.cards).map(([key, value]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">{key}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div ref={chartRef}></div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
