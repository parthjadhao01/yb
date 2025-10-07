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
import { ArrowLeft, IndianRupee, Home } from "lucide-react";

type RentRecord = {
  id: string;
  propertyId: string;
  tenantName: string;
  rentAmount: number;
  isPaid: boolean;
  contractYearsLeft: number;
};

export default function RentManagementPage() {
  const router = useRouter();

  // Dummy data for now
  const [rents, setRents] = useState<RentRecord[]>([
    {
      id: "r1",
      propertyId: "PROP-101",
      tenantName: "Rohan Sharma",
      rentAmount: 45000,
      isPaid: true,
      contractYearsLeft: 2,
    },
    {
      id: "r2",
      propertyId: "PROP-202",
      tenantName: "Priya Verma",
      rentAmount: 38000,
      isPaid: false,
      contractYearsLeft: 1,
    },
    {
      id: "r3",
      propertyId: "PROP-303",
      tenantName: "Amit Patel",
      rentAmount: 52000,
      isPaid: true,
      contractYearsLeft: 3,
    },
  ]);

  const handleTogglePayment = (id: string) => {
    setRents((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, isPaid: !r.isPaid } : r
      )
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Home className="h-5 w-5" />
          Rent Management
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
          <TableCaption>Track rent payments and contract durations</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Property ID</TableHead>
              <TableHead>Tenant Name</TableHead>
              <TableHead>Rent (₹)</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Contract Years Left</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rents.map((rent) => (
              <TableRow key={rent.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{rent.propertyId}</TableCell>
                <TableCell>{rent.tenantName}</TableCell>
                <TableCell className="flex items-center gap-1">
                  <IndianRupee className="h-4 w-4" />
                  {rent.rentAmount.toLocaleString()}
                </TableCell>
                <TableCell>
                  {rent.isPaid ? (
                    <Badge variant="default">Paid</Badge>
                  ) : (
                    <Badge variant="destructive">Unpaid</Badge>
                  )}
                </TableCell>
                <TableCell>{rent.contractYearsLeft} year(s)</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant={rent.isPaid ? "outline" : "default"}
                    onClick={() => handleTogglePayment(rent.id)}
                  >
                    {rent.isPaid ? "Mark Unpaid" : "Mark Paid"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {rents.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No rent records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
