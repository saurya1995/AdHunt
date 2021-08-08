export default function updateUserStatus(state = {}, action) {
    switch (action.type) {
        case "UPDATEPROFILE_SUCCESS":
            return { profile: action.profile };
        default:
            return state;
    }
}