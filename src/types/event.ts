export type GetEvents = {
    eventId: number
    name: string
    eventDate: Date
    eventType: string
}

export type PostEvents = {
    firstName: string
    lastName: string
    eventType: string
    eventDate: Date
}

export type ErrorResponse = {
    error: string
    status: string
}
