import { useState } from 'react';

export const Login = () => {
  const [email, setEmail] = useState("");
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/auth/login', {
        method: 'POST',
        body: {
          userEmail: email
        }
      });
    } catch(err) {
      console.log(err);
    }
  }

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  }

  return (
    <div>
      <h2>Login Page</h2>
      <form>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" onChange={handleEmailChange} value={email} />
        <button onClick={handleLoginSubmit}>Sign In</button>
      </form>
    </div>
  );
}