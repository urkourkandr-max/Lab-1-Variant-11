export interface User {
    id: number
    name: string
    email: string
    role: string
    deleted?: boolean
}

export interface CreateUserRequestDto {
    name: string
    email: string
    role: string
}

export interface UpdateUserRequestDto {
    name?: string
    email?: string
    role?: string
}

export interface UserResponseDto {
    id: number
    name: string
    email: string
    role: string
}