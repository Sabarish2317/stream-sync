import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserData from "../models/userModel";
import { closeProfileDialoguePopup } from "../redux state/profileDialoguePopupSlice";
import { useDispatch } from "react-redux";
import AlertContext from "../contexts/alertContext";
// import MyDialoguePopup from "./my-dialogue-popup";
interface Profile_dialogue_boxProps {
  userData: UserData;
  imgUrl: string;
}

const Profile_dialogue_box: React.FC<Profile_dialogue_boxProps> = ({
  userData,
  imgUrl,
}) => {
  //using alert context to show alert
  const { setAlert, setPrimaryButton, setSecondaryButton } =
    useContext(AlertContext);
  const showAlert = () => {
    setAlert("Logout", "Are you sure want to logout?", "info");
    setPrimaryButton("Logout", () => logout());
    setSecondaryButton("Cancel", () => console.log("Secondary Action"));
  };
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => {
    localStorage.removeItem("token");
    if (location.pathname !== "/home-page") {
      navigate("/home-page");
    }
    window.location.reload();
  };
  const dispatch = useDispatch();

  return (
    <>
      <div className="profile-dialog">
        {/* header or status and close button div */}
        <div className="row">
          <div
            className="status"
            style={{
              display: "flex",
              padding: "4px 12px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              borderRadius: "9px",
              background: "#55C37B",
            }}
          >
            <h4 style={{ color: "white" }}>Online</h4>
          </div>
          <button
            className="button-xs"
            onClick={() => dispatch(closeProfileDialoguePopup())}
          >
            <img src="/assets/icons/close-icon.svg" alt="close" />
          </button>
        </div>
        {/*  */}
        {/* contains the boody or desc of the dialogoe */}
        {/*  */}
        <div
          className="body-section column"
          style={{ gap: "12px", alignSelf: "stretch", alignItems: "center" }}
        >
          <img
            className="profile-image-container"
            src={userData.pfp ? userData.pfp : imgUrl}
            alt="profile"
          />
          <div className="name-and-email-container column">
            <h5 style={{ textAlign: "center" }}>{userData.name}</h5>
            <h6>{userData.email}</h6>
          </div>
          <h6>Joined at {userData.joinedAt}</h6>
          {/* friends and room count container */}
          <div className="friends-and-roomCount-container row">
            <div
              className="friends-container"
              style={{ padding: "0px 8px", width: "100%" }}
            >
              <h5 style={{ textAlign: "center" }}>{userData.friends ?? 0}</h5>
              <h6>Friends</h6>
            </div>
            <div className="vertical-divider"></div>
            <div
              className="roomCount-container"
              style={{ padding: "0px 8px", width: "100%" }}
            >
              <h5 style={{ textAlign: "center" }}>{userData.roomsCreated}</h5>
              <h6>Rooms created</h6>
            </div>
          </div>
          <div
            className="profile-dialogue-action-buttons column"
            style={{
              alignSelf: "stretch",
            }}
          >
            <div className="horizontal-divider"></div>
            <div
              className="settings-button row button"
              style={{ justifyContent: "start", gap: "12px" }}
            >
              <img src="/assets/icons/settings-icon.svg" alt="settings" />
              <h5>Settings</h5>
            </div>
            <div className="horizontal-divider row"></div>
            <div
              className="logout-button row button"
              style={{ justifyContent: "start", gap: "12px" }}
              onClick={showAlert}
            >
              <img src="/assets/icons/logout-icon.svg" alt="logout" />
              <h5>Logout</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile_dialogue_box;
