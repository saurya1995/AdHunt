export default function entities(state = {}, action) {
    switch (action.type) {
        case "GETPROFILE_SUCCESS":
            return { profile: action.profile };
        case "GETCCPROFILE_SUCCESS":
            return { ccprofile: action.ccprofile };
        case "GETALLOFFER_SUCCESS":
            return { offers: action.offers };
        case "GETBUSINESSOFFER_SUCCESS":
            return { businessoffers: action.businessoffers };
        case "GETCCOFFER_SUCCESS":
            return { ccoffers: action.ccoffers };
        default:
            return state;
    }
}