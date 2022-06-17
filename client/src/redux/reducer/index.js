import { COUNTRIES } from "../actions";
import { COUNTRYBYNAME } from "../actions";
import { DETAILS } from "../actions";
import { GET_ACTIVITIES } from "../actions";
import { POST_ACTIVITY } from "../actions";
import { FILTER_CONTINENT } from "../actions";
import { FILTER_ACTIVITY } from "../actions";
import { ORDER_NAME } from "../actions";
import { ORDER_POPULATION } from "../actions";


const initialState = {
    allcountries: [],
    countriesfiltered: [],
    activities: [],
    details: [],
    page: 1
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
                page: 1,
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
                activities: [...state.activities, action.payload]
            }
        case FILTER_CONTINENT:
            const countriesToContinent = state.allcountries
            const filteredByContinent = action.payload === 'All' ? countriesToContinent:
                countriesToContinent.filter(country => country.continent === action.payload )
            
            return {
                ...state,
                page: 1,
                countriesfiltered: filteredByContinent
            }
        case FILTER_ACTIVITY:
            const countriesToActivities = state.allcountries
            const filteredByActivities = countriesToActivities.filter(country => country.activities.name === action.payload )

            return {
                ...state,
                page: 1,
                countriesfiltered: filteredByActivities
            }
        case ORDER_NAME:
            let orderedByName = 
            action.payload === 'ASC' ?
            state.countriesfiltered.sort((a,b) => {
                if (a.name > b.name) {
                    return 1;
                }
                else if (b.name > a.name) {
                    return 0
                }
                return 0
            })
            :
            state.countriesfiltered.sort((a,b) => {
                if (a.name > b.name) {
                    return -1;
                }
                else if (b.name > a.name) {
                    return 1;
                }
                return 0
            });
            return {
                ...state,
                page: 1,
                countriesfiltered : orderedByName
            }

        default:
            return state;
    }
}

export default rootReducer;