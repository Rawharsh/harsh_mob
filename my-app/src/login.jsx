import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Login.css"; // Import the CSS file
import Signup from "./Signup";
import {Link} from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [deviceToken, setDeviceToken] = useState("");

  useEffect(() => {
    // Generate or get device token from localStorage
    let storedToken = localStorage.getItem("deviceToken");
    if (!storedToken) {
      storedToken = uuidv4();
      localStorage.setItem("deviceToken", storedToken);
    }
    setDeviceToken(storedToken);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      username,
      password,
      deviceToken
    });

    // Later: Send data to backend API
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

       <p className="signup-text">
          Don’t have an account? <Link to="/Signup">Sign up</Link>
      </p>
      </form>
    </div>
  );
}

export default Login;
