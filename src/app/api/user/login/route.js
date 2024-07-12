import { connect } from '@/utils/database';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

connect();

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    //fetch
    const user = await User.findOne({ email });

    // Hash password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ message: "Wrong Credientials.", success: false }, { status: 400 });
    }
    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    }

    // Option to prevent dots in the token
    const token = jwt.sign(tokenData, process.env.TOKEN, {
      expiresIn: '7d',
      // Ensure no dots in the resulting token
      jwtid: 'unique-id-without-dots'
    });


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
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}


