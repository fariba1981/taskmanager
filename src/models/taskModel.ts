import { model, Schema, Document } from 'mongoose';
import { IUser } from './userModel';

export interface ITask extends Document {
    title: string;
    description: string;
    owner: IUser["_id"];
    worker: IUser["_id"];
    status: "new" | "assined" | "done"
};

const taskSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    worker: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ["new" , "assined" , "done"],
        default: "new"
    },
});

export default model<ITask>('Task', taskSchema);