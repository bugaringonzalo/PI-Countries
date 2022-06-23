import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postActivity, getCountries } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";


function Form() {
  const dispatch = useDispatch();
  const countries = useSelector((e) => e.allcountries);

  const [filled, setFilled] = useState(false);

  const validate = (input) => {
    let errors = {};
    if (!input.name.trim()) {
      errors.name = "Activity Name is required";
    } else if (!/[^1-4]/g.test(input.name.trim())) {
      errors.name = "Activity name must be letters only";
    }

    if (!input.difficulty) {
      errors.difficulty = "Activity difficulty is required";
    } else if (input.difficulty > 5 || input.difficulty < 1) {
      errors.difficulty = "Activity difficulty must be between 1 and 5";
    }

    if (!input.duration) {
      errors.duration = "Activity duration is required";
    } 

    if (input.season.length === 0) {
      errors.season = "Activity season is required";
    } 

    if (input.countries.length === 0) {
      errors.countries = "Activity countries is required";
    }

    return errors;

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
    countries: "",
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

  const handleDeleteCountries = (e) => {
        setInput({
            ...input,
            countries: input.countries.filter((country) => country !== e)
        })
        console.log('Country Deleted')
        console.log(input);
    }

  useEffect(() => {
    if(
      input.name.length > 0 &&
      input.difficulty.length > 0 &
      input.duration.length > 0 &
      input.season.length > 0 &
      input.countries.length > 0 
    ) { setFilled(true) }
    else { setFilled(false) }
  }, [input, setFilled]);

  return (
    <div>
      <Link to={"/home"}>
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
          {errors.duration ? <p>{errors.duration}</p> : null}
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
        </div>
        <div>
          <button 
          type={"submit"}
          disabled = { !filled }
          >Create Activity</button>
        </div>
      </form>
      <div>
        {input.countries.length > 0 ? (
              <div>
                {input.countries.map((country, index) => {
                  return (
                    <div key={index}>
                      <span>{country}</span>
                      <button onClick={() => handleDeleteCountries(country)}> Delete X</button>
                    </div>
                  );
                })}
              </div>
            ) : null}
      </div>
    </div>
  );
}

export default Form;
