import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // Need for using useNavigate
  const navigate = useNavigate();

  // Use authcontext 
const { storetokenInLS } = useAuth();


  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      });
      const res_data = await response.json()
    if(response.ok){
      storetokenInLS(res_data.token)
      setUser({email: "", password: ""})
      toast.success("Login Successful")
      navigate('/');
    } else {
      // Handle invalid credentials or other errors
      alert(res_data.extraDetails ? res_data.extraDetails : res_data.message)
      alert("Invalid credentials");
    }
    } catch (error) {
        console.log("Login", error)
    }
  };
  return (
      <>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/register.png"
                  alt="a nurse with a cute look"
                  width="500"
                  height="500"
                />
              </div>
              {/* our main Login code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">LOGIN FORM</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div >
                    <label  htmlFor="email">EMAIL</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="password">PASSWORD</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </>
  )
}

export default Login
