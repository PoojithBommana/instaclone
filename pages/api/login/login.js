import clientPromise from "../../../lib/mongodb";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET; // Store in .env.local

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("instabase");
    const usersCollection = db.collection("user");

    let user = await usersCollection.findOne({ email });
    if (!user) {
      await usersCollection.insertOne({ email, password });
      user = await usersCollection.findOne({ email });
    } else if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}