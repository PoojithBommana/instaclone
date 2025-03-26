import clientPromise from "../../../../lib/mongodb";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET; // Securely store this in .env.local

export async function POST(req) { 
  const { email, password } = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db("instabase");
    const usersCollection = db.collection("user"); // Fix: Define usersCollection

    // Check if user exists
    let user = await usersCollection.findOne({ email });

    if (!user) {
      // Create a new user
      await usersCollection.insertOne({ email, password });
      user = await usersCollection.findOne({ email }); // Fetch newly created user
    } else if (user.password !== password) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}