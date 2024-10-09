import React,{useState, useContext} from 'react';
import noteContext from "../Context/Notes/noteContext";
import {useNavigate} from 'react-router-dom';

const Signup = () => {
  let navigate=useNavigate()
  const {showAlert}=useContext(noteContext)
  const [Credential,setCredential]=useState({
    name:"",
    email: "",
    password: "",
    confirmPassword:""
  });


  const onChange=(e)=>{
    setCredential({...Credential,[e.target.name]:e.target.value})
    // console.log(Credential)
}

const handleSubmit = async (e) => {
  // console.log(Credential)
  e.preventDefault();
  if(Credential.password!==Credential.confirmPassword){
    showAlert("Confirm password and Password Should Match",'danger');
  }
  const url = "http://localhost:5000/api/auth/createUser";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(Credential),
      });
      const json = await response.json();
      if (!response.ok) {
        showAlert(json.error,'danger')
        throw new Error(`Response status: ${response.status}`);
      }
      localStorage.setItem("auth-token",json.authToken)
      if(localStorage.getItem('auth-token')){
        navigate('/')
      }
    }catch (error) {
      // console.error(error.message);
    }
}




  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" onChange={onChange} name='name' aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" onChange={onChange} name='email' aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" autoComplete='password' className="form-control" id="password" onChange={onChange} name='password'/>
  </div>
  <div className="mb-3">
    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
    <input type="password" autoComplete='confirmPassword' className="form-control" id="confirmPassword" onChange={onChange} name='confirmPassword'/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
