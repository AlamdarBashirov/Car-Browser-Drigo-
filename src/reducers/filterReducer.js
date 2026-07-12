export const initialState = {
    search: "",
    transmission: "All",
    types: [],
    availableOnly: false,
    sort: "default",
    priceMin: "",
    priceMax: "",
    favoritesOnly: false,
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
    SET_PRICE_MIN: "SET_PRICE_MIN",
    SET_PRICE_MAX: "SET_PRICE_MAX",
    SET_FAVORITES_ONLY: "SET_FAVORITES_ONLY",
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

        case ACTIONS.SET_TYPE: {

            const exists = state.types.includes(action.payload);

            return {
                ...state,
                types: exists
                    ? state.types.filter(
                        (type) => type !== action.payload
                    )
                    : [...state.types, action.payload],
                page: 1,
            };
        }

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
        case ACTIONS.SET_PRICE_MIN:
            return {
                ...state,
                priceMin: action.payload,
                page: 1,
            };

        case ACTIONS.SET_PRICE_MAX:
            return {
                ...state,
                priceMax: action.payload,
                page: 1,
            };
        case ACTIONS.SET_FAVORITES_ONLY:
            return {
                ...state,
                favoritesOnly: action.payload,
                page: 1,
            };
        default:
            return state;
    }

}