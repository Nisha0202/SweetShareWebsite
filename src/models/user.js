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
    createdAt: {
        type: String,
        default: () => {
            const now = new Date();
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true // Use 12-hour format with AM/PM
            };
            return now.toLocaleDateString('en-US', options);
        }
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