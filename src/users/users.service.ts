import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "1111",
            "email": "example@gmail.com",
            "role" : "ADMIN",
        },
        {
            "id": 2,
            "name": "2222",
            "email": "example@gmail.com",
            "role" : "INTERN",
        },
        {
            "id": 3,
            "name": "3333",
            "email": "example@gmail.com",
            "role" : "ENGINEER",
        },
        {
            "id": 4,
            "name": "4444",
            "email": "example@gmail.com",
            "role" : "ENGINEER",
        },
        {
            "id": 5,
            "name": "5555",
            "email": "example@gmail.com",
            "role" : "INTERN",
        }
    ];

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.users.filter(user => user.role === role);
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        return user;
    }

    create(user: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id)

        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user
        };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updatedUser: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return {...user, ...updatedUser};
            }
            return user;
        });

        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);

        this.users = this.users.filter(user => user.id !== id)

        return removedUser;
    }

}
