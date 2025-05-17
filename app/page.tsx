"use client"

import { useEffect, useState } from "react"
import { UserAvatar } from "@/components/user-avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart } from "@/components/charts/bar-chart"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { api } from "@/lib/api"

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>({
    complianceProgress: 0,
    isoSections: [],
    aiSystems: [],
    policyCategories: [],
    riskDistribution: [],
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const dashboardData = await api.getDashboardData()
        setData(dashboardData)
        setError(null)
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError("Failed to load dashboard data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <>
        <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border bg-background">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <UserAvatar />
        </header>
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 flex items-center justify-center">
            <p>Loading dashboard data...</p>
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
          <h1 className="text-3xl font-bold">Dashboard</h1>
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
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <UserAvatar />
      </header>
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Compliance Overview */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Compliance Overview</h2>
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">ISO 42001 Compliance</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{data.complianceProgress}% completed</span>
                      <span className="text-sm text-muted-foreground">{100 - data.complianceProgress}% remaining</span>
                    </div>
                    <Progress value={data.complianceProgress} className="h-2" />
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {data.isoSections.map((section: string) => (
                      <Badge key={section} variant="outline" className="px-3 py-1 text-sm bg-secondary border-border">
                        {section}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI Systems */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">AI Systems</h2>
              <div className="space-y-4">
                {data.aiSystems.map((system: any) => (
                  <Card key={system.name} className="border border-border shadow-sm">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-lg">{system.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{system.purpose}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline" className="border-border">
                            {system.department}
                          </Badge>
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
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Risk Assessment */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Risk Assessment</h2>
              <Card className="border border-border shadow-sm">
                <CardContent className="p-4">
                  <div className="h-48 mb-4">
                    <BarChart data={data.riskDistribution} />
                  </div>
                  <Button className="w-full">Start assessment</Button>
                </CardContent>
              </Card>

              {/* Policies */}
              <h2 className="text-2xl font-semibold mb-4 mt-6">Policies</h2>
              <Card className="border border-border shadow-sm">
                <CardContent className="p-4">
                  <ul className="space-y-2">
                    {data.policyCategories.map((category: string) => (
                      <li key={category} className="flex items-center justify-between">
                        <span>{category}</span>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
      <DashboardSidebar />
    </>
  )
}
