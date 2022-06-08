import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getCountries } from '../../redux/actions'

import Cards from '../Home/Cards'
import SearchBar from "./SearchBar";

function Home ( ) {
    const dispatch = useDispatch();
    const allCountries = useSelector ((state) => state.allcountries);
    const renderCountries = useSelector((state) => state.countries);
    const [loader, setLoader] = useState (false)


    useEffect(() => {
        dispatch (getCountries())
        setTimeout(setLoader,3000, true)
    },[dispatch])

    return (
        <div>
            <h1>All countries by now broda</h1>
            <SearchBar />
            {   
                loader?
                renderCountries.map ((country) => {
                    return (
                        <Cards 
                        key={country.id} 
                        flag={country.flag}
                        name={country.name}
                        continent={country.continent}
                        />
                    )
                })
                : 
                <div> Loading </div>
            } 
        </div>
    )
}

export default Home;