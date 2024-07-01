import { connect } from '@/utils/database';
import User from '@/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Import JWT library
import { NextResponse } from 'next/server';
import { sendEmail } from "@/helpers/mailer";
connect();

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    
        //send verification email

        await sendEmail({email, emailType: "VERIFY", userId: newUser._id})

    // Generate token
    const tokenData = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN, { expiresIn: '7d' }); // Adjust token expiration as needed

    const response = NextResponse.json({
      message: "User created successfully",
      success: true,
      newUser
  })
  response.cookies.set("token", token, {
      httpOnly: true, 
      
  })
  return response;
   // return NextResponse.json({ message: "New User Created", success: true, token }); // Include token in response
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error. Please try again." }, { status: 500 });
  }
}


// import { connect } from '@/utils/database';
// import User from '@/models/user';
// import { NextResponse } from 'next/server';
// import bcrypt from 'bcrypt';

// connect();

// export async function POST(req) {
//     try {
//       const body = await req.json();
//       const { username, email, password } = body;
//       // Hash password
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);
  
//       const newUser = new User({
//         username,
//         email,
//         password: hashedPassword,
//       });
  
//       await newUser.save();
  
//       return NextResponse.json({ message: "New User Created", success: true });
//     } catch (error) {
//       console.error(error);
//       return NextResponse.json({ error: "Internal Server Error. Please try again." }, { status: 500 });
//     }
//   }