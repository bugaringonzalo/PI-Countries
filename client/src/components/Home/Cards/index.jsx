import React from "react";

export default function Cards ({flag, name, continent}) {
    return (
        <div>
            <img src={flag} alt="Country Flag" width='100px' height='100px'></img>
            <h3>{name}</h3>
            <h3>{continent}</h3>
        </div>
    )
}