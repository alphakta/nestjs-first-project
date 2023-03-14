import { Injectable } from '@nestjs/common';
import { data } from 'src/data';
import { IUser } from '../interfaces/user.interface';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
    private readonly users: IUser[] = [];
    private hasError: boolean;

    constructor() { 
        this.getData()
    }

    create(user: IUser): void { this.users.push(user); }

    getData(): void {
        if (this.hasError)
            return

        data.map((user) => this.create(this.formatRowApiData(user)))
    }

    formatRowApiData(dataElement: any): IUser {
        if (!dataElement.id || !dataElement.nom || !dataElement.prenom || !dataElement.email) this.hasError = false

        const user = new User();
        user.id = parseInt(dataElement.id);
        user.lastName = dataElement.nom;
        user.firstName = dataElement.prenom;
        user.email = dataElement.email;
        return user;
    }

    findAll(): IUser[] { return this.users; }

    findOne(id: number) : IUser { return this.users.find((el) => el.id === id); }

    update(id: number, newUser: IUser): boolean {
        try {
            const itemToUpdateIndex = this.users.findIndex((el) => el.id === id);
            this.users[itemToUpdateIndex] = newUser;
            return true;
        } catch (e) {
            return false;
        }
    }

    delete(id: number): boolean {
        try {
            const itemToDeleteIndex = this.users.findIndex((el) => el.id === id);
            delete this.users[itemToDeleteIndex];
            return true;
        } catch (e) {
            return false;
        }
    }
}
