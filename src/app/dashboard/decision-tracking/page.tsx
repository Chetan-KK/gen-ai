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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as d3 from "d3";
import DashboardLayout from "@/components/DashboardLayout";

// Define the structure of a decision
interface Decision {
  id: string;
  date: string;
  description: string;
  outcome: string;
  impact: string;
  impactValue: number;
}

export default function DecisionTracking() {
  const [decisionHistory, setDecisionHistory] = useState<Decision[]>([]);
  const chartRef = useRef(null);

  useEffect(() => {
    fetchDecisionHistory();
  }, []);

  useEffect(() => {
    if (decisionHistory.length > 0) {
      renderChart();
    }
  }, [decisionHistory]);

  const fetchDecisionHistory = async () => {
    try {
      const response = await fetch("/api/decisions/history");
      const data: Decision[] = await response.json(); // Explicitly cast the response to an array of Decision
      setDecisionHistory(data);
    } catch (error) {
      console.error("Error fetching decision history:", error);
    }
  };

  const renderChart = () => {
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", "100%")
      .attr("height", 300)
      .attr("viewBox", "0 0 600 300");

    const x = d3
      .scaleTime()
      .domain(
        d3.extent(decisionHistory, (d: Decision) => new Date(d.date)) as [
          Date,
          Date
        ]
      )
      .range([0, 580]);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(decisionHistory, (d: Decision) => d.impactValue) as number,
      ])
      .range([280, 0]);

    svg
      .append("g")
      .attr("transform", "translate(10,280)")
      .call(d3.axisBottom(x));

    svg.append("g").attr("transform", "translate(10,0)").call(d3.axisLeft(y));

    svg
      .selectAll("circle")
      .data(decisionHistory)
      .enter()
      .append("circle")
      .attr("cx", (d: Decision) => x(new Date(d.date)) + 10)
      .attr("cy", (d: Decision) => y(d.impactValue))
      .attr("r", 5)
      .attr("fill", "red");
  };

  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>Decision Tracking and History</CardTitle>
          <CardDescription>
            Track past business decisions and their impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Decision</TableHead>
                <TableHead>Outcome</TableHead>
                <TableHead>Impact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {decisionHistory.map((decision) => (
                <TableRow key={decision.id}>
                  <TableCell>{decision.date}</TableCell>
                  <TableCell>{decision.description}</TableCell>
                  <TableCell>{decision.outcome}</TableCell>
                  <TableCell>{decision.impact}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-8">
            <h3 className="font-semibold mb-4">Impact Visualization</h3>
            <div ref={chartRef}></div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
