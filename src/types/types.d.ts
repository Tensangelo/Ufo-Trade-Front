export interface User {
    id: number;
    email: string;
    rolId: number;
    idEmployer: number;
    idClient: number;
}

export interface RegisterUserData {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    birthDate?: string;
    genderId: number;
    password: string;
}

export interface Gender {
    id: number;
    name: string;
}

export interface JobPositions {
    id: number;
    name: string;
}