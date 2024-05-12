import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token

    if(!token){
        console.log(token)
        return res.status(403).json({
            message: "Not authenticated"
        });
    }
    try{

        const decoded:any = jwt.verify(token,"mypassword")
        if(decoded){
            const uId = decoded.userId
            req.userId = uId
            console.log(token)
            next()
        }else{
            res.json({
                message:"Invalid token",
            })
        }
    }catch(error){
        res.json({
            message:"Error occured",
            error
        })
    }


    next()
}