export const mockRiskAssessmentsData = {
  systems: [
    { value: "chatbot-a", label: "Chatbot A" },
    { value: "model-b", label: "Model B" },
    { value: "system-c", label: "System C" },
    { value: "recommendation-engine", label: "Recommendation Engine" },
    { value: "sentiment-analyzer", label: "Sentiment Analyzer" },
  ],
  reports: [
    {
      id: 1,
      system: "Chatbot A",
      riskLevel: "High",
      date: "2024-03-15",
    },
    {
      id: 2,
      system: "Model B",
      riskLevel: "Medium",
      date: "2024-02-20",
    },
    {
      id: 3,
      system: "Recommendation Engine",
      riskLevel: "Low",
      date: "2024-01-10",
    },
  ],
  riskDistribution: [
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
  ],
}
