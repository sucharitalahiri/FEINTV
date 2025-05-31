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
      setMessage('Welcome, user!');
    } else {
      setMessage('Invalid username or password');
    }
  };

  return (
    <div>
      <h1>Login Page</h1>

      {message && <p>{message}</p>}

      {!isLoggedIn && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Username:
              <input
                type="text"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              Password:
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
