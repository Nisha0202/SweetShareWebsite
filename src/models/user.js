import { Schema,model,models } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

let User;
try {
    // Try to retrieve existing model to avoid OverwriteModelError
    User = models.users || model('users', userSchema);
} catch (error) {
    // If model retrieval fails (likely due to initial load), define new model
    User = model('users', userSchema);
}
export default  User;