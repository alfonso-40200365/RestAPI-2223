import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
    userType: any
    userId: any
}

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
    Moradia = "moradia",
    Residencia = "residencia",
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
    likes: { userId: string, like: boolean }[]
}

export interface Reservation {
    id: string
    userId: string
    numPeople: number
    dateStart: Date
    dateEnd: Date
}
