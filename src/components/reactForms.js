import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    age: '',
    gender: "",
    country: "",
    isSubscribed: false,
    comments: "",
  });

  const [errors, setErrors] = useState({})

  const [isFormValid, setIsFormValid] = useState()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    console.log(name, value, type, checked);
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    console.log(formData, "Form Data");
  };

  function handleBlur(e){
    const existingErrors = {...errors};
    const {name, value} = e.target;

    if(!value) existingErrors[name] = `${name} is required`;
    else delete existingErrors[name];

    setErrors(existingErrors);
  }

  function validateForm(formData){
    const errorsData = {};
    if(!formData.firstname) errorsData.firstname = "First Name is required";
    if(!formData.lastname) errorsData.lastname = "Last Name is required";
    if(!formData.password) errorsData.password = "Password is required";
    if(!formData.age) errorsData.age = "Age is required";

    return errorsData;
  }

  function handleSubmit(e){
    e.preventDefault();
    console.log(formData, "Form Data upon Submitting");

    const errorsData = validateForm(formData);
    setErrors(errorsData);
  }

  const checkFormValidity = () => {
    const formErrors = validateForm(formData);
    setIsFormValid(Object.keys(formErrors).length === 0);
  };

  useEffect(() => {
    checkFormValidity();
  }, [formData, errors]);

  return (
    <div className="App">
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="First Name"
            onBlur={handleBlur}
            required
          ></input>
          {
            errors.firstname && (
              <p style={{ color: 'red' }}>{ errors.firstname }</p>
            )
          }
        </label>

        <label>
          Last Name
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            required
            onBlur={handleBlur}
          ></input>
          {
            errors.lastname && (
              <p style={{ color: 'red' }}>{ errors.lastname }</p>
            )
          }
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            onBlur={handleBlur}
            required
          ></input>
          {
            errors.password && (
              <p style={{ color: 'red' }}>{ errors.password }</p>
            )
          }
        </label>

        <label>
          Age
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="age"
            onBlur={handleBlur}
            min={1}
            max={100}
            required
          ></input>
          {
            errors.age && (
              <p style={{ color: 'red' }}>{ errors.age }</p>
            )
          }
        </label>

        <label>
          Gender
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={handleChange}
            checked={formData.gender === 'male'}
          ></input> Male

          <input
            type="radio"
            name="gender"
            value="female"
            onChange={handleChange}
            checked={formData.gender === 'female'}
          ></input> Female
        </label>

        <label>
          Country
          <select name="country" onChange={handleChange} value={formData.country}>
            <option value="" disabled>--Select an option--</option>
            <option value="India">India</option>
            <option value="US">US</option>
            <option value="Russia">Russia</option>
          </select>
        </label>

        <label>
          Subscribe
          <input
            type="checkbox"
            name="isSubscribed"
            onChange={handleChange}
            checked={formData.isSubscribed === true}
          ></input>
        </label>
        
        <label>
          Comments
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Comments"
          ></textarea>
        </label>

        <button type="submit" disabled={!isFormValid}>Submit</button>
      </form>
    </div>
  );
}

export default App;
