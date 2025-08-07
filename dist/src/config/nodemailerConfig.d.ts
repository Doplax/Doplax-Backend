interface MailOptions {
    from?: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
    [key: string]: any;
}
export declare const sendEmail: (mailOptions: MailOptions) => Promise<{
    success: boolean;
    error?: any;
}>;
export {};
