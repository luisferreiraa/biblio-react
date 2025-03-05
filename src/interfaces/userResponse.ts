import {User} from "./user.ts";

export interface UserResponse {
    content: User[];
    pageable: object;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}