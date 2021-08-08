export function categoryReducer(state = {}, action) {
    switch (action.type) {
        case "GET_CATEGORY_SUCCESS":
            return { category: action.category };
        default:
            return state;
    }
}