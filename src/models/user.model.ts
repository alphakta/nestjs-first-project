import { IUser } from "src/interfaces/user.interface";

export class User implements IUser{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}
