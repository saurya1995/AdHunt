export default function analyticsOfUser(state = {}, action) {
    switch (action.type) {
        case "GETANALYTICS_SUCCESS":
            return { analytics: action.analytics };
        default:
            return state;
    }
}