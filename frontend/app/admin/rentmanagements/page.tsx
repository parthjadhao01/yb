"use client";

import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RentManagementsPage() {
  const [activeTab, setActiveTab] = useState("pending");

  // Dummy data for now
  const rentData = {
    pending: [
      { id: 1, tenant: "Rohan Mehta", property: "Sunshine Apartments", amount: 12000, dueDate: "2025-10-10" },
      { id: 2, tenant: "Aisha Patel", property: "Green Villa", amount: 15000, dueDate: "2025-10-12" },
    ],
    completed: [
      { id: 3, tenant: "Karan Shah", property: "Lakeview Tower", amount: 10000, paidOn: "2025-09-30" },
    ],
    overdue: [
      { id: 4, tenant: "Neha Singh", property: "Ocean Residency", amount: 18000, dueDate: "2025-09-20" },
    ],
  };

  const renderTable = (data: any[], type: string) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tenant Name</TableHead>
          <TableHead>Property</TableHead>
          <TableHead>Amount (₹)</TableHead>
          {type === "completed" ? (
            <TableHead>Paid On</TableHead>
          ) : (
            <TableHead>Due Date</TableHead>
          )}
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((rent) => (
            <TableRow key={rent.id}>
              <TableCell>{rent.tenant}</TableCell>
              <TableCell>{rent.property}</TableCell>
              <TableCell>{rent.amount}</TableCell>
              <TableCell>{type === "completed" ? rent.paidOn : rent.dueDate}</TableCell>
              <TableCell>
                {type === "pending" ? (
                  <Button size="sm">Mark as Paid</Button>
                ) : type === "overdue" ? (
                  <Button variant="destructive" size="sm">
                    Send Reminder
                  </Button>
                ) : (
                  <Button variant="outline" size="sm">
                    View Receipt
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-gray-500">
              No records found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

  return (
    <div className="max-w-6xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Rent Management</CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>

            <TabsContent value="pending">{renderTable(rentData.pending, "pending")}</TabsContent>
            <TabsContent value="completed">{renderTable(rentData.completed, "completed")}</TabsContent>
            <TabsContent value="overdue">{renderTable(rentData.overdue, "overdue")}</TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
