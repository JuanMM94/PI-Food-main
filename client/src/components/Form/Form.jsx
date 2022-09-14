import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createRecipe, getAllDiets } from "../../redux/actions";
import Nav from "../Nav/Nav";

// import './Home.css';


const Form = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDiets());
  }, [dispatch])

  const selectAllDiets = useSelector(state => state.diets);
  const allDiets = [...selectAllDiets];
  
  const [form, setForm] = useState({
    title: '',
    summary: '',
    healthScore: 0,
    steps: '',
    image: '',
    diets: []
  });

  function handleSubmit (event) {
    event.preventDefault();
    if (!form.title || !form.summary) {
      alert('Title and/or summary missing.')
    } else if (/\b([a-z]+)\b/i.test(form.title) && /^[1-9][0-9]?0?$/.test(form.healthScore)) {
      dispatch(createRecipe(form));
      alert('Recipe created!');
      history.goBack();
    } else alert('Check the format of your submission.');
  };

  function handleChange (event) {   
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  function handleCheck (event) {
    if (event.target.checked) {
      setForm({
        ...form,
        diets: form.diets.concat(event.target.value)
      });
    } else if (!event.target.checked) {
      setForm({
        ...form,
        diets: form.diets.filter(el => el !== event.target.value)
      });
    };
  };

  return (
    
    <>
    <Nav />
    <form className="container-form">
      <label>Recipe title:
        <input type="text" id="title" name="title" value={form.title} onChange={event => handleChange(event)} />
      </label>
      <label>Summary:
        <input type="text" id="summary" name="summary" value={form.summary} onChange={event => handleChange(event)} />
      </label>
      <label>Health Score:
        <input type="number" id="healthScore" name="healthScore" value={form.healthScore} onChange={event => handleChange(event)} />  
      </label>
      <label>Steps:
        <input type="text" id="steps" name="steps" value={form.steps} onChange={event => handleChange(event)} />
      </label>
      <label>Image link:
        <input type="text" id="image" name="image" value={form.image} onChange={event => handleChange(event)} />
      </label>
      <span>Pick one or more diets: </span>
      <div className="container-checkbox">
        {
          allDiets?.map((el, index) => (
            <li key={index}>
            <label>
              <input type="checkbox" onChange={event => handleCheck(event)} value={el.id} />
              {el.name}
            </label>
            </li>
        )) 
        }
      </div>
      <button onClick={event => handleSubmit(event)}>Submit Recipe</button>
    </form>
    </>
  
  )
};

export default Form;
