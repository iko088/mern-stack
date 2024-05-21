import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

const Register = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
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

  const {storetokenInLS} = useAuth()

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    });
    const res_data = await response.json()
      storetokenInLS(res_data.token)
  if(response.ok){
    
    setUser({ username: "", email: "", phone: "", password: ""})
    navigate("/login")
  }
  else {
   alert(res_data.extraDetails ? res_data.extraDetails : res_data.message)
    
  }
  } catch (error) {
      console.log("Register", error)
  }
  };
  return (
    <div>
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
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">REGISTRATION FORM</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">USERNAME</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email">EMAIL</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div>
                    <label className='phone' htmlFor="phone">PHONE</label>
                    <input
                      type="number"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                      inputMode='numeric'
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password">PASSWORD</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </>
    </div>
  )
}

export default Register
