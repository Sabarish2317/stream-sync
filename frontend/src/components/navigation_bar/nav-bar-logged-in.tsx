import "./../components.css";
import "./../../App.css";
import TimeDisplay from "../../utils/get_date_time";

interface Nav_Bar_loggedIn_ComponentProps {
  email: string;
  profilePicture?: string;
}

const Nav_Bar_loggedIn_Component: React.FC<Nav_Bar_loggedIn_ComponentProps> = ({
  email,
  profilePicture,
}) => {
  //utilities

  //get default profile picture assocaited with the email name from multi avatar
  const get_image_from_api = (email: string) => {
    return `https://api.multiavatar.com/${email}.com.png`;
  };

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

          <div>
            <img
              className="profile-image-container"
              src={profilePicture ? profilePicture : get_image_from_api(email)}
              alt="profile"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav_Bar_loggedIn_Component;
// 1024
