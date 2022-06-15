import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getCountries } from '../../redux/actions'

import Cards from '../Home/Cards'
import SearchBar from "./SearchBar";

function Home ( ) {
    const dispatch = useDispatch();
    const allCountries = useSelector ((state) => state.allcountries);
    const renderCountries = useSelector((state) => state.countriesfiltered);
    const [loader, setLoader] = useState (false);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getCountries());
    }

    useEffect(() => {
        dispatch (getCountries())
        setTimeout(setLoader,3000, true)
    },[dispatch])

    return (
        <div>
            <h1>All countries by now broda</h1>
            <button onClick={(e) => {handleClick(e)}}> Reload All Countries </button>
            <Link to={'/create'}>
                <div>
                    <button>Create Activity</button>
                </div>
            </Link>
            <SearchBar />
            {   
                loader?
                renderCountries.map ((country) => {
                    return (
                        <div key={country.id}>
                            <Link to={`/details/${country.id}`}>
                                <Cards 
                                    flag={country.flag}
                                    name={country.name}
                                    continent={country.continent}
                                />
                            </Link>
                        </div>
                    )
                })
                : 
                <div> Loading </div>
            } 
        </div>
    )
}

export default Home;