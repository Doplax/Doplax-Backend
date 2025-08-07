export declare class EmailController {
    contactMe(body: {
        name: string;
        email: string;
        message: string;
    }): Promise<{
        data: {
            success: boolean;
            error?: any;
        };
    }>;
}
