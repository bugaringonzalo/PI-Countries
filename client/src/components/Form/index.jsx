import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { postActivity, getActivities } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function Form () {
    const dispatch = useDispatch();
    const activities = useSelector ( (e) => e.activities)

    const [input, setInput] = useState ({
        name: '',
        difficulty: 0,
        duration: 0,
        season: '',
        countries: []
    })

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log({input})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Character created Successfully');
        dispatch(postActivity(input));
    }

    useEffect(() => {
        getActivities();
        console.log('useEffect displayed')
    }, [dispatch])

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" placeholder='Insert Name..' value={input.name} onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Difficulty</label>
                    <input type="text" name="difficulty" placeholder='Insert Difficulty..' value={input.difficulty} onChange={(e) => handleChange(e)} />
                </div>
                <button type="submit">Create Activity</button>
            </form>
        </div>
    )
}


export default Form;