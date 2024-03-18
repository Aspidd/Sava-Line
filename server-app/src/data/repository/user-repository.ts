/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoGenericRepository } from './mongo-generic-repository';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user.model';

@Injectable()
export class UserRepository extends MongoGenericRepository<User> {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {
        super(userModel);
    }

    async count(field: string, filter: any = {}): Promise<number> {
        const countObject: User[] = await this.userModel.aggregate([
            { $match: { ...filter, isDeleted: false } },
            { $count: field },
        ]);

        const count: number = countObject.length > 0 ? countObject[0][field] : 0;
        return count;
    }
}
