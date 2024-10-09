import React, { useState , useContext} from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../Context/Notes/noteContext";
const Login = () => {
  const {showAlert}= useContext(noteContext);
  const [loginCredential,setLoginCredential]=useState({
    email: "",
    password: "",
  });
  let navigate =useNavigate();
  const handleSubmit = async (e) => {
    // console.log(loginCredential)
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/login";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginCredential),
      });
      const json = await response.json();
      if (!response.ok) {
        showAlert(json.error, "danger");
        throw new Error(`Response status: ${response.statusText}`);
      }
      // console.log(json);
      localStorage.setItem("auth-token",json.authToken)
      if(localStorage.getItem('auth-token')){
        navigate('/')
      }
    } catch (error) {
      // console.error(error.message);
    }
  };
  const onChange=(e)=>{
    setLoginCredential({...loginCredential,[e.target.name]:e.target.value})
    // console.log(loginCredential)
}


  return (
    <div className="container my-2">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            autoComplete="currentPassword"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          // onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
