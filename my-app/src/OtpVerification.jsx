import React, { useState, useRef } from "react";
// import { useUser } from "../context/UserContext";
import { useUser } from "./context/UserContext";

import "./OtpVerification.css";

const OtpVerification = () => {
  const { userData } = useUser();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto move to next box
      if (value && index < 3) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) {
      alert("Please enter a valid 4-digit OTP.");
      return;
    }
    console.log(userData.phone)
    console.log(userData.email)
    console.log(enteredOtp)

    try {
      const res = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: userData.phone,
          email: userData.email,
          otp: enteredOtp,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("OTP Verified Successfully!");
        console.log("Verified User:", data);
        // Navigate to dashboard or next step
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="otp-container">
      <form className="otp-form" onSubmit={handleSubmit}>
        <h2>Verify OTP</h2>
        <p>We have sent a 4-digit OTP to {userData.phone}</p>

        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
              required
            />
          ))}
        </div>

        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default OtpVerification;
