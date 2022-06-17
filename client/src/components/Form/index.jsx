import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivity, getCountries } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function Form() {
  const dispatch = useDispatch();
  const countries = useSelector((e) => e.allcountries);

  const validate = (input) => {
    let errors = {};
    if (!input.name) {
      errors.name = "Activity Name is required";
    } else if (!/[^1-4]/g.test(input.name)) {
      errors.name = "Activity name must be letters only";
    }

    return errors;

    /* if (/[1-5])/g.test(input.difficulty)) {
            errors.difficulty = 'Difficulty must be between numbers 1 and 5' 
        } */
  };

  const [input, setInput] = useState({
    name: "",
    difficulty: 0,
    duration: 0,
    season: "",
    countries: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log({ input });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Acitivity created Successfully");
    dispatch(postActivity(input));
    setInput({
      name: "",
      difficulty: 0,
      duration: 0,
      season: "",
      countries: [],
    });
  };

  const handleSelectSeason = (e) => {
    e.preventDefault();
    console.log("Season select has changed");
    setInput({
      ...input,
      season: e.target.value,
    });
  };

  const handleSelectCountries = (e) => {
    e.preventDefault();
    console.log("Countries select has changed");
    setInput({
      ...input,
      countries: [...input.countries, e.target.value],
    });
  };

  /* const handleDeleteCountries = (e) => {
        // e.preventDefault();
        setInput({
            ...input,
            countries: input.countries.filter((country) => country !== e)
        })
        console.log('Country Deleted')
        console.log(input);
    } */

  useEffect(() => {
    dispatch(getCountries());
    console.log("useEffect displayed/countries loaded");
  }, [dispatch]);

  return (
    <div>
      <Link to={"/"}>
        <div>
          <button>Back to Home</button>
        </div>
      </Link>
      <div>
        <h3>Activity Creator</h3>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Insert Name.."
            value={input.name}
            onChange={(e) => handleChange(e)}
          />
          {errors.name ? <p>{errors.name}</p> : null}
        </div>
        <div>
          <label>Difficulty</label>
          <input
            type="text"
            name="difficulty"
            placeholder="Insert Difficulty.."
            value={input.difficulty}
            onChange={(e) => handleChange(e)}
          />
          {errors.difficulty ? <p>{errors.difficulty}</p> : null}
        </div>
        <div>
          <label>Duration</label>
          <input
            type="text"
            name="duration"
            placeholder="Insert Duration.."
            value={input.duration}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Season</label>
          <select name="season" id="" onChange={(e) => handleSelectSeason(e)}>
            <option value="Winter">Winter</option>
            <option value="Summer">Summer</option>
            <option value="Autumn">Autumn</option>
            <option value="Spring">Spring</option>
          </select>
        </div>
        <div>
          <label>Countries for Activity</label>
          <select name="countries" onChange={(e) => handleSelectCountries(e)}>
            {countries?.map((country) => {
              return (
                <option value={country.name} key={country.id}>
                  {country.name}
                </option>
              );
            })}
          </select>
          {input.countries.length > 0 ? (
            <div>
              {input.countries.map((country, index) => {
                return (
                  <div key={index}>
                    <span>{country}</span>
                    {/* <button onClick={() => handleDeleteCountries(country)}> Delete X</button> */}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        <button type="submit">Create Activity</button>
      </form>
    </div>
  );
}

export default Form;
