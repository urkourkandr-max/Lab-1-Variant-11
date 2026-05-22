export interface Duty {
    id: number
    date: string
    time: string
    name: string
    comment: string
    deleted?: boolean
}

export interface CreateDutyRequestDto {
    date: string
    time: string
    name: string
    comment?: string
}

export interface UpdateDutyRequestDto {
    date?: string
    time?: string
    name?: string
    comment?: string
}

export interface DutyResponseDto {
    id: number
    date: string
    time: string
    name: string
    comment: string
}