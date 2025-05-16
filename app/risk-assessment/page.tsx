"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { UserAvatar } from "@/components/user-avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { BarChart } from "@/components/charts/bar-chart"
import { Download, FileText } from "lucide-react"

export default function RiskAssessment() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedSystem, setSelectedSystem] = useState("")

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="text-3xl font-bold">Risk Assessment</h1>
        <UserAvatar />
      </header>

      <div className="flex-1 p-6">
        <Tabs defaultValue="wizard" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="wizard">Assessment Wizard</TabsTrigger>
            <TabsTrigger value="reports">Risk Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="wizard" className="mt-6">
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle>Risk Assessment Wizard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Step {currentStep} of 4</span>
                    <span className="text-sm text-muted-foreground">{currentStep * 25}% completed</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${currentStep * 25}%` }}
                    ></div>
                  </div>
                </div>

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="system">Select AI System</Label>
                      <Select value={selectedSystem} onValueChange={setSelectedSystem}>
                        <SelectTrigger className="border-border">
                          <SelectValue placeholder="Select an AI system" />
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

                    <div className="space-y-2">
                      <Label htmlFor="description">Assessment Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the purpose of this assessment..."
                        rows={4}
                        className="border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Assessment Type</Label>
                      <RadioGroup defaultValue="initial">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="initial" id="initial" />
                          <Label htmlFor="initial">Initial Assessment</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="periodic" id="periodic" />
                          <Label htmlFor="periodic">Periodic Review</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="change" id="change" />
                          <Label htmlFor="change">Change-based Assessment</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Impact Assessment</h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Privacy Impact</Label>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">Low</span>
                          <Slider defaultValue={[2]} max={5} step={1} className="flex-1" />
                          <span className="text-sm">High</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Ethical Impact</Label>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">Low</span>
                          <Slider defaultValue={[3]} max={5} step={1} className="flex-1" />
                          <span className="text-sm">High</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Business Impact</Label>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">Low</span>
                          <Slider defaultValue={[4]} max={5} step={1} className="flex-1" />
                          <span className="text-sm">High</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Regulatory Impact</Label>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">Low</span>
                          <Slider defaultValue={[3]} max={5} step={1} className="flex-1" />
                          <span className="text-sm">High</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Likelihood Assessment</h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Technical Vulnerability</Label>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">Low</span>
                          <Slider defaultValue={[2]} max={5} step={1} className="flex-1" />
                          <span className="text-sm">High</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Data Quality Issues</Label>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">Low</span>
                          <Slider defaultValue={[3]} max={5} step={1} className="flex-1" />
                          <span className="text-sm">High</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>External Threats</Label>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">Low</span>
                          <Slider defaultValue={[1]} max={5} step={1} className="flex-1" />
                          <span className="text-sm">High</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Human Error</Label>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">Low</span>
                          <Slider defaultValue={[4]} max={5} step={1} className="flex-1" />
                          <span className="text-sm">High</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Mitigation Strategies</h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="technical">Technical Controls</Label>
                        <Textarea
                          id="technical"
                          placeholder="Describe technical controls to mitigate risks..."
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="procedural">Procedural Controls</Label>
                        <Textarea
                          id="procedural"
                          placeholder="Describe procedural controls to mitigate risks..."
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="monitoring">Monitoring Plan</Label>
                        <Textarea id="monitoring" placeholder="Describe how risks will be monitored..." rows={3} />
                      </div>
                    </div>

                    <div className="pt-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Risk Score Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-48 mb-4">
                            <BarChart />
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-lg font-medium">
                                Overall Risk Score: <span className="text-amber-500">Medium</span>
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Based on impact and likelihood assessments
                              </p>
                            </div>
                            <Button>
                              <Download className="mr-2 h-4 w-4" />
                              Export Report
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="border-border"
                  >
                    Previous
                  </Button>

                  {currentStep < 4 ? <Button onClick={handleNext}>Next</Button> : <Button>Complete Assessment</Button>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <Card className="border border-border shadow-sm">
              <CardHeader>
                <CardTitle>Risk Assessment Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((report) => (
                    <div key={report} className="flex items-center justify-between p-4 border rounded-lg border-border">
                      <div className="flex items-center gap-3">
                        <FileText className="h-6 w-6 text-primary" />
                        <div>
                          <p className="font-medium">Risk Assessment Report #{report}</p>
                          <p className="text-sm text-muted-foreground">
                            {report === 1 ? "Chatbot A" : report === 2 ? "Model B" : "Recommendation Engine"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={report === 1 ? "destructive" : report === 2 ? "default" : "secondary"}>
                          {report === 1 ? "High" : report === 2 ? "Medium" : "Low"}
                        </Badge>
                        <Button variant="outline" size="sm" className="border-border">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
