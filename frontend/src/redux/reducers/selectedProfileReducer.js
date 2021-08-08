export default function selectedProfile(state = {}, action) {
    switch (action.type) {
        case "GETPROFILE_SUCCESS":
            return { profile: action.profile };
        case "GETPROFILE_ERROR":
            return { error: action.error };
        case "CHANGE_SELECTED_PROFILE":
            return {
                profile: {
                    ...state.profile,
                    ...action.updates,
                },
            };
        default:
            return { movie: action.profile };
    }
}
