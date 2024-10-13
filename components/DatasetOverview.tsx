"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface DatasetOverviewProps {
  data: {
    rowCount: number;
    attributes: { name: string; type: string }[];
  } | null;
}

export function DatasetOverview({ data }: DatasetOverviewProps) {
  if (!data) return null;

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Dataset Overview</CardTitle>
        <CardDescription>Summary of the uploaded dataset</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="text-sm font-medium">Number of Rows</h3>
            <p className="text-2xl font-bold">{data.rowCount}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Number of Attributes</h3>
            <p className="text-2xl font-bold">{data.attributes.length}</p>
          </div>
        </div>
        <h3 className="text-sm font-medium mb-2">Attributes</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.attributes.map((attr, index) => (
              <TableRow key={index}>
                <TableCell>{attr.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{attr.type}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}