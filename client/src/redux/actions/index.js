import axios from 'axios';


export const COUNTRIES = 'COUNTRIES';
export const COUNTRYBYNAME = 'COUNTRYBYNAME';
export const DETAILS = 'DETAILS';


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