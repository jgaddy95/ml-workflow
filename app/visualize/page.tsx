"use client"

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as d3 from 'd3';

// Mock data
const mockData = {
  histogram: [
    { bin: 0, count: 10 },
    { bin: 1, count: 20 },
    { bin: 2, count: 15 },
    { bin: 3, count: 25 },
    { bin: 4, count: 18 },
  ],
  correlationMatrix: [
    [1, 0.5, -0.2, 0.3],
    [0.5, 1, 0.1, -0.1],
    [-0.2, 0.1, 1, 0.4],
    [0.3, -0.1, 0.4, 1],
  ],
  learningCurve: [
    { epoch: 1, training: 0.8, validation: 0.6 },
    { epoch: 2, training: 0.85, validation: 0.7 },
    { epoch: 3, training: 0.9, validation: 0.75 },
    { epoch: 4, training: 0.92, validation: 0.78 },
    { epoch: 5, training: 0.95, validation: 0.8 },
  ],
  featureImportance: [
    { feature: 'Feature A', importance: 0.3 },
    { feature: 'Feature B', importance: 0.2 },
    { feature: 'Feature C', importance: 0.25 },
    { feature: 'Feature D', importance: 0.15 },
    { feature: 'Feature E', importance: 0.1 },
  ],
};

export default function VisualizePage() {
  const [chartType, setChartType] = useState('histogram');
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      d3.select(svgRef.current).selectAll('*').remove();
      drawChart();
    }
  }, [chartType]);

  const drawChart = () => {
    const svg = d3.select(svgRef.current);
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    svg.attr('width', width).attr('height', height);

    switch (chartType) {
      case 'histogram':
        drawHistogram(svg, width, height, margin);
        break;
      case 'correlationMatrix':
        drawCorrelationMatrix(svg, width, height, margin);
        break;
      case 'learningCurve':
        drawLearningCurve(svg, width, height, margin);
        break;
      case 'featureImportance':
        drawFeatureImportance(svg, width, height, margin);
        break;
    }
  };

  const drawHistogram = (svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>, width: number, height: number, margin: { top: number; right: number; bottom: number; left: number }) => {
    const data = mockData.histogram;
    const x = d3.scaleBand()
      .range([margin.left, width - margin.right])
      .domain(data.map(d => d.bin.toString()))
      .padding(0.1);

    const y = d3.scaleLinear()
      .range([height - margin.bottom, margin.top])
      .domain([0, d3.max(data, d => d.count) || 0]);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.bin.toString()) || 0)
      .attr('y', d => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', d => height - margin.bottom - y(d.count))
      .attr('fill', '#8884d8');
  };

  const drawCorrelationMatrix = (svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>, width: number, height: number, margin: { top: number; right: number; bottom: number; left: number }) => {
    const data = mockData.correlationMatrix;
    const size = Math.min(width, height) - margin.left - margin.right;
    const x = d3.scaleBand()
      .range([0, size])
      .domain(d3.range(data.length).map(String));

    const color = d3.scaleLinear<string>()
      .domain([-1, 0, 1])
      .range(['#B22222', '#FFFFFF', '#000080']);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.selectAll('rect')
      .data(data.flatMap((row, i) => row.map((value, j) => ({ i, j, value }))))
      .enter().append('rect')
      .attr('x', d => x(d.i.toString()) || 0)
      .attr('y', d => x(d.j.toString()) || 0)
      .attr('width', x.bandwidth())
      .attr('height', x.bandwidth())
      .attr('fill', d => color(d.value));

    g.append('g')
      .attr('transform', `translate(0,${size})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .call(d3.axisLeft(x));
  };

  const drawLearningCurve = (svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>, width: number, height: number, margin: { top: number; right: number; bottom: number; left: number }) => {
    const data = mockData.learningCurve;
    const x = d3.scaleLinear()
      .domain([1, d3.max(data, d => d.epoch) || 0])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, 1])
      .range([height - margin.bottom, margin.top]);

    const line = d3.line<{ epoch: number; training: number; validation: number }>()
      .x(d => x(d.epoch))
      .y(d => y(d.training));

    const validationLine = d3.line<{ epoch: number; training: number; validation: number }>()
      .x(d => x(d.epoch))
      .y(d => y(d.validation));

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(data.length));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 1.5)
      .attr('d', validationLine);

    svg.append('text')
      .attr('x', width - margin.right)
      .attr('y', y(data[data.length - 1].training))
      .attr('dy', '0.35em')
      .attr('fill', 'steelblue')
      .text('Training');

    svg.append('text')
      .attr('x', width - margin.right)
      .attr('y', y(data[data.length - 1].validation))
      .attr('dy', '0.35em')
      .attr('fill', 'red')
      .text('Validation');
  };

  const drawFeatureImportance = (svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>, width: number, height: number, margin: { top: number; right: number; bottom: number; left: number }) => {
    const data = mockData.featureImportance;
    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.importance) || 0])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleBand()
      .range([margin.top, height - margin.bottom])
      .domain(data.map(d => d.feature))
      .padding(0.1);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', margin.left)
      .attr('y', d => y(d.feature) || 0)
      .attr('width', d => x(d.importance) - margin.left)
      .attr('height', y.bandwidth())
      .attr('fill', '#8884d8');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Data Visualization</CardTitle>
          <CardDescription>
            Visualize your data and model results using D3.js.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Chart Type</label>
            <Select onValueChange={(value) => setChartType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a chart type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="histogram">Histogram</SelectItem>
                <SelectItem value="correlationMatrix">Correlation Matrix</SelectItem>
                <SelectItem value="learningCurve">Learning Curve</SelectItem>
                <SelectItem value="featureImportance">Feature Importance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="border rounded-lg p-4 overflow-x-auto">
            <svg ref={svgRef}></svg>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}