"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Brain, Play } from "lucide-react";

export default function TrainPage() {
  const [model, setModel] = useState('');
  const [epochs, setEpochs] = useState(10);
  const [training, setTraining] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleTrain = () => {
    if (!model) return;

    setTraining(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setTraining(false);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 100);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Train Model</CardTitle>
          <CardDescription>
            Configure and train your machine learning model.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Model</label>
            <Select onValueChange={(value) => setModel(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linear-regression">Linear Regression</SelectItem>
                <SelectItem value="decision-tree">Decision Tree</SelectItem>
                <SelectItem value="random-forest">Random Forest</SelectItem>
                <SelectItem value="svm">Support Vector Machine</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Number of Epochs: {epochs}</label>
            <Slider
              min={1}
              max={100}
              step={1}
              value={[epochs]}
              onValueChange={(value) => setEpochs(value[0])}
            />
          </div>
          <Button onClick={handleTrain} disabled={!model || training} className="w-full">
            {training ? (
              <>
                <Brain className="mr-2 h-4 w-4 animate-spin" />
                Training...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start Training
              </>
            )}
          </Button>
          {training && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-center">{progress}% Complete</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}