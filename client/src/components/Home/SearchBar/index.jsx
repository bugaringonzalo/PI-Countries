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
    <div>
      <input
        name="name"
        placeholder="Type your country.."
        type="text"
        value={name}
        onChange={(e) => handleChange(e)}
      />
      <button onClick={(e) => handleClick(e)}> Search Country</button>
    </div>
  );
}
