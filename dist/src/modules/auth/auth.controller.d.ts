import { IUser } from '@/modules/wallapop/models/User.model';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthController {
    register(registerDto: RegisterDto): Promise<{
        data: {
            token: string;
            user: import("mongoose").Document<unknown, {}, IUser> & IUser & {
                _id: import("mongoose").Types.ObjectId;
            };
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    getAllUsers(): Promise<(import("mongoose").Document<unknown, {}, IUser> & IUser & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
