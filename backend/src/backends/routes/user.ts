import express from 'express'
import { authMiddleware } from '../middleware'
import { UserModel } from '../db'
const route = express.Router()

route.get('/',authMiddleware, async (req, res) => {
    try {
        const userDetails = await UserModel.findById({
            _id:req.userId
        }); 
        res.json({
            message: "User Details",
            userDetails
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
});


export default route