export declare class TracksController {
    getItems(): Promise<{
        data: import("./Tracks.model").Track[];
    }>;
    getItem(id: string): {
        message: string;
        id: string;
    };
    createItem(body: {
        name: string;
        age: number;
        email: string;
    }): Promise<{
        data: import("mongoose").Document<unknown, {}, import("@/modules/wallapop/models/User.model").IUser> & import("@/modules/wallapop/models/User.model").IUser & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    updateItem(id: string, body: any): {
        message: string;
        id: string;
        body: any;
    };
    deleteItem(id: string): {
        message: string;
        id: string;
    };
}
