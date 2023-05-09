import React, { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://pokemon-backend.herokuapp.com/users",
        {
          username,
          password,
        }
      );

      // Set the isLoggedIn state to true
      props.setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
      setError("Invalid username or password");
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post("https://pokemon-backend.herokuapp.com/signup", {
        username,
        password,
      });
      // Set the isLoggedIn state to true
      props.setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
      setError("Failed to create user");
    }
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <Button style={styles.button} title="Login" onPress={handleLogin} />
        <Button style={styles.button} title="Signup" onPress={handleSignup} />
      </form>
    </div>
  );
}
