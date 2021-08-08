export function navBarReducer(state = {}, action) {
    switch (action.type) {
        case "ACTIVE_NAV_TAB":
            return { activeItem: action.activeItem };
        default:
            return state;
    }
}

export function tabReducer(state = { activeDealItem: "Businesses" }, action) {
    switch (action.type) {
        case "ACTIVE_DEAL_TAB":
            return { activeDealItem: action.activeDealItem };
        default:
            return state;
    }
}
