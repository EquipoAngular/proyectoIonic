import { GenreType } from './genre-type';

export interface UserResponse {
    id: number;
    name: string;
    lastName: string;
    secondLastName: string;
    email: string;
    birthDate: string;
    phoneNumber: string;
    genre: GenreType;
    fullName: string;
}