import React from "react";
import { NavLink } from "react-router-dom";

export default function Cards ({flag, name, continent, id}) {
    return (
        <div className="cards">
            <div className="cards-image">
                <img src={flag} alt="Country Flag" width='100px' height='100px'></img>
            </div>
            <div className="cards-text">
                <h3>{name}</h3>
                <p className="cards-continents">{continent}</p>
            </div>
            <div className = "card-footer">
                <NavLink to={`/detail/${id}`}>
                    <button>Read More</button>
                </NavLink>
            </div>
        </div>
    )
}