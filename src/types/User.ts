interface User {
    id: string,
    username: string,
    name: string,
    email: string,
    status?: 'ACTIVE',
    createdAt?: number,
    updatedAt?: number
}

export type { User };