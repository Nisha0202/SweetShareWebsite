import { connect } from '@/utils/database';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

connect();

export async function POST(req) {

    
  try {
    const body = await req.json();
    const {email, password } = body;

    // Check if user not exists
    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ message: "User is not Signed in.", success: false}, {status: 400});
    }

    // Hash password

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword){
        return NextResponse.json({ message: "Wrong Credientials.", success: false}, {status: 400});
    }
            //create token data
            const tokenData = {
              id: user._id,
              username: user.username,
              email: user.email
          }
          //create token
          const token = jwt.sign(tokenData, process.env.TOKEN, { expiresIn: "7d" });
  
          const response = NextResponse.json({
              message: "Login successful",
              success: true,
          })
          response.cookies.set("token", token, {
              httpOnly: true, 
              
          })
          return response;
  
      } catch (error) {
        console.log('jo');
          return NextResponse.json({error: error.message}, {status: 500})
      }
  }


