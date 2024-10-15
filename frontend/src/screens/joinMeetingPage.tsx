import React, { useContext, useEffect } from "react";
import { AppDispatch, RootState } from "../redux state/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../redux state/userDataSlice";
import Nav_Bar_Component from "../components/navigation_bar/nav-bar";
import Nav_Bar_loggedIn_Component from "../components/navigation_bar/nav-bar-logged-in";
import JoinMeetingFrame from "../components/join-meeting-videoFrame";
import { useNavigate } from "react-router-dom";
import AlertContext from "../contexts/alertContext";
import base64Converter from "../utils/base64Converter";

const JoinMeetingPage: React.FC = () => {
  //dependancies
  const navigate = useNavigate();
  const { setAlert, setPrimaryButton, setSecondaryButton } =
    useContext(AlertContext);

  //deconstructing the redux states from the store
  const dispatch = useDispatch<AppDispatch>();
  const { userData, loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.userData
  );

  // re-renders data on each dispact mount ie change of react states
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  //alert to show if an error has happend while fetching the data
  useEffect(() => {
    if (error) {
      const showErrorAlert = () => {
        setAlert(
          "Sorry",
          "An unexpected error has happened, Try later !",
          "error"
        );
        setPrimaryButton("Try again", () => navigate("/rooms"));
        setSecondaryButton("Close", () => navigate("/home-page"));
      };
      showErrorAlert();
    }
  }, [error]);

  //alert function to show if the user is not logged in
  useEffect(() => {
    if (!loading) {
      if (userData?.email === undefined) {
        const showLoginAlert = () => {
          setAlert("Hello", "Please Sign in to continue !", "info");
          setPrimaryButton("Sign in", () => navigate("/login"));
          setSecondaryButton("Cancel", () => navigate("/home-page"));
        };

        showLoginAlert();
      }
      if (userData?.email) {
        //the alert is only visible if it has a title so this would close the alert
        //this shit wll show up for a second when the page is loading

        setAlert("", "", "");
      }
    }
  }, [userData?.email, loading]);
  //conditional rendering
  return loading ? (
    <div className="wrapper" style={{ justifyContent: "center" }}>
      <div className="loader"></div>
    </div>
  ) : (
    userData?.name && (
      <div
        className="wrapper"
        style={{
          justifyContent: "top",
        }}
      >
        {isAuthenticated && userData ? (
          <Nav_Bar_loggedIn_Component userData={userData} />
        ) : (
          <Nav_Bar_Component />
        )}
        <div
          className="wrapper"
          style={{
            flexDirection: "row",
            width: "100%",

            padding: "12px 10%",
          }}
        >
          {/* loaded only if user is logged in , to prevent the ts error */}
          {userData?.name ? <JoinMeetingFrame userData={userData} /> : null}
          <div
            className="join-meeting-section"
            style={{
              display: "flex",

              justifyContent: "center",

              gap: "12px",
              width: "70%",
            }}
          >
            <div
              className="user-detail-section column"
              style={{
                alignItems: "center",
                gap: "12px",
                width: "40%",
              }}
            >
              <img
                className="profile-image-container"
                style={{ width: "64px", height: "64px", border: "none" }}
                src={base64Converter(userData)}
                alt="profile-img"
              />
              <div
                className="column"
                style={{
                  alignItems: "center",
                }}
              >
                <h4>Joining as</h4>
                <h3 style={{ fontWeight: 500, lineHeight: "120%" }}>
                  {userData?.name}
                </h3>
              </div>
              <div
                className="buttons-container"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <button
                  className="button-m button-outline "
                  onClick={() => navigate("/home-page")}
                >
                  <h4
                    style={{
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "20px",
                      color: "rgba(21, 25, 32, 0.50)",
                    }}
                  >
                    Cancel
                  </h4>
                </button>
                <button
                  className="button-m"
                  style={{
                    flex: 1,
                    width: "100%",
                  }}
                  onClick={() => {}}
                >
                  <h4
                    style={{
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "20px",
                      color: "white",
                    }}
                  >
                    Join
                  </h4>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default JoinMeetingPage;
