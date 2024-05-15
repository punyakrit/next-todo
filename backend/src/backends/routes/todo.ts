import express from'express'
import { authMiddleware } from '../middleware'
import { taskSchema } from '../db'
const route = express.Router()

route.post('/',authMiddleware,async(req,res)=>{
    const body = req.body
    try{
        const task = await taskSchema.create({
            userId: req.userId,
            title: body.title,
            description: body.description,
            isDone: false
        })
        res.json({
            message:"Task Added"
        })
    }catch(error){
        res.json({
            message:"task error",
            error
        })
    }

})

route.get('/dummy',async(req,res)=>{
      
        res.json({
            message:"Dummy task"
        })
    

})

route.get('/',authMiddleware,async(req,res)=>{
    try{
      const task = await taskSchema.find({
        userId: req.userId
      })
        res.json({
            task
        })
    }catch(error){
        res.json({
            message:"task error",
            error
        })
    }

})

route.put('/:id', authMiddleware, async (req, res) => {
    const taskId = req.params.id;
    const { title, description, isDone } = req.body;

    try {
        const task = await taskSchema.findByIdAndUpdate(
            taskId,
            { title, description, isDone }, // Include isDone in the update object
            { new: true } // Return the updated document
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task updated", task });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

route.delete('/:id', authMiddleware, async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await taskSchema.findByIdAndDelete(taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted", task });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});


export default route