import axios from 'axios';


export const COUNTRIES = 'COUNTRIES';
export const COUNTRYBYNAME = 'COUNTRYBYNAME';
export const DETAILS = 'DETAILS';
export const POST_ACTIVITY = 'POST_ACTIVITY';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const FILTER_CONTINENT = 'FILTER_CONTINENT';
export const FILTER_ACTIVITY = 'FILTER_ACTIVITY';
export const ORDER_NAME = 'ORDER_NAME';
export const ORDER_POPULATION = 'ORDER_POPULATION';
export const SET_PAGE = 'SET_PAGE';


export function getCountries ( ) {
    return async function (dispatch) {
        try {
            const response = await axios.get('http://localhost:3001/countries/');
            return dispatch({
                type: COUNTRIES,
                payload: response.data
            })
        } catch (error) {
            alert('Dispatching getCountries error')
            console.log(error)
        }
    }
}

export function getByName (name) {
    return async function (dispatch) {
        try {
            const response = await axios.get (`http://localhost:3001/countries?name=${name}`);
            return dispatch({
                type: COUNTRYBYNAME,
                payload: response.data
            })
        } catch (error) {
            alert(error.response.data)
        }
    }
}

export function getDetails (id) {
    return async function (dispatch) {
        try {
            const response = await axios.get (`http://localhost:3001/countries/${id}`);
            return dispatch({
                type: DETAILS,
                payload: response.data
            })
        } catch (error) {
            alert(error.response.data) 
        }
    }
}

export function getActivities() {
    return async function(dispatch) {
        try {
            const response = await axios.get('http://localhost:3001/activities/');
            return dispatch({
                type: GET_ACTIVITIES,
                payload: response.data
            })
        } catch (error) {
            alert(error.response.data)
        }   
    }
}

export function postActivity (payload) {
    return async function (dispatch) {
        try {
            const newActivity = await axios.post('http://localhost:3001/activities/', payload);
            return dispatch({
                type: POST_ACTIVITY,
                payload: newActivity
            })
        } catch (error) {
            alert(error.response.data)
        }
       
    }
}

export function filterContinent (payload) {
   return {
        type: FILTER_CONTINENT,
        payload
   }
}

export function filterActivity (payload) {
    return {
        type: FILTER_ACTIVITY,
        payload
    }
}

export function orderName (payload) {
    return {
        type: ORDER_NAME,
        payload
    }
}

export function orderPopulation (payload) {
    return {
        type: ORDER_POPULATION,
        payload
    }
}

export function setPage (payload) {
    console.log('page has changed to: ', payload);
    return {
        type: SET_PAGE,
        payload
    }
}

