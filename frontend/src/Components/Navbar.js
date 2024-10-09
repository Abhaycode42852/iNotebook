import React, { useEffect } from 'react';
import {
    Link,
    useLocation,
    useNavigate
  } from "react-router-dom";

function Navbar(params) {
  let location=useLocation();
  let navigate=useNavigate();
  const authToken=localStorage.getItem('auth-token')
  useEffect(()=>{
    if(!authToken){
      navigate('/login')
    }
  },[authToken])

  const handleClick=()=>{
    localStorage.clear()
  }


    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/About"?"active":""}`} aria-current="page" to="/About">About</Link>
        </li>
      </ul>
      <form className="d-flex">
        <Link className={`btn btn-primary mx-1 ${authToken?'d-none':''}`} to="/login" role='button'>Login</Link>
        <button className={`btn btn-primary mx-1 ${authToken?'':'d-none'}`} onClick={handleClick}>Logout</button>
        <Link className={`btn btn-primary mx-1 ${authToken?'d-none':''}`} to="/signup" role='button'>SignUp</Link>
      </form>
    </div>
  </div>
</nav>
    );
}
export default Navbar;