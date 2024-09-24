import React from "react";
// import MyDialoguePopup from "./my-dialogue-popup";
interface Profile_dialogue_boxProps {
  profilePicture?: string;
  // url of the profile picture generated on default based on the email
  imgUrl: string;
  email: string;
  name: string;
  friends: number;
  roomsCreated: number;
  createdAt: string;
}

const Profile_dialogue_box: React.FC<Profile_dialogue_boxProps> = ({
  profilePicture,
  imgUrl,
  email,
  name,
  friends,
  roomsCreated,
  createdAt,
}) => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
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
          <button className="button-xs">
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
            src={profilePicture ? profilePicture : imgUrl}
            alt="profile"
          />
          <div className="name-and-email-container column">
            <h5 style={{ textAlign: "center" }}>{name}</h5>
            <h6>{email}</h6>
          </div>
          <h6>Joined at {createdAt}</h6>
          {/* friends and room count container */}
          <div className="friends-and-roomCount-container row">
            <div
              className="friends-container"
              style={{ padding: "0px 8px", width: "100%" }}
            >
              <h5 style={{ textAlign: "center" }}>{friends ?? 0}</h5>
              <h6>Friends</h6>
            </div>
            <div className="vertical-divider"></div>
            <div
              className="roomCount-container"
              style={{ padding: "0px 8px", width: "100%" }}
            >
              <h5 style={{ textAlign: "center" }}>{roomsCreated}</h5>
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
              onClick={logout}
            >
              <img src="/assets/icons/logout-icon.svg" alt="logout" />
              <h5>Logout</h5>
            </div>
          </div>
        </div>
      </div>
      {/* <MyDialoguePopup
        title={"Warning"}
        content={"Are you sure you want to log out?"}
        primaryAction={() => console.log("logout")}
        primaryActionColor="#DC3912"
        primaryActionText="Logout"
        secondaryAction={() => console.log("close")}
        secondaryActionText="Cancel"
      /> */}
    </>
  );
};

export default Profile_dialogue_box;
