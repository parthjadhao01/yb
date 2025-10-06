"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wrench, ArrowLeft, CheckCircle2, PlayCircle } from "lucide-react";

type MaintenanceRequest = {
  id: string;
  problem: string;
  description: string;
  propertyId: string;
  status: "pending" | "started" | "done";
};

export default function MaintenanceRequestsPage() {
  const router = useRouter();

  // Dummy data for now
  const [requests, setRequests] = useState<MaintenanceRequest[]>([
    {
      id: "m1",
      problem: "Water Leakage",
      description: "Leak in kitchen sink pipe",
      propertyId: "PROP-101",
      status: "pending",
    },
    {
      id: "m2",
      problem: "Electrical Issue",
      description: "No power in bedroom socket",
      propertyId: "PROP-205",
      status: "started",
    },
    {
      id: "m3",
      problem: "Broken Door Lock",
      description: "Main door lock jammed, needs replacement",
      propertyId: "PROP-308",
      status: "done",
    },
  ]);

  const handleStart = (id: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "started" } : req
      )
    );
  };

  const handleDone = (id: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "done" } : req
      )
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Maintenance Requests
        </h2>

        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableCaption>List of maintenance requests</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Problem</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Property ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {requests.map((req) => (
              <TableRow key={req.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{req.problem}</TableCell>
                <TableCell>{req.description}</TableCell>
                <TableCell>{req.propertyId}</TableCell>
                <TableCell>
                  {req.status === "pending" && <Badge>Pending</Badge>}
                  {req.status === "started" && (
                    <Badge variant="secondary">Started</Badge>
                  )}
                  {req.status === "done" && (
                    <Badge variant="default">Done</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {req.status === "pending" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => handleStart(req.id)}
                    >
                      <PlayCircle className="h-4 w-4" />
                      Start
                    </Button>
                  )}

                  {req.status === "started" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => handleDone(req.id)}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Mark Done
                    </Button>
                  )}

                  {req.status === "done" && (
                    <span className="text-sm text-muted-foreground italic">
                      Completed
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}

            {requests.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No maintenance requests found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
