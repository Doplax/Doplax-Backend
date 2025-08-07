export declare const encrypt: (passwordPlain: string) => Promise<string>;
export declare const compare: (passwordPlain: string, hashPassword: string) => Promise<boolean>;
