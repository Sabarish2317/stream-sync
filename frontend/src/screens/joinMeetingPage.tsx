import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../redux state/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../redux state/userDataSlice";
import Nav_Bar_Component from "../components/navigation_bar/nav-bar";
import Nav_Bar_loggedIn_Component from "../components/navigation_bar/nav-bar-logged-in";
import JoinMeetingFrame from "../components/join-meeting-videoFrame";

const JoinMeetingPage: React.FC = () => {
  //used a seperate api calling instead of passin the context as the user can directly access this join-meeting-page without login or signup
  //TODO: after testing remove the api call and use the memo hook
  // state managment from redux states
  const dispatch = useDispatch<AppDispatch>();
  //deconstructing the redux states from the store
  const { userData, loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.userData
  );
  // re-renders data on each dispact mount ie change of states
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  //conditional rendering
  return loading ? (
    <div className="wrapper" style={{ justifyContent: "center" }}>
      <div className="loader"></div>
    </div>
  ) : (
    <div className="wrapper">
      {isAuthenticated && userData ? (
        <Nav_Bar_loggedIn_Component userData={userData} />
      ) : (
        <Nav_Bar_Component />
      )}
      {userData ? <JoinMeetingFrame userData={userData} /> : null}
    </div>
  );
};

export default JoinMeetingPage;
