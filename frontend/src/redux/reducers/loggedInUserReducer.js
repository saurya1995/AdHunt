export default function loggedInUserState(state = {}, action) {
    switch (action.type) {
        case "GETLOGGEDINUSER_SUCCESS":
            return { loggedInUser: action.loggedInUser };
        default:
            return state;
    }
}
