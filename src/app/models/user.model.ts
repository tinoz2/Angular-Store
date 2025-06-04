export interface User {
    id: number;
    username: string;
    email: string;
    name?: string;
    avatarUrl?: string;
    createdAt?: Date;
}