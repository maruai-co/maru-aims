"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Calendar, Clock, Users, CheckCircle2 } from "lucide-react"

export function DashboardSidebar() {
  return (
    <div className="fixed right-0 top-[65px] w-80 h-[calc(100vh-65px)] border-l border-border bg-background overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Notifications */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              <span>Notifications</span>
              <Badge variant="outline" className="ml-2">
                3 new
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2 space-y-3">
            <div className="flex items-start gap-3 border-b border-border pb-3">
              <Bell className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <p className="text-xs font-medium">Risk assessment due for Chatbot A</p>
                <p className="text-xs text-muted-foreground">Due in 2 days</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border-b border-border pb-3">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
              <div>
                <p className="text-xs font-medium">Privacy policy updated</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Bell className="h-4 w-4 text-amber-500 mt-0.5" />
              <div>
                <p className="text-xs font-medium">New incident report submitted</p>
                <p className="text-xs text-muted-foreground">3 hours ago</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full text-xs">
              View all notifications
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 space-y-3">
            <div className="flex items-start gap-3 border-b border-border pb-3">
              <Calendar className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <p className="text-xs font-medium">ISO 42001 Compliance Review</p>
                <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border-b border-border pb-3">
              <Clock className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <p className="text-xs font-medium">Model B Risk Assessment</p>
                <p className="text-xs text-muted-foreground">May 20, 2:00 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <p className="text-xs font-medium">AI Ethics Committee Meeting</p>
                <p className="text-xs text-muted-foreground">May 22, 11:00 AM</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full text-xs">
              View calendar
            </Button>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ul className="space-y-2 text-sm">
              <li>
                <Button variant="link" className="p-0 h-auto text-xs">
                  ISO 42001 Documentation
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-xs">
                  AI Risk Assessment Templates
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-xs">
                  Incident Response Procedures
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-xs">
                  AI Ethics Guidelines
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-xs">
                  Compliance Checklist
                </Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
