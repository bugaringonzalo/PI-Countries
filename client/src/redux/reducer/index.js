import { COUNTRIES } from "../actions";
import { COUNTRYBYNAME } from "../actions";
import { DETAILS } from "../actions";

const initialState = {
    allcountries: [],
    countries: [],
    activities: [],
    details: []
};

function rootReducer (state= initialState, action) {
    switch ( action.type ) {
        case COUNTRIES: 
            return {
                ...state,
                allcountries: action.payload,
                countries: action.payload
            }
        case COUNTRYBYNAME:
            return {
                ...state,
                countries: action.payload
            }
        case DETAILS:
            return {
                ...state,
                details: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;