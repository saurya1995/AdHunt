export default function offersOfUser(state = {}, action) {
    switch (action.type) {
        case "GETUSEROFFERS_SUCCESS":
            return { offers: action.offers };
        case "GETUSEROFFERS_FAILURE":
            return { offers: [] };
        default:
            return state;
    }
}
export function myOffersReducer(state = {}, action) {
    switch (action.type) {
        case "GETMYOFFERS_REQUEST":
            return { isLoading: true, offers: [] };
        case "GETMYOFFERS_SUCCESS":
            return { isLoading: false, offers: action.offers };
        case "GETMYOFFERS_FAILURE":
            return { isLoading: false, offers: [] };
        default:
            return state;
    }
}