export const API_ENDPOINTS = {
  USERS: {
    BY_KEYWORD: (keyword: string) => `/users/keyword/${keyword}`,
    BY_USERNAME: (username: string) => `/users/username/${username}/check`,
    REGISTER: () => '/users'
  },
  IMAGE: {
    BY_FILETAG: (id: string, fileTag: string, status: string) => `/users/id/${id}/file/${fileTag}/download?status=${status}`,
    UPLOAD: (id: string) => `/users/id/${id}/file/upload`
  },
  AUTH: {
    LOGIN: '/auth/login',
  },
  FILESYSTEM: {
    OVERVIEW: () => '/filesystem',
    BY_FOLDER: (folder_id:string | null) => `/filesystem/folder${folder_id ? "/"+folder_id : ""}`,
    FOLDER: () => `/filesystem/folder`,
    BY_ID: (id:string) => `/filesystem/${id}`,
  }
} as const;