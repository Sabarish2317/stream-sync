import "./../components.css";
import "./../../App.css";

import TimeDisplay from "../../utils/get_date_time";
import Profile_dialogue_box from "../profile_dialogue_box";
import UserData from "../../models/userModel";
import get_image_from_api from "../../utils/multi-avatar-api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./../../redux state/store";
import { openProfileDialoguePopup } from "../../redux state/profileDialoguePopupSlice";

// import MyDialoguePopup from "../my-dialogue-popup";

interface Nav_Bar_loggedIn_ComponentProps {
  userData: UserData;
}

const Nav_Bar_loggedIn_Component: React.FC<Nav_Bar_loggedIn_ComponentProps> = ({
  userData,
}) => {
  //

  //redux state management to control the state of the dialogue box popUp
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.profileDialoguePopup.isOpen
  );

  //conditional rendering part

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
                className="gradient-text"
                style={{
                  background:
                    "linear-gradient(180deg, #283618 0%, #749C45 100%)",
                  backgroundClip: "text",
                }}
              >
                {userData.email}
              </h4>
            </span>
            <TimeDisplay />
          </h4>

          <div style={{ position: "relative" }}>
            <img
              onClick={() => dispatch(openProfileDialoguePopup())}
              className="profile-image-container profile-image-container-hover"
              src={userData.pfp ?? get_image_from_api(userData.email)}
              alt="profile"
            />

            {/* popup doalogoe container box opened when the profile is clicked */}
            <div
              className="popUpContainer"
              style={{
                display: isOpen ? "flex" : "none",
                position: "absolute",
                right: "-10px",
                zIndex: 1,
                top: "-10px",
              }}
            >
              {/* children inside the popup */}
              <Profile_dialogue_box
                imgUrl={get_image_from_api(userData.email)}
                userData={userData}
                //passing the google profile pic to reduce the function call
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav_Bar_loggedIn_Component;
