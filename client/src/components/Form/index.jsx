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
    <div className="form-container-all">
      <Link to={"/home"}>
        <button className="details-button">
            <svg height="16" width="20" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
            <span>Back to Home!</span>
        </button>
      </Link>
      <div>
        <h3>Activity Creator</h3>
      </div>
      <form className="form-centering" onSubmit={(e) => handleSubmit(e)}>
        <div className="input-group-form">
          <input 
            type="text" 
            name="name" 
            value={input.name} 
            className="input-form" 
            onChange={(e) => handleChange(e)}
          />
          <label className="user-label-form">First Name</label>
          {errors.name ? <p>{errors.name}</p> : null} 
        </div>
        <div className="input-group-form">
          <input
            type="text"
            name="difficulty"
            placeholder="Insert Difficulty.."
            value={input.difficulty}
            className="input-form" 
            onChange={(e) => handleChange(e)}
          />
          <label className="user-label-form">Difficulty</label>
          {errors.difficulty ? <p>{errors.difficulty}</p> : null}
        </div>
        <div className="input-group-form">
          <input
            type="text"
            name="duration"
            placeholder="Insert Duration.."
            className="input-form" 
            value={input.duration}
            onChange={(e) => handleChange(e)}
          />
          <label className="user-label-form">Duration</label>
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
