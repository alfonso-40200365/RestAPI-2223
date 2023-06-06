export interface Review {
    id: string;
    rating: { userId: string; rating: number }[];
    comments: { userId: string; comment: string }[];
    like: { userId: string; like: boolean }[];
  }
  