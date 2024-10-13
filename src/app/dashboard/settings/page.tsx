"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/components/DashboardLayout";

export default function Settings({ user }) {
  const [settings, setSettings] = useState({
    refreshRate: 5,
    dataSources: [],
    modelPreference: "balanced",
    trackedMetrics: [],
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/settings");
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });
      // Optionally, show a success message
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle>Settings & Preferences</CardTitle>
          <CardDescription>
            Customize your AI decision-making experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium ">
                Data Refresh Rate (seconds)
              </label>
              <Input
                type="number"
                value={settings.refreshRate}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    refreshRate: parseInt(e.target.value),
                  })
                }
                min="1"
                max="60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium ">Data Sources</label>
              <div className="space-y-2">
                {["Sales", "Marketing", "Finance", "Operations"].map(
                  (source) => (
                    <div key={source} className="flex items-center">
                      <Checkbox
                        id={source}
                        checked={settings.dataSources.includes(source)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSettings({
                              ...settings,
                              dataSources: [...settings.dataSources, source],
                            });
                          } else {
                            setSettings({
                              ...settings,
                              dataSources: settings.dataSources.filter(
                                (s) => s !== source
                              ),
                            });
                          }
                        }}
                      />
                      <label htmlFor={source} className="ml-2 text-sm ">
                        {source}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium ">
                Model Preference
              </label>
              <Select
                value={settings.modelPreference}
                onValueChange={(value) =>
                  setSettings({ ...settings, modelPreference: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select model preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial">
                    Prioritize Financial Insights
                  </SelectItem>
                  <SelectItem value="operational">
                    Prioritize Operational Insights
                  </SelectItem>
                  <SelectItem value="balanced">Balanced Approach</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium ">
                Tracked Metrics
              </label>
              <div className="space-y-2">
                {[
                  "Total Sales",
                  "Customer Retention",
                  "Profit Margins",
                  "Employee Productivity",
                ].map((metric) => (
                  <div key={metric} className="flex items-center">
                    <Checkbox
                      id={metric}
                      checked={settings.trackedMetrics.includes(metric)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSettings({
                            ...settings,
                            trackedMetrics: [
                              ...settings.trackedMetrics,
                              metric,
                            ],
                          });
                        } else {
                          setSettings({
                            ...settings,
                            trackedMetrics: settings.trackedMetrics.filter(
                              (m) => m !== metric
                            ),
                          });
                        }
                      }}
                    />
                    <label htmlFor={metric} className="ml-2 text-sm ">
                      {metric}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <Button type="submit">Save Settings</Button>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
