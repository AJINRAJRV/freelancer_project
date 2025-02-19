// import React from 'react';
// import './Login.scss';
// import { useState } from 'react';
// import newRequest from '../../utils/newRequest';
// import { useNavigate } from 'react-router-dom';


// //This Login component handles user authentication by:

// // Taking username and password inputs.
// // Sending them to the backend API via Axios on form submission.
// // If successful, it stores the user data in localStorage and redirects the user.
// // If authentication fails, it displays an error message.

// const Login = () => {

//   // State variables to store username, password, and errors
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const navigate = useNavigate(); //  Hook for programmatic navigation

//   const handleSubmit= async(e)=>{
//     e.preventDefault();  // Prevent page reload
//     try {
      
//       const res= await newRequest.post("/auth/login" , {username,password} );  // Send login request to backend API using Axios

//       //  Store user data in localStorage (to persist login session)
//       localStorage.setItem("currentUser", JSON.stringify(res.data)); 
      
//       // Redirect user to the home page after successful login
//       navigate("/");

//     } catch (err) {
//       setError(err.response.data);
//     }
   
//   };
  
//   return (
//     <div className="login">
//       <form onSubmit={handleSubmit}>
//         <h1>Sign in</h1>
//         <label htmlFor="">Username</label>
//         <input type="text" name="username" id="" placeholder='eg.johndoe' onChange={e=>setUsername(e.target.value)}/>

//         <label htmlFor="">Password</label>
//         <input 
//         type="password" 
//         name="password" 
//         onChange={e=>setPassword(e.target.value)}/>
//         <button type='submit'>Login</button>
//         {error && error}
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useEffect } from 'react';
import './Login.scss';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await newRequest.post("/auth/login", formData);
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      
      // Clear history to prevent back navigation after login
      window.history.replaceState(null, '', '/');

      // Navigate to homepage without cached pages
      navigate("/", { replace: true });
      window.location.reload(); // Ensures fresh state

    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="johndoe"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
