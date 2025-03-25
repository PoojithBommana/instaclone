"use client";
import React, { useEffect , useState} from "react";
import { useRouter } from "next/navigation";
import Layout from '../components/layout.js';
import StorySection from "../components/storysection.js";
import Post from "../components/post.js";
import SuggestedUsers from "../components/suggested.js";
import '../styling/global.css'

const posts = [
  { id: 1, username: "yours.tej", caption: "Finding Myself", image: "/post1.jpg" },
];

const Homepage = () => {
  const router = useRouter();

  const [postsData, setPostsData] = useState([]);

  // useEffect(() => {
  //   const isAuthenticated = localStorage.getItem("isAuthenticated");
  //   if (!isAuthenticated) {
  //     router.push("/"); // Redirect to login if not authenticated
  //   }
  // }, []);

  useEffect(()=>{
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();
        setPostsData(data);
        console.log(data)
        if (response.ok) {
          // Check if the data structure is correct and contains users
          if (Array.isArray(data.data)) {
            setUsers(data.data); // Assuming 'data' contains an array of users
          } else {
            // setError("Received data is not in the expected format.");
          }
        } else {
          // setError(data.message || "Failed to fetch users");
        }
      } catch (err) {
        // setError("Failed to fetch users");
      } finally {
        // setLoading(false);
      }
    };

    fetchUsers();
  }, [])

  return (
    <>
    <Layout>
      <div className="home-content">
        <StorySection />
        {postsData.map((post) => (
          <Post key={post.id} data = {post} />

        ))}
      </div>
        <SuggestedUsers />
    </Layout>
     </>
  );
};

export default Homepage;
