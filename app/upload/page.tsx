"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Upload, CheckCircle, XCircle } from "lucide-react";
import { DatasetOverview } from "@/components/DatasetOverview";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [datasetOverview, setDatasetOverview] = useState<{
    rowCount: number;
    attributes: { name: string; type: string }[];
  } | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadStatus('success');
          // Simulate dataset overview generation
          setTimeout(() => {
            setDatasetOverview({
              rowCount: 1000,
              attributes: [
                { name: "id", type: "integer" },
                { name: "name", type: "string" },
                { name: "age", type: "integer" },
                { name: "email", type: "string" },
                { name: "score", type: "float" },
              ]
            });
          }, 1000);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Upload Dataset</CardTitle>
          <CardDescription>
            Upload your dataset in CSV, JSON, or other supported formats.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="file"
              onChange={handleFileChange}
              accept=".csv,.json,.xlsx"
            />
            <Button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full"
            >
              {uploading ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </>
              )}
            </Button>
            {uploading && (
              <Progress value={progress} className="w-full" />
            )}
            {uploadStatus === 'success' && (
              <div className="flex items-center text-green-500">
                <CheckCircle className="mr-2 h-4 w-4" />
                Upload successful!
              </div>
            )}
            {uploadStatus === 'error' && (
              <div className="flex items-center text-red-500">
                <XCircle className="mr-2 h-4 w-4" />
                Upload failed. Please try again.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <DatasetOverview data={datasetOverview} />
    </div>
  );
}