import { Response } from "express";
declare const handleHttpError: (res: Response, message?: string, code?: number) => void;
export default handleHttpError;
