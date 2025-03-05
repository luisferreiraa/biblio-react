export interface DecodedToken {
    id?: string;
    iss: string;
    sub: string;
    role: string;
    exp: number;
}