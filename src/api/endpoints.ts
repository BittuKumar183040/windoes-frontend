export const API_ENDPOINTS = {
  USERS: {
    BY_KEYWORD: (keyword: string) => `/users/keyword/${keyword}`,
  },
  AUTH: {
    LOGIN: '/auth/login',
  },
} as const;