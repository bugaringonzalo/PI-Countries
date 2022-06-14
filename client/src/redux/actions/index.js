import axios from 'axios';


export const COUNTRIES = 'COUNTRIES';
export const COUNTRYBYNAME = 'COUNTRYBYNAME';
export const DETAILS = 'DETAILS';
export const POST_ACTIVITY = 'POST_ACTIVITY';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';


export function getCountries ( ) {
    return async function (dispatch) {
        const response = await axios.get('http://localhost:3001/countries/');
        return dispatch({
            type: COUNTRIES,
            payload: response.data
        })
    }
}

export function getByName (name) {
    return async function (dispatch) {
        const response = await axios.get (`http://localhost:3001/countries?name=${name}`);
        return dispatch({
            type: COUNTRYBYNAME,
            payload: response.data
        })
    }
}

export function getDetails (id) {
    return async function (dispatch) {
        const response = await axios.get (`http://localhost:3001/countries/${id}`);
        return dispatch({
            type: DETAILS,
            payload: response.data
        })
    }
}

export function getActivities() {
    return async function(dispatch) {
        const response = await axios.get('http://localhost:3001/activities/');
        return dispatch({
            type: GET_ACTIVITIES,
            payload: response.data
        })
    }
}

export function postActivity (payload) {
    return async function (dispatch) {
        const newActivity = await axios.post('http://localhost:3001/activities/', payload);
        return dispatch({
            type: POST_ACTIVITY,
            payload: newActivity
        })
    }
}
