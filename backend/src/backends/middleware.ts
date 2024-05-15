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
    const token = req.cookies.token;
    
    console.log("Middleware in use");

    if (!token) {
        console.log("No token found in cookies");
        return res.status(403).json({
            message: "Not authenticated"
        });
    }

    try {
        const decoded: any = jwt.verify(token, "mypassword");
        if (decoded) {
            req.userId = decoded.userId;
            console.log("Token: " + token);
            next();
        } else {
            return res.status(403).json({
                message: "Token invalid"
            });
        }
    } catch (error) {
        return res.status(403).json({
            message: "Invalid token"
        });
    }
};
