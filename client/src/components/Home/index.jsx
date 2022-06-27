import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { filterContinent, getCountries, setPage, filterPopulation } from '../../redux/actions'

import Cards from '../Home/Cards'
import SearchBar from "./SearchBar";
import Filter from "./Filters";
import Paginate from "./Paginate";
import Orders from "./Orders";
import { ReactComponent as LoaderSVG } from '../../assets/loader.svg';



function Home ( ) {
    const dispatch = useDispatch();
    const { countriesfiltered } = useSelector ((state) => state);
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

    const filterPop = () => {
        console.log('filtrasteeeee')
        dispatch(filterPopulation())
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
            <div className="container-fluid">
                <div className="h1welcometext">
                    <h1>COUNTRIES APP</h1>
                </div>
                <div className="navbar">
                    <button className="button-home" onClick={(e) => {handleClick(e)}}> Reload All Countries </button>
                    <Link to={'/create'}>
                        <div>
                            <button className="button-home">Create Activity</button>
                        </div>
                    </Link>
                    <SearchBar />
                </div>
                <div className="filter-orders">
                    <Filter />
                    <Orders />
                </div>
                <button onClick={() => filterPop()}>ORDER POP MAYOR A 50000</button>
                <div className="paginator">
                    <Paginate
                        countriesPerPage={countriesPerPage}
                        totalCountries={countriesfiltered.length}
                        paginate={paginate}
                    />
                </div>
                <div className="cards-container">
                    {   
                        !loader ? <LoaderSVG/> :
                        currentCountries?.map ((country) => {
                            return (
                                <div key={country.id}>
                                    
                                        <Cards 
                                            flag={country.flag}
                                            name={country.name}
                                            continent={country.continent}
                                            id={country.id}
                                        />
                                
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;