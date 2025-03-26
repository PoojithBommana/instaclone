import React, { useState, useEffect } from "react";
import "../styling/post.css";

const Post = () => {
  const [posts, setPosts] = useState([]); // Store all posts
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [updatedComment, setUpdatedComment] = useState("");
  const token = localStorage.getItem("token");

  // Fetch all posts with their comments
  useEffect(() => {
    
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts", { // Changed to fetch all posts
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setPosts(data || []); // Assuming backend returns { posts: [...] }
      } else {
        console.error("Failed to fetch posts:", data.message);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Add a new comment
  const addComment = async (postId) => {
    if (!newComment.trim()) return;

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          postId,
          sentence: newComment 
        }),
      });

      const newCmt = await res.json();
      if (res.ok) {
        setPosts((prev) =>
          prev.map((post) =>
            post._id === postId
              ? { ...post, comments: [...(post.comments || []), newCmt] }
              : post
          )
        );
        setNewComment("");
      } else {
        console.error("Failed to add comment:", newCmt.message);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Edit a comment
  const updateComment = async (postId, commentId) => {
    if (!updatedComment.trim()) return;

    try {
      const res = await fetch("/api/comments", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          postId,
          commentId,
          sentence: updatedComment 
        }),
      });

      if (res.ok) {
        setPosts((prev) =>
          prev.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  comments: post.comments.map((comment) =>
                    comment._id === commentId
                      ? { ...comment, sentence: updatedComment }
                      : comment
                  ),
                }
              : post
          )
        );
        setEditingComment(null);
        setUpdatedComment("");
      } else {
        console.error("Failed to update comment");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  // Delete a comment
  const deleteComment = async (postId, commentId) => {
    try {
      const res = await fetch("/api/comments", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          postId,
          commentId
        }),
      });

      if (res.ok) {
        setPosts((prev) =>
          prev.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  comments: post.comments.filter((c) => c._id !== commentId),
                }
              : post
          )
        );
      } else {
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <>
      {posts.map((data) => (
        <div key={data._id} className="post-container">
          <div className="post-image">
            <div className="background"></div>
            <div className="players">
              <img src={data.post_media} alt="Post" width={400} height={500} />
            </div>
          </div>

          <div className="post-info">
            <p className="likes">{data.likes} likes</p>
            <p className="caption">
              <span className="bold">{data.username}</span>
            </p>

            <div className="comments-section">
              {data.comments?.length > 0 ? (
                data.comments.map((comment) => (
                  <div key={comment._id} className="comment">
                    {editingComment === comment._id ? (
                      <>
                        <input 
                        style={{ backgroundColor: "white" }}

                          type="text"
                          value={updatedComment}
                          onChange={(e) => setUpdatedComment(e.target.value)}
                        />
                        <button onClick={() => updateComment(data._id, comment._id)}>✔️</button>
                        <button onClick={() => setEditingComment(null)}>❌</button>
                      </>
                    ) : (
                      <>
                        <p>{comment.sentence}</p>
                        <button
                          onClick={() => {
                            setEditingComment(comment._id);
                            setUpdatedComment(comment.sentence);
                          }}
                        >
                          ✏️
                        </button>
                        <button onClick={() => deleteComment(data._id, comment._id)}>🗑️</button>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>

            <div className="add-comment">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
              />
              <button onClick={() => addComment(data._id)}>Send</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Post;