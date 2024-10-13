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

export default function RealTimeUpdates() {
  const [liveData, setLiveData] = useState({ timestamps: [], values: [] });
  const svgRef = useRef();

  useEffect(() => {
    const fetchLiveUpdates = async () => {
      try {
        const response = await fetch("/api/decisions/live-updates");
        const data = await response.json();
        updateChart(data); // Update chart with new data
        setLiveData(data);
      } catch (error) {
        console.error("Error fetching live updates:", error);
      }
    };

    // Initial fetch
    fetchLiveUpdates();

    // Set up polling every 5 seconds
    const intervalId = setInterval(fetchLiveUpdates, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Function to update the D3 chart
  const updateChart = (data) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous chart

    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    svg.attr("width", width).attr("height", height);

    // Define scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data.timestamps, (d) => new Date(d)))
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data.values)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Define line generator
    const line = d3
      .line()
      .x((d, i) => xScale(new Date(data.timestamps[i])))
      .y((d) => yScale(d));

    // Add the X-axis
    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).ticks(5));

    // Add the Y-axis
    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale).ticks(5));

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    // Draw the line
    svg
      .append("path")
      .datum(data.values)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    // Add circles at data points
    svg
      .append("g")
      .selectAll("circle")
      .data(data.values)
      .join("circle")
      .attr("cx", (d, i) => xScale(new Date(data.timestamps[i])))
      .attr("cy", (d) => yScale(d))
      .attr("r", 4)
      .attr("fill", "blue");
  };

  if (!liveData.timestamps.length) return <div>Loading live data...</div>;

  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>Real-Time Business Updates</CardTitle>
          <CardDescription>Live data refreshed every 5 seconds</CardDescription>
        </CardHeader>
        <CardContent>
          <svg ref={svgRef}></svg>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
