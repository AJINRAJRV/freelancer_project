import React, { useState } from 'react'
import "./Register.scss";
import upload from '../../utils/upload.js';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';


const Register = () => {

  const [file, setFile] = useState(null)

  const [errorMessage, setErrorMessage] = useState(""); // General form error

  const [availabilityError, setAvailabilityError] = useState({}); // Username/email errors

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    phone: "",
    desc: "",
  });

const navigate= useNavigate();

// Handles input field changes
const handleChange = (e) => {
  setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  setAvailabilityError((prev) => ({ ...prev, [e.target.name]: "" })); // Clear previous errors
};

 // Handles seller checkbox
  const handleSeller = (e) => {
    setUser((prev => {
      return { ...prev, isSeller: e.target.checked };
    }));
  };

  // Check username/email availability
  const checkAvailability = async (field, value) => {
    if (!value.trim()) return; // Ignore empty input

    try {
      const response = await newRequest.post("/auth/check-availability", { [field]: value });
      console.log(`${field} is available:`, response.data.message);
    } catch (error) {
      if (error.response) {
        setAvailabilityError((prev) => ({ ...prev, [field]: error.response.data.message }));
      }
    }
  };

   // Form validation function
   const validateForm = () => {
    const { username, email, password, country, phone } = user;

    if (!username.trim()) return "Username is required.";
    if (!/^[a-zA-Z0-9_]{3,15}$/.test(username)) return "Username must be 3-15 characters and contain only letters, numbers, or underscores.";

    if (!email.trim()) return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format.";

    if (!password.trim()) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";

    if (!country.trim()) return "Country is required.";

    if (phone) {
      const usPhonePattern = /^(\+1)?\d{10}$/; // Allows +1XXXXXXXXXX or just 10-digit US numbers
      const indiaPhonePattern = /^(\+91)?\d{10}$/; // Allows +91XXXXXXXXXX or just 10-digit Indian numbers
  
      if (!usPhonePattern.test(phone) && !indiaPhonePattern.test(phone)) {
          return "Phone number must be a 10-digit number (India/US) or in +1XXXXXXXXXX / +91XXXXXXXXXX format.";
      }
  }
  

    return null;
  };
  
  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error before validation

    const validationError = validateForm();
    if (validationError) return setErrorMessage(validationError);

    let imgUrl = "";
    if (file) {
      imgUrl = await upload(file);
    }

    try {
      await newRequest.post("/auth/register", { ...user, img: imgUrl });
      navigate("/login");
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data.message || "Something went wrong.");
      } else {
        setErrorMessage("Network error. Please try again.");
      }
    }
  };
    // const url= await upload(file);

  //   try {
  //     await newRequest.post("/auth/register",{
  //       ...user,
  //       img:url,
  //     });
  //     navigate("/")
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };



//   return (
//     <div className="register">
//       <form onSubmit={handleSubmit}>
//         <div className="left">
//           <h1>Create a new account</h1>
//           <label htmlFor="">Username</label>
//           <input
//             name="username"
//             type="text"
//             placeholder="johndoe"
//             onChange={handleChange}
//           />
//           <label htmlFor="">Email</label>
//           <input
//             name="email"
//             type="email"
//             placeholder="email"
//             onChange={handleChange}
//           />
//           <label htmlFor="">Password</label>
//           <input name="password" type="password" onChange={handleChange} />
//           <label htmlFor="">Profile Picture</label>
//           <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//           <label htmlFor="">Country</label>
//           <input
//             name="country"
//             type="text"
//             placeholder="Usa"
//             onChange={handleChange}
//           />
//           <button type="submit">Register</button>
//         </div>
//         <div className="right">
//           <h1>I want to become a seller</h1>
//           <div className="toggle">
//             <label htmlFor="">Activate the seller account</label>
//             <label className="switch">
//               <input type="checkbox" onChange={handleSeller} />
//               <span className="slider round"></span>
//             </label>
//           </div>
//           <label htmlFor="">Phone Number</label>
//           <input
//             name="phone"
//             type="text"
//             placeholder="+1 234 567 89"
//             onChange={handleChange}
//           />
//           <label htmlFor="">Description</label>
//           <textarea
//             placeholder="A short description of yourself"
//             name="desc"
//             id=""
//             cols="30"
//             rows="10"
//             onChange={handleChange}
//           ></textarea>
//         </div>
//       </form>
//     </div>
//   );
// }

return (
  <div className="register">
    <form onSubmit={handleSubmit}>
      <div className="left">
        <h1>Create a new account</h1>
        {errorMessage && <p className="error">{errorMessage}</p>} {/* General form error */}

        <label>Username</label>
        <input
          name="username"
          type="text"
          placeholder="e.g., john_doe123"
          onChange={handleChange}
          onBlur={(e) => checkAvailability("username", e.target.value)}
          required
        />
        {availabilityError.username && <p className="error">{availabilityError.username}</p>}

        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder="e.g., johndoe@gmail.com"
          onChange={handleChange}
          onBlur={(e) => checkAvailability("email", e.target.value)}
          required
        />
        {availabilityError.email && <p className="error">{availabilityError.email}</p>}

        <label>Password</label>
        <input name="password" type="password" placeholder="At least 6 characters" onChange={handleChange} required />

        <label>Profile Picture</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <label>Country</label>
        <input name="country" type="text" placeholder="e.g., United States" onChange={handleChange} required />

        <button type="submit">Register</button>
      </div>

      <div className="right">
        <h1>I want to become a seller</h1>
        <div className="toggle">
          <label>Activate the seller account</label>
          <label className="switch">
            <input type="checkbox" onChange={handleSeller} />
            <span className="slider round"></span>
          </label>
        </div>

        <label>Phone Number</label>
        <input name="phone" type="text" placeholder="e.g., +11234567890 (US) or +919876543210 (India)" onChange={handleChange} />

        <label>Description</label>
        <textarea placeholder="A short description of yourself" name="desc" cols="30" rows="10" onChange={handleChange}></textarea>
      </div>
    </form>
  </div>
);
};

export default Register;