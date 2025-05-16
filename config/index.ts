/**
 * Application configuration
 */
export const config = {
  // API Configuration
  api: {
    // Base URL for API endpoints
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com",

    // API endpoints
    endpoints: {
      dashboard: "/dashboard",
      aiSystems: "/ai-systems",
      riskAssessments: "/risk-assessments",
      policies: "/policies",
      incidents: "/incidents",
      users: "/users",
    },

    // Authentication settings
    auth: {
      tokenKey: "aims_auth_token",
      refreshTokenKey: "aims_refresh_token",
    },

    // Request timeout in milliseconds
    timeout: 30000,

    // Toggle between mock data and actual API
    useMockData: true,
  },

  // Feature flags
  features: {
    enableNotifications: true,
    enableExports: true,
    enableSharing: true,
  },

  // UI Configuration
  ui: {
    itemsPerPage: 10,
    dateFormat: "yyyy-MM-dd",
    timeFormat: "HH:mm",
  },
}
