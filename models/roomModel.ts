export interface Room {
    id: string;
    ownerId: string;
    reviewId: string;
    reservationId: string;
    title: string;
    description: string;
    location: string;
    availability: boolean;
    price: number;
    numBeds: number;
    numPeople: number;
    type: TypeRoom;
  }
  
  export enum TypeRoom {
    QuartoPrivado = "quarto privado",
    QuartoPartilhado = "quarto partilhado",
    Apartamento = "apartamento",
    Casa = "casa",
    Moradia = "moradia",
  }
  