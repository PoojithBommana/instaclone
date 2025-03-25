import React from "react";
import "../styling/sidebar.css"; // Import CSS for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faCompass, faFilm, faEnvelope, faHeart, faPlusSquare, faBars } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1 className="logo">Instagram</h1>
      <ul>
        <li className="active">
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faSearch} />
          <span>Search</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faCompass} />
          <span>Explore</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faFilm} />
          <span>Reels</span>
        </li>
        <li className="messages">
          <FontAwesomeIcon icon={faMessage} />
          <span>Messages</span>
          <span className="notification">2</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faHeart} />
          <span>Notifications</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faPlusSquare} />
          <span>Create</span>
        </li>
        <li>
          <img src="https://media.licdn.com/dms/image/v2/D5603AQF-OgSxytCBEg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722085816615?e=2147483647&v=beta&t=CsrlfjzE8t08N4P09rm69XDlY179wO8r5a6vmQpKz3s" alt="Profile" className="profile-pic" />
          <span>Profile</span>
        </li>
      </ul>
      <div className="more">
        <FontAwesomeIcon icon={faBars} />
        <span>More</span>
      </div>
    </div>
  );
};

export default Sidebar;
