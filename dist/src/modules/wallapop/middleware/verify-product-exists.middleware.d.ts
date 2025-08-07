import { Request, Response, NextFunction } from "express";
declare const verifyProductExists: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default verifyProductExists;
