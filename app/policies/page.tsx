"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { UserAvatar } from "@/components/user-avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileText, Upload, Download, Share2, MoreVertical, Search } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { NavBar } from "@/components/nav-bar"
import { api } from "@/lib/api"

interface Policy {
  id: string
  name: string
  description: string
  status: string
  category: string
  version: string
  lastUpdated: string
}

export default function Policies() {
  const [loading, setLoading] = useState(true)
  const [policies, setPolicies] = useState<Policy[]>([])
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    file: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true)
        const data = await api.getPolicies() as Policy[]
        setPolicies(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching policies:", err)
        setError("Failed to load policies. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchPolicies()
  }, [])

  // Get unique categories
  const categories = ["all", ...new Set(policies.map((policy) => policy.category))]

  // Filter policies based on search and category
  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch =
      policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = activeCategory === "all" || policy.category === activeCategory

    return matchesSearch && matchesCategory
  })

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] })
    }
  }

  // Handle select changes
  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, category: value })
  }

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      const newPolicy = await api.createPolicy({
        name: formData.name,
        description: formData.description,
        category: formData.category,
        version: "1.0",
        lastUpdated: new Date().toISOString().split("T")[0],
      })
      setPolicies([...policies, newPolicy])
      // Reset form
      setFormData({
        name: "",
        description: "",
        category: "",
        file: null,
      })
      // Close dialog (would need to add state for dialog open/close)
    } catch (err) {
      console.error("Error creating policy:", err)
      // Show error message to user
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <>
        <NavBar title="AI Policies" />
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 flex items-center justify-center">
            <p>Loading policies...</p>
          </div>
        </div>
        <DashboardSidebar />
      </>
    )
  }

  if (error) {
    return (
      <>
        <NavBar title="AI Policies" />
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
      <NavBar title="AI Policies" />
      <div className="flex-1 overflow-y-auto pr-80">
        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search policies..."
                className="pl-8 border-border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Policy
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px] border-border">
                <DialogHeader>
                  <DialogTitle>Upload Policy Document</DialogTitle>
                  <DialogDescription>Upload a new policy document to the repository.</DialogDescription>
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
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      className="col-span-3 border-border"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Select value={formData.category} onValueChange={handleSelectChange}>
                      <SelectTrigger className="col-span-3 border-border">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ethics">Ethics</SelectItem>
                        <SelectItem value="Privacy">Privacy</SelectItem>
                        <SelectItem value="Bias">Bias</SelectItem>
                        <SelectItem value="Explainability">Explainability</SelectItem>
                        <SelectItem value="Risk">Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="file" className="text-right">
                      File
                    </Label>
                    <Input id="file" type="file" className="col-span-3 border-border" onChange={handleFileChange} />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Uploading..." : "Upload"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveCategory}>
            <TabsList className="mb-4">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category === "all" ? "All Policies" : category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="space-y-4">
                {filteredPolicies.length > 0 ? (
                  filteredPolicies.map((policy) => (
                    <Card key={policy.id} className="border border-border shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-2 rounded-lg">
                              <FileText className="h-8 w-8 text-primary" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg">{policy.name}</h3>
                                <Badge>{policy.category}</Badge>
                              </div>
                              <p className="text-muted-foreground">{policy.description}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>Version {policy.version}</span>
                                <span>Updated: {policy.lastUpdated}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="border-border">
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm" className="border-border">
                              <Share2 className="mr-2 h-4 w-4" />
                              Share
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Version History</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No policies found matching your search.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      <DashboardSidebar />
    </>
  )
}
