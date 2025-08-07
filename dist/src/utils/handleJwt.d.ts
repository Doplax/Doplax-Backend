interface User {
    _id: string;
    [key: string]: any;
}
export declare const tokenSign: (user: User) => Promise<string>;
export declare const verifyToken: (tokenJwt: string) => Promise<any>;
export {};
