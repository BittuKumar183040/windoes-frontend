export const API_ENDPOINTS = {
  USERS: {
    BY_KEYWORD: (keyword: string) => `/users/keyword/${keyword}`,
  },
  IMAGE: {
    BY_FILETAG: (id: string, fileTag: string, status: string) => `/users/id/${id}/file/${fileTag}/download?status=${status}`
  },
  AUTH: {
    LOGIN: '/auth/login',
  },
} as const;