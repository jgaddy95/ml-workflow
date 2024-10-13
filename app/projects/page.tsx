"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Folder, Plus } from "lucide-react";

const mockProjects = [
  { id: 1, name: 'Customer Churn Prediction', status: 'In Progress', lastUpdated: '2023-05-15' },
  { id: 2, name: 'Sales Forecasting', status: 'Completed', lastUpdated: '2023-04-30' },
  { id: 3, name: 'Image Classification', status: 'Not Started', lastUpdated: '2023-05-10' },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState(mockProjects);

  const addProject = () => {
    const newProject = {
      id: projects.length + 1,
      name: `New Project ${projects.length + 1}`,
      status: 'Not Started',
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setProjects([...projects, newProject]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>ML Projects</CardTitle>
              <CardDescription>
                Manage and track your machine learning projects.
              </CardDescription>
            </div>
            <Button onClick={addProject}>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{project.status}</TableCell>
                  <TableCell>{project.lastUpdated}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Folder className="mr-2 h-4 w-4" />
                      Open
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}