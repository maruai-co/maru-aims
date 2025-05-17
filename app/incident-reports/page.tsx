"use client"

import { useState } from "react"
import { UserAvatar } from "@/components/user-avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Search, Plus, Eye, MessageSquare } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { NavBar } from "@/components/nav-bar"

// Sample incident data
const initialIncidents = [
  {
    id: "1",
    title: "Biased Output in Recommendation System",
    description: "Users reported gender bias in product recommendations",
    system: "Recommendation Engine",
    severity: "High",
    status: "Investigating",
    reporter: "Emily Wong",
    dateReported: "2024-04-15",
    assignedTo: "Michael Chen",
  },
  {
    id: "2",
    title: "Data Privacy Breach",
    description: "Potential unauthorized access to customer data through AI system",
    system: "Chatbot A",
    severity: "Critical",
    status: "Open",
    reporter: "David Smith",
    dateReported: "2024-04-10",
    assignedTo: "Sarah Johnson",
  },
  {
    id: "3",
    title: "False Positives in Fraud Detection",
    description: "Multiple legitimate transactions flagged as fraudulent",
    system: "Model B",
    severity: "Medium",
    status: "Resolved",
    reporter: "Alex Rodriguez",
    dateReported: "2024-03-28",
    assignedTo: "Michael Chen",
  },
  {
    id: "4",
    title: "System Downtime",
    description: "AI system unavailable for 2 hours due to processing error",
    system: "System C",
    severity: "Low",
    status: "Resolved",
    reporter: "Sarah Johnson",
    dateReported: "2024-03-15",
    assignedTo: "David Smith",
  },
]

export default function IncidentReports() {
  const [incidents, setIncidents] = useState(initialIncidents)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter incidents based on search and status
  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.system.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || incident.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <>
      <NavBar title="Incident Reports" />
      <div className="flex-1 overflow-y-auto pr-80">
        <div className="p-6">
          <div className="flex flex-col min-h-screen">
            <div className="flex flex-1">
              <div className="flex-1 p-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  <div className="flex flex-1 gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search incidents..."
                        className="pl-8 border-border"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[180px] border-border">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="Investigating">Investigating</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Report Incident
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px] border-border">
                      <DialogHeader>
                        <DialogTitle>Report AI Incident</DialogTitle>
                        <DialogDescription>Report an incident related to an AI system.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="title" className="text-right">
                            Title
                          </Label>
                          <Input id="title" className="col-span-3 border-border" />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label htmlFor="description" className="text-right pt-2">
                            Description
                          </Label>
                          <Textarea id="description" className="col-span-3 border-border" rows={4} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="system" className="text-right">
                            AI System
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3 border-border">
                              <SelectValue placeholder="Select system" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="chatbot-a">Chatbot A</SelectItem>
                              <SelectItem value="model-b">Model B</SelectItem>
                              <SelectItem value="system-c">System C</SelectItem>
                              <SelectItem value="recommendation-engine">Recommendation Engine</SelectItem>
                              <SelectItem value="sentiment-analyzer">Sentiment Analyzer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="severity" className="text-right">
                            Severity
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3 border-border">
                              <SelectValue placeholder="Select severity" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="critical">Critical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Submit Report</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <Tabs defaultValue="all" onValueChange={setStatusFilter}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Incidents</TabsTrigger>
                    <TabsTrigger value="Open">Open</TabsTrigger>
                    <TabsTrigger value="Investigating">Investigating</TabsTrigger>
                    <TabsTrigger value="Resolved">Resolved</TabsTrigger>
                  </TabsList>

                  <TabsContent value={statusFilter} className="space-y-4">
                    {filteredIncidents.length > 0 ? (
                      filteredIncidents.map((incident) => (
                        <Card key={incident.id} className="border border-border shadow-sm">
                          <CardContent className="p-6">
                            <div className="flex flex-col space-y-4">
                              <div className="flex flex-col md:flex-row justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <AlertCircle
                                    className={`h-5 w-5 ${
                                      incident.severity === "Critical"
                                        ? "text-red-500"
                                        : incident.severity === "High"
                                          ? "text-orange-500"
                                          : incident.severity === "Medium"
                                            ? "text-amber-500"
                                            : "text-blue-500"
                                    }`}
                                  />
                                  <h3 className="font-semibold text-lg">{incident.title}</h3>
                                  <Badge
                                    variant={
                                      incident.status === "Open"
                                        ? "destructive"
                                        : incident.status === "Investigating"
                                          ? "default"
                                          : "secondary"
                                    }
                                  >
                                    {incident.status}
                                  </Badge>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Button variant="outline" size="sm" className="border-border">
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </Button>
                                  <Button variant="outline" size="sm" className="border-border">
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Add Comment
                                  </Button>
                                </div>
                              </div>

                              <p className="text-muted-foreground">{incident.description}</p>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="font-medium">System:</span> {incident.system}
                                </div>
                                <div>
                                  <span className="font-medium">Reported by:</span> {incident.reporter}
                                </div>
                                <div>
                                  <span className="font-medium">Date:</span> {incident.dateReported}
                                </div>
                                <div>
                                  <span className="font-medium">Severity:</span> {incident.severity}
                                </div>
                                <div>
                                  <span className="font-medium">Assigned to:</span> {incident.assignedTo}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-muted-foreground">No incidents found matching your criteria.</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DashboardSidebar />
    </>
  )
}
