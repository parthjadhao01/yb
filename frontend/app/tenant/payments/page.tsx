"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  propertyName: string;
  amount: number;
  date: string; // ISO string
  status: "paid" | "pending" | "failed";
}

export default function TenantPaymentsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "TXN12345",
      propertyName: "2BHK Bandra West",
      amount: 45000,
      date: "2025-10-01",
      status: "paid",
    },
    {
      id: "TXN12346",
      propertyName: "3BHK Sea View",
      amount: 85000,
      date: "2025-09-01",
      status: "pending",
    },
    {
      id: "TXN12347",
      propertyName: "1BHK Andheri",
      amount: 22000,
      date: "2025-08-15",
      status: "failed",
    },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Transactions</h1>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell>{txn.id}</TableCell>
                  <TableCell>{txn.propertyName}</TableCell>
                  <TableCell>₹{txn.amount.toLocaleString()}</TableCell>
                  <TableCell>{txn.date}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        txn.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : txn.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      View Receipt
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {transactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No transactions found.
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
