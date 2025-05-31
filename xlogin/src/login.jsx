import { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true);
      setMessage('');
    } else {
      setMessage('Invalid username or password');
      setIsLoggedIn(false);
    }
  };

    return (
    <div style={{ padding: "20px" }}>
      <h1>Login Page</h1>

      {isLoggedIn ? (
        <div>
          <p>Welcome, {username}!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {message && <p>{message}</p>}

          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <label htmlFor="username" style={{ width: "100px" }}>
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              required
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <label htmlFor="password" style={{ width: "100px" }}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              required
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
