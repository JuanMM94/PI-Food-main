import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createRecipe, getAllDiets } from "../../redux/actions";
import Nav from "../Nav/Nav";
import './Form.css';

// import './Home.css';


const Form = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDiets());
  }, [dispatch])

  const selectAllDiets = useSelector(state => state.diets);
  const allDiets = [...selectAllDiets];

  const [titleError, setTitleError] = useState(true);
  const [summaryError, setSummaryError] = useState(true);
  const [hsError, setHsError] = useState(true);
  const [imgError, setImgError] = useState(true);
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
    if (form.title.trim() === "") {
      alert("You must include a title.");
      return;
    };
    if (form.summary.trim() === "") {
      alert("You must include a summary.");
      return;
    };
    if (titleError || summaryError || hsError || imgError) alert("Check the format of your submission.")
    else {
      dispatch(createRecipe(form));
      alert('Recipe created!');
      history.goBack();
    }
  };

  const handleChange = (event) => {   
    if (/^[a-zA-Z ]*$/i.test(form.title)) setTitleError(false);
    else setTitleError(true);
    if (/^[a-zA-Z ]*$/i.test(form.summary)) setSummaryError(false);
    else setSummaryError(true);
    if (/^[1-9][0-9]?0?$/.test(form.healthScore)) setHsError(false);
    else setImgError(true);
    if (/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|png))/.test(form.image)) setImgError(false);
    else setImgError(true);

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

  useEffect(() => {
    if (/^[a-zA-Z ]*$/i.test(form.title)) setTitleError(false);
    else setTitleError(true);
    if (/^[a-zA-Z ]*$/i.test(form.summary)) setSummaryError(false);
    else setSummaryError(true);
    if (/^[1-9][0-9]?0?$/.test(form.healthScore)) setHsError(false);
    else setImgError(true);
    if (/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|png))/.test(form.image)) setImgError(false);
    else setImgError(true);
  }, [form.healthScore, form.image, form.summary, form.title])

  return (
    
    <>
    <Nav />
    <form className="container-form">
      <ul className="text-form">
        <li>
          <label>Recipe title: 
            <input type="text" id="title" name="title" value={form.title || ''} onChange={event => handleChange(event)} />
          </label>{
            titleError
            ? <p className="error">Must not contain digits or special characters</p>
            : null
          }
        </li>
        <li>
          <label>Summary: 
            <input type="text" id="summary" name="summary" value={form.summary || ''} onChange={event => handleChange(event)} />
          </label>{
            summaryError
            ? <p className="error">Must not contain digits or special characters</p>
            : null
          }
        </li>
        <li>
          <label>Health Score: 
            <input type="number" id="healthScore" name="healthScore" value={form.healthScore || 0} onChange={event => handleChange(event)} />  
          </label>{
            hsError
            ? <p className="error">Must be a digit between 1 and 100</p>
            : null
          }
        </li>
        <li>
          <label>Steps: 
            <input type="text" id="steps" name="steps" value={form.steps || ''} onChange={event => handleChange(event)} />
          </label>
        </li>
        <li>
          <label>Image link: 
            <input type="text" id="image" name="image" value={form.image || ''} onChange={event => handleChange(event)} />
          </label>{
            imgError
            ? <p className="error">Must be a valid url. Allowed formats are png, jpg, jpeg</p>
            : null
          }
        </li>
      </ul>
      <div className="container-checkbox">
      <span>Does it belong to any of these diets?</span>
        <ul>
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
        </ul>
      </div>
      <input type="submit" className="submit" onClick={event => handleSubmit(event)} value="Submit" />
    </form>
    </>
  
  )
};

export default Form;
