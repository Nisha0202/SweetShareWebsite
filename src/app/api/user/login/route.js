import { connect } from '@/utils/database';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

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


    return NextResponse.json({ message: "User Logged In", success: true });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ error: "Internal Server Error. Please try again." }, { status: 500 });
  }
}
