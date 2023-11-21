export type Events = {
    eventId?: number
    firstName: string
    lastName: string
    eventType: string
    eventDate: Date
}

// export type PostEvents = {
//     eventId?: number
//     firstName: string
//     lastName: string
//     eventType: string
//     eventDate: Date
// }

export type ErrorResponse = {
    error: string
    status: string
}

export type EventFormData = {
    eventId?: number
    firstName: string
    lastName: string
    eventSelectType: string
    eventType: string
    eventDate?: Date | null
}

export type EventFormErrorState = {
    firstNameError: boolean
    lastNameError: boolean
    eventSelectTypeError: boolean
    eventTypeError: boolean
    eventDateError: boolean
}
