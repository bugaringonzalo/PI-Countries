import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterActivity, filterContinent, getActivities, setPage } from "../../../redux/actions";

function Filter () {
    const dispatch = useDispatch();
    const allActivities = useSelector((state) => state.activities)

    
    
    const handleSelectContinent = (e) => {
        e.preventDefault();
        console.log('Continent filter changed');
        dispatch(filterContinent(e.target.value));
        dispatch(setPage(1))
    }

    const handleSelectActivity = (e) => {
        e.preventDefault();
        console.log('Activity filter changed')
        dispatch(filterActivity(e.target.value))
        dispatch(setPage(1))
    }
    
    useEffect(() => {
        dispatch(getActivities);
    }, [dispatch, allActivities])

    return (
        <div className="filter-container">
            <select name="continent" id="" onChange={(e) => handleSelectContinent(e)}>
                <option value="All">All</option>
                <option value="Africa">Africa</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="Oceania">Oceania</option>
                <option value="Americas">Americas</option>
                <option value="Antarctic">Antarctic</option>
            </select>
            {
                allActivities.length > 0 ?
                (
                <select name="activity" onChange={(e) => handleSelectActivity(e)}>
                    {
                        allActivities.map((activity) => {
                            return (
                                <option key={activity.data.id} value={activity.data.name}>{activity.data.name}</option>
                            )
                        })
                    }
                </select>
                )
                : null
            }
        </div>
    )
}

export default Filter;