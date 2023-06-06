export interface User {
    id: string
    username: string
    password: string
    email: string
    verified: boolean
    type: TypeRole
}

enum TypeRole {
    Admin = "admin",
    Owner = "owner",
    Student = "student",
}

enum TypeRoom {
    QuartoPrivado = "quarto privado",
    QuartoPartilhado = "quarto partilhado",
    Apartamento = "apartamento",
    Casa = "casa",
    Moradia = "moradia",
}

enum TypeEvent {
    Lazer = "lazer",
    Cultural = "cultural",
    Academico = "academico",
    Gala = "gala",
}

export interface Room {
    id: string
    ownerId: string
    reviewId: string
    reservationId: string
    title: string
    description: string
    location: string
    availability: boolean
    price: number
    numBeds: number
    numPeople: number
    type: TypeRoom
}

export interface Event {
    id: string
    ownerId: string
    reviewId: string
    title: string
    description: string
    location: string
    date: Date
    type: TypeEvent
}

export interface Review {
    id: string
    rating: { userId: string, rating: number }[]
    comments: { userId: string, comment: string }[]
    like: { userId: string, like: boolean }[]
}

export interface Reservation {
    id: string
    userId: string
    numPeople: number
    dateStart: Date
    dateEnd: Date
}
