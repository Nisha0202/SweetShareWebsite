import { connect } from '@/utils/database';
import User from '@/models/user';
import { NextResponse } from 'next/server';

connect();

//check if email already logged in 
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ exists: true }, { status: 200 });
    }

    return NextResponse.json({ exists: false }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error. Please try again." }, { status: 500 });
  }
}
