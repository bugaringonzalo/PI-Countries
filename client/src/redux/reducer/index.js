import { COUNTRIES } from "../actions";
import { COUNTRYBYNAME } from "../actions";
import { DETAILS } from "../actions";
import { GET_ACTIVITIES } from "../actions";
import { POST_ACTIVITY } from "../actions";
import { FILTER_CONTINENT } from "../actions";
import { FILTER_ACTIVITY } from "../actions";
import { ORDER_NAME } from "../actions";
import { SET_PAGE } from "../actions";
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
            const filteredWithActivities = countriesToActivities.filter((country) => country.activities.length > 0)
            const arrayWithCountriesWithActivities = [];
            filteredWithActivities.forEach((country) => {
                country.activities.forEach((activity) => {
                    if (activity.name === action.payload) {
                        arrayWithCountriesWithActivities.push(country)
                    }
                } )
            } )
            return {
                ...state,
                page: 1,
                countriesfiltered: arrayWithCountriesWithActivities
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
                countriesfiltered : orderedByName
            }
            case ORDER_POPULATION:
                let orderByPop =
                action.payload === 'mintomax' ?
                state.countriesfiltered.sort((a,b) => {
                    return a.population - b.population ;
                })
                :
                state.countriesfiltered.sort((a,b) => {
                    return b.population - a.population ;
                })
                return {
                    ...state,
                    countriesfiltered: orderByPop
                }
            case SET_PAGE:
                return {
                    ...state,
                    page: action.payload
                }
        default:
            return state;
    }
}

export default rootReducer;