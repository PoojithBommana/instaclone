import React from "react";
import "../styling/storysection.css"; // Import CSS file

const stories = [
  { username: "adiyaaabommana...", imgSrc: "https://media.licdn.com/dms/image/v2/D5603AQF-OgSxytCBEg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722085816615?e=2147483647&v=beta&t=CsrlfjzE8t08N4P09rm69XDlY179wO8r5a6vmQpKz3s" },
  { username: "yours.tej", imgSrc: "https://media.licdn.com/dms/image/v2/D5603AQF-OgSxytCBEg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722085816615?e=2147483647&v=beta&t=CsrlfjzE8t08N4P09rm69XDlY179wO8r5a6vmQpKz3s" },
  { username: "pravalika_...", imgSrc: "https://media.licdn.com/dms/image/v2/D5603AQF-OgSxytCBEg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722085816615?e=2147483647&v=beta&t=CsrlfjzE8t08N4P09rm69XDlY179wO8r5a6vmQpKz3s", hasStory: true },
  { username: "prashanth...", imgSrc: "https://media.licdn.com/dms/image/v2/D5603AQF-OgSxytCBEg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722085816615?e=2147483647&v=beta&t=CsrlfjzE8t08N4P09rm69XDlY179wO8r5a6vmQpKz3s" },
  { username: "ccbp_nxtw...", imgSrc: "https://media.licdn.com/dms/image/v2/D5603AQF-OgSxytCBEg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722085816615?e=2147483647&v=beta&t=CsrlfjzE8t08N4P09rm69XDlY179wO8r5a6vmQpKz3s" },
  { username: "samala_ya...", imgSrc: "https://media.licdn.com/dms/image/v2/D5603AQF-OgSxytCBEg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722085816615?e=2147483647&v=beta&t=CsrlfjzE8t08N4P09rm69XDlY179wO8r5a6vmQpKz3s", hasStory: true },
  { username: "srujana_pe...", imgSrc: "https://media.licdn.com/dms/image/v2/D5603AQF-OgSxytCBEg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722085816615?e=2147483647&v=beta&t=CsrlfjzE8t08N4P09rm69XDlY179wO8r5a6vmQpKz3s" },
  { username: "jaganarts_...", imgSrc: "https://media.licdn.com/dms/image/v2/D5603AQF-OgSxytCBEg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1722085816615?e=2147483647&v=beta&t=CsrlfjzE8t08N4P09rm69XDlY179wO8r5a6vmQpKz3s", hasStory: true, isVideo: true },
];

const StorySection = () => {
  return (
    <div className="story-container">
      {stories.map((story, index) => (
        <div key={index} className="story">
          <div className={`story-border ${story.hasStory ? "active-story" : ""}`}>
            <img src={story.imgSrc} alt={story.username} className="story-img" />
            {story.isVideo && <div className="play-icon">▶</div>}
          </div>
          <p className="story-username">{story.username}</p>
        </div>
      ))}
    </div>
  );
};

export default StorySection;
