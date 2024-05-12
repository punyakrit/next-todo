import mongoose from "mongoose";

mongoose.connect('mongodb+srv://punyakritsinghmakhni:2002%40Anoop@cluster0.8ok11ce.mongodb.net/next-todo')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    verified: {
        type: Boolean,
        require: false,
        default: false
    },
})

export const UserModel = mongoose.model("User", userSchema)


const otpSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
})

export const otpModel = mongoose.model('Otp', otpSchema);


const taskTodo = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    isDone:{
        type:Boolean,
        default:false,
        require:false
    }
})

export const taskSchema = mongoose.model("Task",taskTodo)