export const initialState = {
    search: "",
    transmission: "All",
    types: [],
    availableOnly: false,
    favoritesOnly: false,
    priceMin: "",
    priceMax: "",
    seats: "All",
    sort: "",
    page: 1,
  };
  
  export const ACTIONS = {
    SET_SEARCH: "SET_SEARCH",
    SET_TRANSMISSION: "SET_TRANSMISSION",
    SET_TYPES: "SET_TYPES",
    SET_AVAILABLE: "SET_AVAILABLE",
    SET_FAVORITES: "SET_FAVORITES",
    SET_PRICE_MIN: "SET_PRICE_MIN",
    SET_PRICE_MAX: "SET_PRICE_MAX",
    SET_SEATS: "SET_SEATS",
    SET_SORT: "SET_SORT",
    SET_PAGE: "SET_PAGE",
    RESET_FILTERS: "RESET_FILTERS",
  };
  
  export const filterReducer = (state, action) => {
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
  
      case ACTIONS.SET_TYPES:
        return {
          ...state,
          types: action.payload,
          page: 1,
        };
  
      case ACTIONS.SET_AVAILABLE:
        return {
          ...state,
          availableOnly: action.payload,
          page: 1,
        };
  
      case ACTIONS.SET_FAVORITES:
        return {
          ...state,
          favoritesOnly: action.payload,
          page: 1,
        };
  
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
  
      case ACTIONS.SET_SEATS:
        return {
          ...state,
          seats: action.payload,
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
  
      case ACTIONS.RESET_FILTERS:
        return initialState;
  
      default:
        return state;
    }
  };