import { MongoClient } from "mongodb";

const MONGO_URI = "mongodb+srv://sattupranay:poojith12345@cluster0.q9n3y.mongodb.net/yourDBname?retryWrites=true&w=majority"; // Replace with your actual URI

const DB_NAME = "instabase"; // Your database name

async function testDBConnection() {
    try {
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        console.log("✅ Connected to MongoDB!");
        const db = client.db(DB_NAME);

        // Test fetching a collection
        const collections = await db.listCollections().toArray();
        console.log("Collections:", collections.map(c => c.name));

        await client.close();
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
    }
}

testDBConnection();
