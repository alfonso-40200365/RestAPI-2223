export interface Event {
    id: string;
    ownerId: string;
    reviewId: string;
    title: string;
    description: string;
    location: string;
    date: Date;
    type: TypeEvent;
  }
  
  export enum TypeEvent {
    Lazer = "lazer",
    Cultural = "cultural",
    Academico = "academico",
    Gala = "gala",
  }
  