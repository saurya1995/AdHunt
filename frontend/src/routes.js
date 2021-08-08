import CreateReviewView from "./views/CreateReviewView";
import ReviewsView from "./views/ReviewsView";
import SearchDealView from "./views/SearchDealView";
import BusinessProfilesView from "./views/BusinessProfilesView";
import CreatorProfilesView from "./views/CreatorProfilesView";
import ProfilePageView from "./views/ProfilePageView";
import UserLoginView from "./views/UserLoginView";
import SignUpView from "./views/SignUpView";
import PrivacySettingsView from "./views/PrivacySettingsView";
import PaymentSettingsView from "./views/PaymentSettingsView";
import MyDealsView from "./views/MyDealsView";

const routes = [
  {
    path: "/",
    component: SearchDealView,
    exact: true,
  },
  {
    path: "/review/addReview",
    component: CreateReviewView,
  },
  {
    path: "/review/listReviews",
    component: ReviewsView,
  },
  {
    path: "/businesses/",
    component: BusinessProfilesView,
  },
  {
    path: "/creators/",
    component: CreatorProfilesView,
  },
  {
    path: "/users/",
    component: ProfilePageView,
  },
  {
    path: "/login",
    component: UserLoginView,
  },
  {
    path: "/register",
    component: SignUpView,
  },
  {
    path: "/payment-settings",
    component: PaymentSettingsView,
  },
  {
    path: "/privacy-settings",
    component: PrivacySettingsView,
  },
  {
    path: "/mydeals",
    component: MyDealsView,
  },
];

export default routes;
