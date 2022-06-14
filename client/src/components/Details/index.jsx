import React, {useEffect} from "react";
import { getDetails } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";


export default function Details (props) {
    const dispatch = useDispatch();
    const details = useSelector((state) => state.details);
    const {id} = props.match.params;


    useEffect(() => {
        dispatch(getDetails(id));
    }, [id, dispatch]);

    return (
        <div>
            <h3>Country Details !</h3>
            {
                details?.map((country) => {
                    return (
                        <div key={country.id}>
                            <h2>{country.name}</h2>
                            <div>
                                <img src={country.flag} alt="No flag Available" />
                                <h5>{country.continent}</h5>
                                <h5>{country.population}</h5>
                                <h5>{country.area}</h5>
                                <h5>{country.capital}</h5>
                                <h5>{country.subregion}</h5>
                                {
                                    country.activities.length>0 ?
                                    country.activities.map(activities=>{
                                        return (
                                            <div key={activities.id}>
                                                <h5>{activities.name}</h5>
                                                <h5>{activities.difficulty}</h5>
                                                <h5>{activities.duration}</h5>
                                                <h5>{activities.season}</h5>
                                            </div>
                                        )
                                    })
                                    : null
                                }
                            </div>
                        </div>
                    )
                })
                
            }
        </div>
    )
}