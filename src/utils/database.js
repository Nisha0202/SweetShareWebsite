import mongoose from "mongoose";

let isConnected=false

const uri = `mongodb+srv://Admin:Admin0202@cluster0.5cua0xk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export const connectToDB=async()=>{
    mongoose.set('strictQuery',true)

    if(isConnected){
        console.log("Mongo is already connected")
        return
    }else{
        console.log("Mongo has failed connected")
    }

    try{
        await mongoose.connect(uri)

        isConnected=true
        console.log("connected to mongodb")
    }
    catch(e){
        console.log(e)
    }



}