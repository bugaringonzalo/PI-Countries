import React from "react";
import { Link } from "react-router-dom";

export default function Cards ({flag, name, continent, id}) {
    return (

        <div className="card">
            <div className="cards-image">
                <img src={flag} alt="Country Flag"></img>
            </div>
            <div className="card-details">
                <p className="text-title">{name}</p>
                <p className="text-body">{continent}</p>
            </div>
            <Link to={`/details/${id}`}>
                <button className="card-button">Read More</button>
            </Link>
        </div>
    )
}