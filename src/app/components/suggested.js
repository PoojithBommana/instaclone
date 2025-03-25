"use client";

import React from "react";
import Image from "next/image";
import "../styling/suggested.css"; // Import CSS file

const SuggestedUsers = () => {
  const users = [
    { username: "preetam._lolugu", followers: "bhuvana_shreyaa", image: "https://i.ibb.co/35xnp24j/manoj2.jpg" },
    { username: "srija_0312", followers: "bhuvana_shreyaa", image: "https://i.ibb.co/35xnp24j/manoj2.jpg" },
    { username: "tanushreddyyy", followers: "chenna2004_pvt", image: "https://i.ibb.co/35xnp24j/manoj2.jpg" },
    { username: "freedomvault_pranav", followers: "kaushik_vuchuru", image: "https://i.ibb.co/35xnp24j/manoj2.jpg" },
    { username: "charitha_reddy_20", followers: "bhuvana_shreyaa", image: "https://i.ibb.co/35xnp24j/manoj2.jpg" }
  ];

  return (
    <div className="container">
      {/* Profile Section */}
      <div className="profile">
        <img src="https://media.licdn.com/dms/image/v2/D5603AQF-OgSxytCBEg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722085816615?e=2147483647&v=beta&t=CsrlfjzE8t08N4P09rm69XDlY179wO8r5a6vmQpKz3s" alt="Profile" width={50} height={50} className="profile-img" />
        <div>
          <p className="username">poojith_bommana</p>
          <p className="sub-username">POOJITH_BOMMANA</p>
        </div>
        <a href="#" className="switch">Switch</a>
      </div>

      {/* Suggested Users */}
      <p className="suggestion-header">
        Suggested for you <a href="#" className="see-all">See All</a>
      </p>

      {users.map((user, index) => (
        <div key={index} className="user">
          <img src={user.image} alt={user.username} width={50} height={50} className="user-img" />
          <div>
            <p className="user-name">{user.username}</p>
            <p className="followers">Followed by {user.followers}</p>
          </div>
          <a href="#" className="follow">Follow</a>
        </div>
      ))}

      {/* Footer Links */}
      <div className="footer">
        <p>About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified</p>
        <p>© 2025 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
};

export default SuggestedUsers;
