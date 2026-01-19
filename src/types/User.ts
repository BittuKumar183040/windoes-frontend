interface User {
    id: string,
    username: string,
    name: string,
    email: string,
    status?: 'ACTIVE',
    createdAt?: number,
    updatedAt?: number
}

interface UserRegistrationPayload {
    username: string,
    name: string,
    email: string,
    password: string
}

export type { User, UserRegistrationPayload };