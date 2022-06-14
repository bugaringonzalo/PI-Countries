import { COUNTRIES } from "../actions";
import { COUNTRYBYNAME } from "../actions";
import { DETAILS } from "../actions";
import { GET_ACTIVITIES } from "../actions";
import { POST_ACTIVITY } from "../actions";

const initialState = {
    allcountries: [],
    countriesfiltered: [],
    activities: [],
    details: []
};

function rootReducer (state= initialState, action) {
    switch ( action.type ) {
        case COUNTRIES: 
            return {
                ...state,
                allcountries: action.payload,
                countriesfiltered: action.payload
            }
        case COUNTRYBYNAME:
            return {
                ...state,
                countriesfiltered: action.payload
            }
        case DETAILS:
            return {
                ...state,
                details: action.payload
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }
        case POST_ACTIVITY:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default rootReducer;