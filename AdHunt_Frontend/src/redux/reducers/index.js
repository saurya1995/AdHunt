import { combineReducers } from "redux";
import user from "./userReducer";
import entities from "./entitiesReducer";
import selectedProfile from "./selectedProfileReducer";
import { tabReducer, navBarReducer } from "./tabReducer";
import analyticsOfUser from "./analyticsReducer"
import offersOfUser, { myOffersReducer } from "./offersReducer"
import myApplicationsReducer, { offerApplicationsReducer, updateApplicationReducer } from "./applicationsReducer"
import editUserPopUp from "./profilepagepopupstate"
import userUpdateReducer from "./userUpdateReducer"
import { tagReducer } from "./tagReducer";
import { checkoutSessionReducer, setupStripeAccountReducer } from "./paymentReducer";
import { categoryReducer } from "./categoriesReducer"
import loggedInUserState from "./loggedInUserReducer";

export default combineReducers({
    user,
    entities,
    tabReducer,
    setupStripeAccountReducer,
    checkoutSessionReducer,
    navBarReducer,
    categoryReducer,
    analyticsOfUser,
    offersOfUser,
    myOffersReducer,
    myApplicationsReducer,
    offerApplicationsReducer,
    updateApplicationReducer,
    userUpdateReducer,
    editUserPopUp,
    selectedProfile,
    tagReducer,
    loggedInUserState
});
