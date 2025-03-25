import React, { useEffect, useState } from "react";
import "../styling/post.css";
// import "./UserList.css"; // Import the separate CSS file

const UserList = ({data}) => {
  const [users, setUsers] = useState([]); // Default to empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {username, profile_pic, likes, comments, post_media} = data
  console.log(username, profile_pic, likes, comments, post_media)

  // Fetch users from the GET API
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch("/api/posts");
  //       const data = await response.json();
  //       console.log(data)
  //       if (response.ok) {
  //         // Check if the data structure is correct and contains users
  //         if (Array.isArray(data.data)) {
  //           setUsers(data.data); // Assuming 'data' contains an array of users
  //         } else {
  //           setError("Received data is not in the expected format.");
  //         }
  //       } else {
  //         setError(data.message || "Failed to fetch users");
  //       }
  //     } catch (err) {
  //       setError("Failed to fetch users");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  // If still loading, show loading state
  if (loading) return <div>Loading...</div>;

  // If there's an error, show error message
  if (error) return <div>{error}</div>;

  return (
    <div className="post-container">
    {/* Main Image Section */}
    <div className="post-image">
      <div className="background"></div>

      {/* Logos */}
      <div className="logos">
        {/* <Image src="/puma.png" alt="Puma Logo" width={50} height={30} />
        <Image src="/rcb.png" alt="RCB Logo" width={50} height={30} /> */}
      </div>

      {/* Players */}
      <div className="players">
        <img src = {post_media} alt="RCB Matchday" width={400} height={500} />
      </div>
    </div>

    {/* Instagram-style Caption & Engagement */}
    <div className="post-info">
      <p className="likes">{likes} likes</p>
      <p className="caption">
        <span className="bold">{username}</span> 
        <span className="highlight"> @royalchallengers.bengaluru</span>
      </p>
      <p className="comments">View all {comments} comments</p>
      <p className="add-comment">Add a comment...</p>
    </div>
  </div>
    // <h1 style={{color: "white"}}>Hello Wolrd</h1>
  );
};

export default UserList;
