"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

type TenantApplication = {
  id: string;
  name: string;
  mobile: string;
  email: string;
  status: "pending" | "accepted" | "rejected";
};

export default function TenantApplicationsPage() {
  const router = useRouter();

  // Dummy data for now
  const [applications, setApplications] = useState<TenantApplication[]>([
    {
      id: "t1",
      name: "Rahul Mehta",
      mobile: "9876543210",
      email: "rahul.mehta@example.com",
      status: "pending",
    },
    {
      id: "t2",
      name: "Priya Sharma",
      mobile: "9988776655",
      email: "priya.sharma@example.com",
      status: "accepted",
    },
    {
      id: "t3",
      name: "Arjun Patel",
      mobile: "9123456789",
      email: "arjun.patel@example.com",
      status: "rejected",
    },
  ]);

  const handleAccept = (id: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: "accepted" } : app
      )
    );
  };

  const handleReject = (id: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: "rejected" } : app
      )
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Tenant Applications</h2>

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
          <TableCaption>List of tenant applications</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Tenant Name</TableHead>
              <TableHead>Mobile Number</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{app.name}</TableCell>
                <TableCell>{app.mobile}</TableCell>
                <TableCell>{app.email}</TableCell>
                <TableCell>
                  {app.status === "accepted" && (
                    <Badge variant="default">Accepted</Badge>
                  )}
                  {app.status === "rejected" && (
                    <Badge variant="destructive">Rejected</Badge>
                  )}
                  {app.status === "pending" && <Badge>Pending</Badge>}
                </TableCell>
                <TableCell className="text-right">
                  {app.status === "pending" ? (
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1"
                        onClick={() => handleAccept(app.id)}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex items-center gap-1"
                        onClick={() => handleReject(app.id)}
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground italic">
                      No actions available
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}

            {applications.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No tenant applications found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
