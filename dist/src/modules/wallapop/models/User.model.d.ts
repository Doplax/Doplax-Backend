import { Document } from "mongoose";
export interface IUser extends Document {
    email: string;
    password: string;
}
declare const User: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser> & IUser & {
    _id: import("mongoose").Types.ObjectId;
}, any>;
export default User;
