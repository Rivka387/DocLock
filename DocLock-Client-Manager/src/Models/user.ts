import { Roles } from "./roles";

export class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string,
        public filesId: number[],
        public isActive: boolean,
        public roles: Roles[]
    ) { }
}

export type partOfUser=Partial<User>;