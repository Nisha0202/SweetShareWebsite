import { connect } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from 'bcrypt';
connect()


// export async function POST(request){

//     try {
//         const reqBody = await request.json()
//         const {token} = reqBody
//         const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

//         if (!user) {
//             return NextResponse.json({error: "Invalid token"}, {status: 400})
//         }
//         console.log(user);

//         user.isVerified = true;
//         user.verifyToken = undefined;
//         user.verifyTokenExpiry = undefined;
//         await user.save();

//         return NextResponse.json({
//             message: "Email verified successfully",
//             success: true
//         }).redirected('/');


//     } catch (error) {
//         return NextResponse.json({error: error.message}, {status: 500})
//     }

// }

export async function POST(request) {

    const { token } = await request.json();

    const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });


    if (!user) {
        return new Response(data, {
            message: 'User doesnt exist',
            status: 400,
        });
    }

    if (user.isVerified === true) {
        return new Response(data, {
            message: 'User already verified',
            status: 405,
        });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return new Response(user.isVerified, {
        status: 200,
    });

}