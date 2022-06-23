import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getByName } from "../../../redux/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(e.target.value);
    console.log(e.target.name);
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getByName(name));
  };

  return (
    <div className="group">
        <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
        <input
          className="input"
          name="name"
          placeholder="Search.."
          type="text"
          value={name}
          onChange={(e) => handleChange(e)}
        />
      <button className="searchbar-button" onClick={(e) => handleClick(e)}>
      
        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
      
      </button>

    </div>
  );
}
