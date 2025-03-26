import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import clientPromise from "../../../../lib/mongodb";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";
const COLLECTIONS = ["posts"];

// Helper: Validate ObjectId
const isValidObjectId = (id) => ObjectId.isValid(id);

// Helper: Authenticate User
const authenticateUser = (req) => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY);
};

// Helper: Connect to DB and get collection
const getDatabase = async () => {
  const client = await clientPromise;
  return client.db("instabase");
};

// 📌 GET: Fetch all posts with comments
export async function GET(req) {
  try {
    authenticateUser(req);

    const db = await getDatabase();
    const collection = db.collection("posts");
    const posts = await collection.find({}).toArray();

    // Transform _id to string and remove MongoDB _id
    const formattedPosts = posts.map(post => ({
      ...post,
      id: post._id.toString(),
      _id: post._id.toString(),
      comments: post.comments?.map(comment => ({
        ...comment,
        _id: comment._id.toString()
      })) || []
    }));

    return new Response(JSON.stringify({ posts: formattedPosts }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: error.message.includes("Unauthorized") ? 401 : 500,
    });
  }
}

// 📌 POST: Add a comment
export async function POST(req) {
  try {
    authenticateUser(req);
    const { postId, sentence } = await req.json();
    if (!postId || !sentence) throw new Error("Post ID and sentence are required");

    // Validate postId format
    if (!ObjectId.isValid(postId)) throw new Error("Invalid Post ID format");

    const db = await getDatabase();
    const collection = db.collection("posts");

    const newComment = {
      _id: new ObjectId(),
      sentence,
      likes: 0,
      replies: []
    };

    const result = await collection.updateOne(
      { _id: new ObjectId(postId) },
      { $push: { comments: newComment } }
    );

    if (!result.modifiedCount) throw new Error("Post not found or comment not added");

    return new Response(JSON.stringify(newComment), { 
      status: 200 
    });
  } catch (error) {
    console.error("Error in POST:", error.message);
    return new Response(JSON.stringify({ message: error.message }), { 
      status: 500 
    });
  }
}

// 📌 PUT: Edit a comment
export async function PUT(req) {
  try {
    authenticateUser(req);
    const { postId, commentId, sentence } = await req.json();
    if (!postId || !commentId || !sentence) {
      throw new Error("Post ID, Comment ID, and sentence are required");
    }

    const db = await getDatabase();
    const collection = db.collection("posts");

    const result = await collection.updateOne(
      { _id: new ObjectId(postId), "comments._id": new ObjectId(commentId) },
      { $set: { "comments.$.sentence": sentence } }
    );

    if (!result.modifiedCount) throw new Error("Comment not found or failed to update");

    return new Response(JSON.stringify({ message: "Comment updated successfully" }), { 
      status: 200 
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { 
      status: 500 
    });
  }
}

// 📌 DELETE: Remove a comment
export async function DELETE(req) {
  try {
    authenticateUser(req);
    const { postId, commentId } = await req.json();
    if (!postId || !commentId) throw new Error("Post ID and Comment ID are required");

    const db = await getDatabase();
    const collection = db.collection("posts");

    const result = await collection.updateOne(
      { _id: new ObjectId(postId) },
      { $pull: { comments: { _id: new ObjectId(commentId) } } }
    );

    if (!result.modifiedCount) throw new Error("Comment not found or failed to delete");

    return new Response(JSON.stringify({ message: "Comment deleted successfully" }), { 
      status: 200 
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { 
      status: 500 
    });
  }
}