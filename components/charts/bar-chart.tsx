"use client"

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

interface BarChartProps {
  data?: Array<{
    name: string
    total: number
  }>
}

// Default data if none is provided
const defaultData = [
  {
    name: "Low",
    total: 40,
  },
  {
    name: "Medium",
    total: 30,
  },
  {
    name: "High",
    total: 45,
  },
  {
    name: "Critical",
    total: 10,
  },
]

export function BarChart({ data = defaultData }: BarChartProps) {
  return (
    <ChartContainer
      config={{
        total: {
          label: "Risk Count",
          color: "hsl(var(--chart-1))",
        },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
