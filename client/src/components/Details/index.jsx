import React, { useEffect, useState } from "react";
import { getDetails } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { ReactComponent as LoaderSVG } from '../../assets/loader.svg';


export default function Details (props) {
    const dispatch = useDispatch();
    const details = useSelector((state) => state.details);
    const {id} = props.match.params;

    const [loader, setLoader] = useState (false);



    useEffect(() => {
        dispatch(getDetails(id));
        setTimeout(setLoader,2500, true)

        return () => {
            console.log('component is unmounting gonza');
        }
    },[dispatch, id])
    
    return (
        <div className="details-container">
            <div className="details-card">
                <Link to={'/home'} className="details-back">
                    <div>
                        <button className="details-button">
                            <svg height="16" width="20" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
                            <span>Back to Home!</span>
                        </button>
                    </div>
                </Link>
                <h2 className="details-header">Country Details !</h2>
                {   
                    !loader ? <LoaderSVG/> :
                    loader && details?.map((country) => {
                        return (
                            <div className="details-render" key={country.id}>
                                <h2>{country.name}</h2>
                                <div>
                                    <img src={country.flag} alt="No flag Available" />
                                    <h5>Continent: {country.continent}</h5>
                                    <h5>Population: {country.population}</h5>
                                    <h5>Area: {country.area} Km2</h5>
                                    <h5>Capital: {country.capital}</h5>
                                    <h5>Subregion: {country.subregion}</h5>
                                    <h3>Activities Available: </h3>
                                    <div className="details-activities">
                                        {
                                            country.activities.length>0 ?
                                            country.activities.map(activities=>{
                                                return (
                                                    <div className="details-activity-card" key={activities.id}>
                                                        <h5 className="separator-right">Actvity Name : {activities.name}</h5>
                                                        <h5 className="separator-right">Difficulty : {activities.difficulty}</h5>
                                                        <h5 className="separator-right">Duration : {activities.duration}</h5>
                                                        <h5>Season : {activities.season}</h5>
                                                    </div>
                                                )
                                            })
                                            : null
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }) 
                } 
            </div>
        </div>
    )
}