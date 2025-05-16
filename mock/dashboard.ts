export const mockDashboardData = {
  complianceProgress: 40,
  isoSections: ["Context", "Leadership", "Planning", "Support", "Operation", "Performance Evaluation", "Improvement"],
  aiSystems: [
    {
      name: "Chatbot A",
      purpose: "Customer support",
      department: "Sales",
      riskLevel: "High",
      status: "Deployed",
    },
    {
      name: "Model B",
      purpose: "Fraud detection",
      department: "Finance",
      riskLevel: "Medium",
      status: "In Development",
    },
    {
      name: "System C",
      purpose: "Image recognition",
      department: "R&D",
      riskLevel: "Low",
      status: "Deployed",
    },
  ],
  policyCategories: ["Bias", "Privacy", "Ethics", "Explainability"],
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
