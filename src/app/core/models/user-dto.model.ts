import { GenreType } from './genre-type';

export interface UserDto {
    id: number;
    name: string;
    lastName: string;
    secondLastName: string;
    email: string;
    birthDate: string;
    phoneNumber: string;
    genre: GenreType;
    pwd: string;
}
