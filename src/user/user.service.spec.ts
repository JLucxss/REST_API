import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, it, expect, jest } from "@jest/globals";
import { UserService } from "./user.service";
import { userEntityList } from "../../testing/user-entity-list.mock";
import { userRopositoryMock } from "../../testing/user-repository.mock";
import { createUserDto } from "../../testing/create-user-dto.mock";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { updatePutUserDTO } from "../../testing/update-put-user-dto.mock copy";
import { updatePatchUserDTO } from "../../testing/update-patch-user-dto.mock copy 2";

describe('UserService', () => {

    let userService: UserService;

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                userRopositoryMock   
            ]
        }).compile()

        userService = module.get<UserService>(UserService)
    })

    it('should be defined', () => {
        expect(userService).toBeDefined()
    })

})

describe('Create', () => {

    let userService: UserService;
    let usersRepository: Repository<User>

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                userRopositoryMock   
            ]
        }).compile()

        userService = module.get<UserService>(UserService)
        usersRepository = module.get(getRepositoryToken(User))
    })

    it('Should return the correct data', async () => {

        jest.spyOn(usersRepository, 'exists').mockResolvedValueOnce(false)

        const result = await userService.create(createUserDto)

        expect(result).toEqual(userEntityList[0])
    })

})

describe('Read', () => {

    let userService: UserService;

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                userRopositoryMock   
            ]
        }).compile()

        userService = module.get<UserService>(UserService)
    })

    it('.list should return an array of users', async () => {

        const result = await userService.list()

        expect(result).toEqual(userEntityList)
    })

    it('.readOnde should return one user', async () => {

        const result = await userService.readOne(1)

        expect(result).toEqual(userEntityList[0])
    })

})

describe('Update', () => {

    let userService: UserService;

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                userRopositoryMock   
            ]
        }).compile()

        userService = module.get<UserService>(UserService)
    })

    it('.update', async () => {

        const result = await userService.update(updatePutUserDTO, 1)

        expect(result).toEqual(userEntityList[0])
    })

    it('.partialUpdate', async () => {

        const result = await userService.partialUpdate(updatePatchUserDTO, 1)

        expect(result).toEqual(userEntityList[0])
    })

})
describe('Delete', () => {

    let userService: UserService;

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                userRopositoryMock   
            ]
        }).compile()

        userService = module.get<UserService>(UserService)
    })

    it('Should return true', async () => {

        const result = await userService.delete(1)

        expect(result).toEqual(true)
    })

})
