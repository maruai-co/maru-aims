"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { UserAvatar } from "@/components/user-avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { api } from "@/lib/api"

interface AiSystem {
  id: string
  name: string
  purpose: string
  owner: string
  department: string
  riskLevel: string
  status: string
  dataSources: string[]
}

export default function AISystems() {
  const [loading, setLoading] = useState(true)
  const [systems, setSystems] = useState<AiSystem[]>([])
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")
  const [formData, setFormData] = useState({
    name: "",
    purpose: "",
    owner: "",
    department: "",
    riskLevel: "",
    status: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchSystems = async () => {
      try {
        setLoading(true)
        const data = (await api.getAiSystems()) as AiSystem[]
        setSystems(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching AI systems:", err)
        setError("Failed to load AI systems. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchSystems()
  }, [])

  // Filter systems based on search term and filters
  const filteredSystems = systems.filter((system) => {
    const matchesSearch =
      system.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      system.purpose.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || system.department === departmentFilter
    const matchesRisk = riskFilter === "all" || system.riskLevel === riskFilter

    return matchesSearch && matchesDepartment && matchesRisk
  })

  // Get unique departments for filter
  const departments = ["all", ...new Set(systems.map((system) => system.department))]

  // Delete system
  const deleteSystem = async (id: string) => {
    try {
      await api.deleteAiSystem(id)
      setSystems(systems.filter((system) => system.id !== id))
    } catch (err) {
      console.error("Error deleting AI system:", err)
      // Show error message to user
    }
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  // Handle select changes
  const handleSelectChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value })
  }

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      const newSystem = await api.createAiSystem({
        ...formData,
        dataSources: [], // Default empty array
      })
      setSystems([...systems, newSystem])
      // Reset form
      setFormData({
        name: "",
        purpose: "",
        owner: "",
        department: "",
        riskLevel: "",
        status: "",
      })
      // Close dialog (would need to add state for dialog open/close)
    } catch (err) {
      console.error("Error creating AI system:", err)
      // Show error message to user
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <>
        <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border bg-background">
          <h1 className="text-3xl font-bold">AI Systems Registry</h1>
          <UserAvatar />
        </header>
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 flex items-center justify-center">
            <p>Loading AI systems...</p>
          </div>
        </div>
        <DashboardSidebar />
      </>
    )
  }

  if (error) {
    return (
      <>
        <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border bg-background">
          <h1 className="text-3xl font-bold">AI Systems Registry</h1>
          <UserAvatar />
        </header>
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 flex items-center justify-center">
            <Card className="border border-border shadow-sm">
              <CardContent className="p-6">
                <p className="text-destructive">{error}</p>
                <Button onClick={() => window.location.reload()} className="mt-4">
                  Retry
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <DashboardSidebar />
      </>
    )
  }

  return (
    <>
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border bg-background">
        <h1 className="text-3xl font-bold">AI Systems Registry</h1>
        <UserAvatar />
      </header>
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search AI systems..."
                  className="pl-8 border-border"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px] border-border">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept === "all" ? "All Departments" : dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-[180px] border-border">
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add AI System
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px] border-border">
                <DialogHeader>
                  <DialogTitle>Add New AI System</DialogTitle>
                  <DialogDescription>Enter the details of the new AI system to add it to the registry.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      className="col-span-3 border-border"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="purpose" className="text-right">
                      Purpose
                    </Label>
                    <Input
                      id="purpose"
                      className="col-span-3 border-border"
                      value={formData.purpose}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="owner" className="text-right">
                      Owner
                    </Label>
                    <Input
                      id="owner"
                      className="col-span-3 border-border"
                      value={formData.owner}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="department" className="text-right">
                      Department
                    </Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => handleSelectChange("department", value)}
                    >
                      <SelectTrigger className="col-span-3 border-border">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="R&D">R&D</SelectItem>
                        <SelectItem value="Customer Service">Customer Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="riskLevel" className="text-right">
                      Risk Level
                    </Label>
                    <Select value={formData.riskLevel} onValueChange={(value) => handleSelectChange("riskLevel", value)}>
                      <SelectTrigger className="col-span-3 border-border">
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                      <SelectTrigger className="col-span-3 border-border">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="In Development">In Development</SelectItem>
                        <SelectItem value="Deployed">Deployed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredSystems.length > 0 ? (
              filteredSystems.map((system) => (
                <Card key={system.id} className="border border-border shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{system.name}</h3>
                          <Badge
                            variant={
                              system.riskLevel === "High"
                                ? "destructive"
                                : system.riskLevel === "Medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {system.riskLevel}
                          </Badge>
                          <Badge variant="outline" className="border-border">
                            {system.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{system.purpose}</p>
                        <div className="text-sm">
                          <span className="font-medium">Owner:</span> {system.owner}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Department:</span> {system.department}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Data Sources:</span> {system.dataSources.join(", ")}
                        </div>
                      </div>

                      <div className="flex gap-2 self-start">
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-border hover:border-primary hover:text-primary"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-border hover:border-destructive hover:text-destructive"
                          onClick={() => deleteSystem(system.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No AI systems found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <DashboardSidebar />
    </>
  )
}
