import ProfileService from "../../services/ProfileService";
import UserService from "../../services/UserService";


export const getUserProfile = (username) => {
  function onSuccess(profile) {
    return { type: "GETPROFILE_SUCCESS", profile: profile };
  }
  function onFailure(error) {
    console.log("failed to load a profile", error);
  }

  return async (dispatch, getState) => {
    try {
      let profile = await ProfileService.getUserProfile(username);
      dispatch(onSuccess(profile));
    } catch (e) {
      onFailure(e);
    }
  };
};

export const getAnalytics = (profile) => {

  function onSuccess(analytics) {
    return { type: "GETANALYTICS_SUCCESS", analytics: analytics };
  }
  function onFailure(error) {
    console.log("failed to load analytics", error);
  }

  return async (dispatch, getState) => {
    try {
      let analytics = await ProfileService.getAnalytics(profile);
      dispatch(onSuccess(analytics));
    } catch (e) {
      onFailure(e);
    }
  };
};

export function updateUserProfile(updatedProfile) {

  function onSuccess(profile) {

    return { type: "UPDATEPROFILE_SUCCESS", profile: profile };
  }

  function onFailure(error) {
    console.log("change profile failure", error);
  }

  return async (dispatch) => {
    try {

      let profile = await ProfileService.updateUserProfile(updatedProfile);
      dispatch(onSuccess(profile));
    } catch (e) {
      onFailure(e);
    }
  };
};


export function getIsUserLoggedIn() {

  function onSuccess(loggedInUser) {

    return { type: "GETLOGGEDINUSER_SUCCESS", loggedInUser: loggedInUser };
  }

  function onFailure(error) {
    console.log("change profile failure", error);
  }

  return async (dispatch) => {
    try {

      let loggedInUser = await UserService.getLoggedInUser();
      dispatch(onSuccess(loggedInUser));
    } catch (e) {
      onFailure(e);
    }
  };
};





