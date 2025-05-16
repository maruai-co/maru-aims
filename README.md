# AI Management System Portal

Manage AI responsibly, ethically, and compliantly with ISO 42001.

## Configuration

The application uses a configuration system that allows toggling between mock data and actual API endpoints. This makes the application more maintainable and ready for real API integration.

### Configuration File

The main configuration file is located at `config/index.ts`. It contains settings for:

- API endpoints
- Authentication settings
- Feature flags
- UI configuration
- Toggle between mock data and actual API

\`\`\`typescript
export const config = {
  // API Configuration
  api: {
    // Base URL for API endpoints
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com',
    
    // API endpoints
    endpoints: {
      dashboard: '/dashboard',
      aiSystems: '/ai-systems',
      riskAssessments: '/risk-assessments',
      policies: '/policies',
      incidents: '/incidents',
      users: '/users',
    },
    
    // Authentication settings
    auth: {
      tokenKey: 'aims_auth_token',
      refreshTokenKey: 'aims_refresh_token',
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
    dateFormat: 'yyyy-MM-dd',
    timeFormat: 'HH:mm',
  }
}
\`\`\`

### Mock Data

Mock data is stored in the `mock` directory. Each file contains mock data for a specific feature:

- `dashboard.ts`: Dashboard data
- `ai-systems.ts`: AI systems data
- `policies.ts`: Policies data
- `incidents.ts`: Incidents data
- `risk-assessments.ts`: Risk assessments data

### API Utility

The API utility is located at `lib/api.ts`. It provides functions for fetching data from the API or mock data based on the configuration.

\`\`\`typescript
// Example usage
import { api } from '@/lib/api'

// Fetch dashboard data
const dashboardData = await api.getDashboardData()

// Fetch AI systems
const aiSystems = await api.getAiSystems()

// Create a new AI system
const newSystem = await api.createAiSystem(data)

// Update an AI system
const updatedSystem = await api.updateAiSystem(id, data)

// Delete an AI system
await api.deleteAiSystem(id)
\`\`\`

### Switching Between Mock Data and Actual API

To switch between mock data and actual API, update the `useMockData` setting in the configuration file:

\`\`\`typescript
// Use mock data
api: {
  // ...
  useMockData: true,
}

// Use actual API
api: {
  // ...
  useMockData: false,
}
\`\`\`

## Environment Variables

The application uses the following environment variables:

- `NEXT_PUBLIC_API_BASE_URL`: Base URL for API endpoints

You can set these variables in a `.env.local` file for local development:

\`\`\`
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
\`\`\`

## Development

To run the application in development mode:

\`\`\`bash
npm run dev
\`\`\`

## Build

To build the application for production:

\`\`\`bash
npm run build
\`\`\`

## Start

To start the application in production mode:

\`\`\`bash
npm start
