export default function myApplicationsReducer(state = {}, action) {
    switch (action.type) {
        case "GETMYAPPLICATIONS_REQUEST":
            return { isLoading: true, myapplications: [] };
        case "GETMYAPPLICATIONS_SUCCESS":
            return { isLoading: false, myapplications: action.applications };
        case "GETMYAPPLICATIONS_FAILURE":
            return { isLoading: false, myapplications: [] };
        default:
            return state;
    }
}
export function offerApplicationsReducer(state = {applications:{}}, action) {
    switch (action.type) {
        case "GETOFFERAPPLICATIONS_SUCCESS":{
            return {...state, applications:{...state.applications, [action.offerId]: action.applications }};
        }
        case "GETOFFERAPPLICATIONS_FAILURE":
            return state;
        default:
            return state;
    }
}
export function updateApplicationReducer(state = {}, action) {
    switch (action.type) {
        case "UPDATEAPPLICATION_SUCCESS":
            return { application: action.application, updated: true };
        case "UPDATEAPPLICATION_FAILURE":
            return { application: [], updated: false };
        default:
            return state;
    }
}
