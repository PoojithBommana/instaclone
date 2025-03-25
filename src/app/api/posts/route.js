import clientPromise from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("instabase");
    const postsCollection = db.collection("posts"); // Change collection as needed

    // Fetch all posts from MongoDB
    const posts = await postsCollection.find({}).toArray();
console.log(posts)
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching posts", error: error.message },
      { status: 500 }
    );
  }
}
