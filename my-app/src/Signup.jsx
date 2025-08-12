import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./context/UserContext";
import "./Signup.css";

const Signup = () => {
  const { setUserData } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    profilePhoto: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profilePhoto: file,
      });
      setPreviewImage(URL.createObjectURL(file)); // preview image
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Store phone & email in global context
    setUserData({
      phone: formData.phone,
      email: formData.email,
    });

    // Create formData object for backend (including image)
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    console.log("Signup data:", formData);

    // Example: Send formDataToSend to backend
    // fetch("http://localhost:5000/signup", {
    //   method: "POST",
    //   body: formDataToSend,
    // });

    navigate("/OtpVerification");
  };

  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2>Create Account</h2>
        <p>Please fill in the details to sign up</p>

        {/* Profile Photo Upload */}
        <div className="photo-upload">
          {previewImage ? (
            <img src={previewImage} alt="Preview" className="preview-img" />
          ) : (
            <div className="preview-placeholder">No photo selected</div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>

        <div className="signup-text">
          Already have an account? <a href="/login">Sign In</a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
