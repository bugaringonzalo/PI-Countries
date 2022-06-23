import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { filterContinent, getCountries, setPage } from '../../redux/actions'

import Cards from '../Home/Cards'
import SearchBar from "./SearchBar";
import Filter from "./Filters";
import Paginate from "./Paginate";
import Orders from "./Orders";
import { ReactComponent as LoaderSVG } from '../../assets/loader.svg';



function Home ( ) {
    const dispatch = useDispatch();
    const { countriesfiltered} = useSelector ((state) => state);
    let page = useSelector((state) => state.page)
    const [loader, setLoader] = useState (false);

    
    // const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(9);
    const indexOfLastCountry = page * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = countriesfiltered.slice(indexOfFirstCountry, indexOfLastCountry);
    
    
    const paginate = (pageNumber) => {
        dispatch(setPage(pageNumber));
        if(pageNumber === 1) {
            setCountriesPerPage(9);
            console.log(pageNumber);
            console.log(countriesPerPage)
        } else {
            setCountriesPerPage(10);
            console.log(pageNumber);
            console.log(countriesPerPage)
        }
    }

    const handleClick = (e) => {
        e.preventDefault();
        page = 1;
        dispatch(getCountries());
        dispatch(setPage(1))
        dispatch(filterContinent('All'))
    }

    useEffect(() => {
        dispatch (getCountries())
        setTimeout(setLoader,3000, true)
    },[dispatch])

    return (
        <div className="container">
            <h1>All countries by now broda</h1>
            <button onClick={(e) => {handleClick(e)}}> Reload All Countries </button>
            <Link to={'/create'}>
                <div>
                    <button>Create Activity</button>
                </div>
            </Link>
            <SearchBar />
            <Filter />
            <Orders />
            
            <div className="paginator">
                <Paginate
                    countriesPerPage={countriesPerPage}
                    totalCountries={countriesfiltered.length}
                    paginate={paginate}
                />
            </div>
            <div className="cards-render">
                {   
                    !loader ? <LoaderSVG/> :
                    currentCountries?.map ((country) => {
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
                }
            </div>
        </div>
    )
}

export default Home;