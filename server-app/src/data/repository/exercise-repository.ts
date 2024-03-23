/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exercise } from '../models/exercise.model';
import { MongoGenericRepository } from './mongo-generic-repository';

@Injectable()
export class ExerciseRepository extends MongoGenericRepository<Exercise> {
    constructor(@InjectModel(Exercise.name) private exerciseModel: Model<Exercise>) {
        super(exerciseModel);
    }

    async count(field: string, filter: any = {}): Promise<number> {
        const countObject: Exercise[] = await this.exerciseModel.aggregate([
            { $match: { ...filter} },
            { $count: field },
        ]);

        const count: number = countObject.length > 0 ? countObject[0][field] : 0;
        return count;
    }
}
