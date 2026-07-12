export const initialState = {
    search: "",
    transmission: "All",
    type: "All",
    availableOnly: false,
    sort: "default",
    page: 1,
};

export const ACTIONS = {
    SET_SEARCH: "SET_SEARCH",
    SET_TRANSMISSION: "SET_TRANSMISSION",
    SET_TYPE: "SET_TYPE",
    SET_AVAILABLE: "SET_AVAILABLE",
    SET_SORT: "SET_SORT",
    SET_PAGE: "SET_PAGE",
    RESET: "RESET",
};

export function filterReducer(state, action) {

    switch (action.type) {

        case ACTIONS.SET_SEARCH:
            return {
                ...state,
                search: action.payload,
                page: 1,
            };

        case ACTIONS.SET_TRANSMISSION:
            return {
                ...state,
                transmission: action.payload,
                page: 1,
            };

        case ACTIONS.SET_TYPE:
            return {
                ...state,
                type: action.payload,
                page: 1,
            };

        case ACTIONS.SET_AVAILABLE:
            return {
                ...state,
                availableOnly: action.payload,
                page: 1,
            };

        case ACTIONS.SET_SORT:
            return {
                ...state,
                sort: action.payload,
            };

        case ACTIONS.SET_PAGE:
            return {
                ...state,
                page: action.payload,
            };

        case ACTIONS.RESET:
            return initialState;

        default:
            return state;
    }

}