"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface MaintenanceRequest {
  id: string;
  problem: string;
  description: string;
  status: "pending" | "started" | "done";
  date: string; // ISO date string
}

export default function TenantMaintenancePage() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([
    {
      id: "1",
      problem: "Leaky Faucet",
      description: "The kitchen faucet is leaking.",
      status: "pending",
      date: "2025-10-01",
    },
    {
      id: "2",
      problem: "AC Not Cooling",
      description: "The air conditioner in bedroom is not cooling properly.",
      status: "started",
      date: "2025-09-28",
    },
    {
      id: "3",
      problem: "Broken Window",
      description: "The window in living room is broken.",
      status: "done",
      date: "2025-09-25",
    },
  ]);

  const handleAddRequest = () => {
    // TODO: Replace with actual modal/form to add request
    const newRequest: MaintenanceRequest = {
      id: Date.now().toString(),
      problem: "New Problem",
      description: "Description of the problem",
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    };
    setRequests([newRequest, ...requests]);
    alert({
      title: "Request Added",
      description: "Your maintenance request has been submitted.",
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Maintenance Requests</h1>
        <Button onClick={handleAddRequest}>Add Request</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Problem</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>{req.problem}</TableCell>
                  <TableCell>{req.description}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        req.status === "done"
                          ? "bg-green-100 text-green-800"
                          : req.status === "started"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{req.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        setRequests(requests.filter((r) => r.id !== req.id))
                      }
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {requests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No maintenance requests found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
