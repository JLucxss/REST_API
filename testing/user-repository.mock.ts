import { getRepositoryToken } from "@nestjs/typeorm";
import { jest } from "@jest/globals";
import { User } from "../src/user/entity/user.entity";
import { userEntityList } from "./user-entity-list.mock";

export const userRopositoryMock = {
    provide: getRepositoryToken(User),
    useValue: {
        exists: jest.fn<() => Promise<boolean>>().mockResolvedValue(true),
        create: jest.fn(),
        save: jest.fn<() => Promise<User>>().mockResolvedValue(userEntityList[0]),
        find: jest.fn<() => Promise<User[]>>().mockResolvedValue(userEntityList),
        findOneBy: jest.fn<() => Promise<User>>().mockResolvedValue(userEntityList[0]),
        update: jest.fn<() => Promise<User>>().mockResolvedValue(userEntityList[0]),
        delete: jest.fn<() => Promise<boolean>>().mockResolvedValue(true),
    }
}