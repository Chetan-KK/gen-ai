"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as d3 from "d3";
import DashboardLayout from "@/components/DashboardLayout";

export default function Visualizations() {
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState("bar");
  const chartRef = useRef();

  useEffect(() => {
    fetchChartData();
  }, []);

  useEffect(() => {
    if (chartData) {
      renderChart();
    }
  }, [chartType, chartData]);

  const fetchChartData = async () => {
    try {
      const response = await fetch("/api/decisions/chart-data");
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const renderChart = () => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove(); // Clear previous chart

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    svg.attr("width", width).attr("height", height);

    const xScale = d3
      .scaleBand()
      .domain(chartData.labels)
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(chartData.values)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickSizeOuter(0));

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale));

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    switch (chartType) {
      case "bar":
        svg
          .append("g")
          .selectAll("rect")
          .data(chartData.values)
          .join("rect")
          .attr("x", (d, i) => xScale(chartData.labels[i]))
          .attr("y", (d) => yScale(d))
          .attr("height", (d) => yScale(0) - yScale(d))
          .attr("width", xScale.bandwidth())
          .attr("fill", "steelblue");
        break;

      case "line":
        const line = d3
          .line()
          .x((d, i) => xScale(chartData.labels[i]) + xScale.bandwidth() / 2)
          .y((d) => yScale(d));

        svg
          .append("path")
          .datum(chartData.values)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", line);

        svg
          .append("g")
          .selectAll("circle")
          .data(chartData.values)
          .join("circle")
          .attr(
            "cx",
            (d, i) => xScale(chartData.labels[i]) + xScale.bandwidth() / 2
          )
          .attr("cy", (d) => yScale(d))
          .attr("r", 4)
          .attr("fill", "steelblue");
        break;

      case "scatter":
        svg
          .append("g")
          .selectAll("circle")
          .data(chartData.values)
          .join("circle")
          .attr(
            "cx",
            (d, i) => xScale(chartData.labels[i]) + xScale.bandwidth() / 2
          )
          .attr("cy", (d) => yScale(d))
          .attr("r", 5)
          .attr("fill", "steelblue");
        break;

      default:
        break;
    }
  };

  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>Business Performance Visualizations</CardTitle>
          <CardDescription>
            Interactive charts showing key business metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger>
                <SelectValue placeholder="Select chart type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="scatter">Scatter Plot</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <svg ref={chartRef}></svg>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
