import React from 'react'
import { logo } from '../assets';
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = { email, password, username};

    const res = await fetch('/api/auth/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    });
    
    if (res.status === 201) {
      toast.success('Registration successful');
      setTimeout(() => {
        history.push('/');
        history.go(0);
      }, 3500);
    } else {
      toast.error('Failed to register');
      setLoading(false);
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit} className="w-1/2">
        <div className='flex w-full justify-center items-center'>
          <img src={logo} alt="motion-assists-logo" className='w-[52px] mx-[10px]' />
        </div>
        <label>
          <span>Username:</span>
          <input
            required 
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </label>
        <label>
          <span>Email:</span>
          <input
            required 
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <button 
          className="btn-primary mt-6" 
          disabled={isLoading}
        >
          {isLoading && <span>Creating...</span>}
          {!isLoading && <span>Create account</span>}
        </button>
        <ToastContainer autoClose={3000} />
      </form>
    </main>
  )
}

export default SignUp