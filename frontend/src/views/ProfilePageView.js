import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import NavigationBar from "../components/search/NavigationBar";
import { getAnalytics, getUserProfile, getIsUserLoggedIn } from "../redux/actions/profileActions";
import { getCategories } from "../redux/actions/categoryActions";
import { getUserOffers } from "../redux/actions/offerActions";
import Footer from "../components/search/Footer";
import About from "../components/profile/About";
import GeneralInformation from "../components/profile/GeneralInformation";
import Category from "../components/profile/Category";
import Analytics from "../components/profile/Analytics";
import OpenOffers from "../components/profile/OpenOffers";
import ReviewsView from "./ReviewsView";
import "./ProfilePageStyle.css";

/**
 * Manages the process of getting profile list data
 * @param {props} props
 */

function ProfilePageView(props) {
  const profile = useSelector((state) => state.entities.profile);
  const analytics = useSelector((state) => state.analyticsOfUser.analytics);
  const offers = useSelector((state) => state.offersOfUser.offers);
  const categories = useSelector((state) => state.categoryReducer.category);
  const loggedInUser = useSelector((state) => state.loggedInUserState.loggedInUser);


  const userAuthenticated = (loggedInUser == props.location.pathname.split("/")[2]);

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    props.dispatch({ type: "GETPROFILE_SUCCESS", profile: null });
    props.dispatch({ type: "GETANALYTICS_SUCCESS", analytics: null });
    props.dispatch({ type: "GETUSEROFFERS_SUCCESS", offers: null });
    props.dispatch({ type: "GET_CATEGORY_SUCCESS", categories: null });
    props.dispatch({ type: "GETLOGGEDINUSER_SUCCESS", loggedInUser: null });

  }, [props.location.pathname.split("/")[2]]);

  useEffect(() => {
    // load profile when the page is loaded or the profile have changed.
    if (!profile) {
      loadProfile();
    }
    if (profile && !offers && !analytics) {
      loadOffers();
      loadAnalytics();
      loadCategories();
      loadLoggedInUser();
    }
  }, [profile]);

  const loadProfile = async () => {
    // trigger the redux action getProfile
    let username = props.location.pathname.split("/")[2];
    props.dispatch(getUserProfile(username));
  };

  const loadAnalytics = async () => {
    // trigger the redux action getAnalytics
    if (profile.length > 0) props.dispatch(getAnalytics(profile[0]));
  };

  const loadOffers = async () => {
    // trigger the redux action getOffers
    if (profile.length > 0) props.dispatch(getUserOffers(profile[0]));
  };

  const loadCategories = async () => {
    // trigger the redux action getCategories
    props.dispatch(getCategories());
  };

  const loadLoggedInUser = async () => {
    props.dispatch(getIsUserLoggedIn());
  };

  const useStyles = makeStyles({
    grid_container: {
      display: "grid",
    },
  });
  const classes = useStyles();

  return !profile || !analytics || !offers || !categories ? (
    <h1>Loading</h1>
  ) : profile.length == 0 ? (
    <h1>Profile not found</h1>
  ) : (
    <React.Fragment>
      <NavigationBar path={"BothProfiles"} />
      <div className="wrapper">
        <div className="general_info">
          <GeneralInformation
            profile={profile}
            loadProfile={loadProfile}
            userAuthenticated={userAuthenticated}
          />
        </div>

        <div className="category">
          <Category
            profile={profile}
            loadProfile={loadProfile}
            userAuthenticated={userAuthenticated}
            categories={categories}
          />
        </div>

        <div className="about">
          <About
            profile={profile}
            loadProfile={loadProfile}
            userAuthenticated={userAuthenticated}
          />
        </div>
        <div className="offers">
          <OpenOffers
            offers={offers}
            loadOffers={loadOffers}
            user_id={profile[0]._id}
            userAuthenticated={userAuthenticated}
          ></OpenOffers>
        </div>
        <div className="analytics">
          <Analytics
            analytics={analytics}
            loadAnalytics={loadAnalytics}
            user_id={profile[0]._id}
            userAuthenticated={userAuthenticated}
          ></Analytics>
        </div>
        <div className="reviewsView">
          <ReviewsView
            partnerName={profile[0].username}
          ></ReviewsView>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default connect()(ProfilePageView);
