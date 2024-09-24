import "./../components.css";
import "./../../App.css";
import TimeDisplay from "../../utils/get_date_time";
import Profile_dialogue_box from "../profile_dialogue_box";
import { useState } from "react";
// import MyDialoguePopup from "../my-dialogue-popup";

interface Nav_Bar_loggedIn_ComponentProps {
  email: string;
  profilePicture?: string;
  name: string;
  friends: number;
  roomsCreated: number;
  createdAt: string;
}

const Nav_Bar_loggedIn_Component: React.FC<Nav_Bar_loggedIn_ComponentProps> = ({
  email,
  profilePicture,
  name,
  friends,
  roomsCreated,
  createdAt,
}) => {
  //utilities

  //get default profile picture assocaited with the email name from multi avatar
  const get_image_from_api = (email: string) => {
    return `https://api.multiavatar.com/${email}.com.svg`;
  };
  const [dialogueState, setDialogueState] = useState(false);

  // const closeDialogue = () => {
  //   setDialogueState(false);
  // };

  //styles
  return (
    <>
      {/* nav bar components for desktop view */}
      <div className="nav-bar-container">
        <img
          className="nav-bar-logo"
          src="/assets/icons/logo-full-icon.svg"
          alt="sync-stream"
        />
        {/* Nav Bar action buttons wrapper */}
        <div
          className="nav-bar-action-section"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <h4>
            <span>
              <h4
                className="gradient-text only-on-pc-view"
                style={{
                  background:
                    "linear-gradient(180deg, #283618 0%, #749C45 100%)",
                  backgroundClip: "text",
                }}
              >
                {email}
              </h4>
            </span>
            <TimeDisplay />
          </h4>

          <div
            style={{ position: "relative" }}
            onClick={() => setDialogueState(!dialogueState)}
          >
            <img
              className="profile-image-container profile-image-container-hover"
              src={profilePicture ? profilePicture : get_image_from_api(email)}
              alt="profile"
            />
            {/* popup doalogoe box opened when the profile is clicked */}
            <div
              className="popUpContainer"
              style={{
                display: dialogueState ? "flex" : "none",
                position: "absolute",
                right: "-10px",
                zIndex: 1,
                top: "-10px",
              }}
            >
              <Profile_dialogue_box
                imgUrl={get_image_from_api(email)}
                email={email}
                createdAt={createdAt}
                friends={friends}
                name={name}
                roomsCreated={roomsCreated}
                profilePicture={profilePicture}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav_Bar_loggedIn_Component;
// 1024
