import { config } from "@/config"

// Error class for API errors
export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
    this.name = "ApiError"
  }
}

// Generic fetch function with error handling
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const url = `${config.api.baseUrl}${endpoint}`

    // Default options
    const defaultOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    }

    // Add auth token if available
    const token = localStorage.getItem(config.api.auth.tokenKey)
    if (token) {
      defaultOptions.headers = {
        ...defaultOptions.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    // Set timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), config.api.timeout)

    const response = await fetch(url, {
      ...defaultOptions,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new ApiError(`API error: ${response.statusText}`, response.status)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new ApiError("Request timeout", 408)
      }
      throw new ApiError(error.message, 500)
    }

    throw new ApiError("Unknown error", 500)
  }
}

// Data fetching functions
export const api = {
  // Dashboard data
  async getDashboardData() {
    if (config.api.useMockData) {
      const { mockDashboardData } = await import("@/mock/dashboard")
      return mockDashboardData
    }

    return fetchApi(config.api.endpoints.dashboard)
  },

  // AI Systems
  async getAiSystems() {
    if (config.api.useMockData) {
      const { mockAiSystemsData } = await import("@/mock/ai-systems")
      return mockAiSystemsData
    }

    return fetchApi(config.api.endpoints.aiSystems)
  },

  async createAiSystem(data: any) {
    if (config.api.useMockData) {
      const { mockAiSystemsData } = await import("@/mock/ai-systems")
      return {
        ...data,
        id: String(mockAiSystemsData.length + 1),
      }
    }

    return fetchApi(config.api.endpoints.aiSystems, {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  async updateAiSystem(id: string, data: any) {
    if (config.api.useMockData) {
      return { ...data, id }
    }

    return fetchApi(`${config.api.endpoints.aiSystems}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  async deleteAiSystem(id: string) {
    if (config.api.useMockData) {
      return { success: true }
    }

    return fetchApi(`${config.api.endpoints.aiSystems}/${id}`, {
      method: "DELETE",
    })
  },

  // Policies
  async getPolicies() {
    if (config.api.useMockData) {
      const { mockPoliciesData } = await import("@/mock/policies")
      return mockPoliciesData
    }

    return fetchApi(config.api.endpoints.policies)
  },

  async createPolicy(data: any) {
    if (config.api.useMockData) {
      const { mockPoliciesData } = await import("@/mock/policies")
      return {
        ...data,
        id: String(mockPoliciesData.length + 1),
      }
    }

    return fetchApi(config.api.endpoints.policies, {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  // Incidents
  async getIncidents() {
    if (config.api.useMockData) {
      const { mockIncidentsData } = await import("@/mock/incidents")
      return mockIncidentsData
    }

    return fetchApi(config.api.endpoints.incidents)
  },

  async createIncident(data: any) {
    if (config.api.useMockData) {
      const { mockIncidentsData } = await import("@/mock/incidents")
      return {
        ...data,
        id: String(mockIncidentsData.length + 1),
      }
    }

    return fetchApi(config.api.endpoints.incidents, {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  // Risk Assessments
  async getRiskAssessments() {
    if (config.api.useMockData) {
      const { mockRiskAssessmentsData } = await import("@/mock/risk-assessments")
      return mockRiskAssessmentsData
    }

    return fetchApi(config.api.endpoints.riskAssessments)
  },

  async createRiskAssessment(data: any) {
    if (config.api.useMockData) {
      return {
        ...data,
        id: Math.floor(Math.random() * 1000),
      }
    }

    return fetchApi(config.api.endpoints.riskAssessments, {
      method: "POST",
      body: JSON.stringify(data),
    })
  },
}
