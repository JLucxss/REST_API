import { User } from "src/user/entity/user.entity";

export const userEntityList: User[] = [{
    id: 1,
    name: 'John Doe',
    email: 'johntest@gmail.com',
    password: '', //hash
    role: 1,
    createdAt: new Date(),
    updatedAt: new Date()
},
{
    id: 2,
    name: 'John Doee',
    email: 'johnteste@gmail.com',
    password: '', //hash
    role: 1,
    createdAt: new Date(),
    updatedAt: new Date()
},]