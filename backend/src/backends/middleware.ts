import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.cookies.token;

    if (!authHeader) {
        console.log(authHeader)
        return res.status(403).json({
            message: "Not authenticated"
        });
    }


    try {
        const decoded: any = jwt.verify(authHeader, "mypassword");
        if (decoded) {
            const uId = decoded.userId;
            req.userId = uId;
            console.log(authHeader);
            next();
        } else {
            return res.json({
                message: "Token invalid"
            });
        }
    } catch (error) {
        res.json({
            message: "Invalid token"
        });
    }
};