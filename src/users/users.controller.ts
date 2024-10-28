import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') //routs that this controller provides to use http://users/anyActions
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get() // localhost:3000/users  or /users?role=value (role is optional query paramater)
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
        return this.usersService.findAll(role);
    }

    @Get(':id') // localhost:3000/users/1 (1 is exampleId)
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.usersService.findOne(id);
    }

    @Post() // localhost:3000/users/ Body has to have type like here example user that is empty object 
    create(@Body() user: CreateUserDto){
        return this.usersService.create(user);
    }

    @Patch(':id') // localhost:3000/users/1 (1 is exampleId & Body becouse we need that id to find a user and body to update any information) 
    update(@Param('id', ParseIntPipe) id: number, @Body() userUpdate: UpdateUserDto){
        return this.usersService.update(id, userUpdate);
    }

    @Delete(':id') // localhost:3000/users/1 (1 is exampleId)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.usersService.delete(id);
    }
    
}
