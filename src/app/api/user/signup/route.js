import { connect } from '@/utils/database';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

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
  
      return NextResponse.json({ message: "New User Created", success: true });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Internal Server Error. Please try again." }, { status: 500 });
    }
  }