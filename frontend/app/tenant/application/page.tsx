"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Application {
  id: string;
  propertyName: string;
  rent: number;
  status: "approved" | "declined" | "pending";
}

export default function TenantApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([
    { id: "1", propertyName: "2BHK Bandra West", rent: 45000, status: "pending" },
    { id: "2", propertyName: "3BHK Sea View", rent: 85000, status: "approved" },
    { id: "3", propertyName: "1BHK Andheri", rent: 22000, status: "declined" },
  ]);

  const handleRevoke = (id: string) => {
    // TODO: Add API call to revoke application
    setApplications((prev) => prev.filter((app) => app.id !== id));
    alert({
      title: "Application Revoked",
      description: "Your application has been successfully revoked.",
    });
  };

  return (
    <div className="p-6">
    {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Applications</h1>
      </div>
    
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property Name</TableHead>
                <TableHead>Rent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.propertyName}</TableCell>
                  <TableCell>₹{app.rent.toLocaleString()}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        app.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : app.status === "declined"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRevoke(app.id)}
                      disabled={app.status !== "pending"} // only allow revoke if pending
                    >
                      Revoke
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {applications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No applications found.
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
