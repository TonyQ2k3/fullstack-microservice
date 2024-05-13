import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { logo, userIcon } from '../assets';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function NavBar() {
  const [username, setUsername] = useState(null);
  const history = useHistory();

  useEffect(() => {
      const getUser = async () => {
          const response = await fetch(`/api/auth/username`, {
              method: 'GET',
              mode: 'cors',
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          if (response.status == 200) {
            const user = await response.json();
            setUsername(user);
          }
      }
      getUser();
  }, []);

  const handleSignOut = async () => {
    const response = await fetch(`/api/auth/logout`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
        toast.success('You have logged out. Redirecting back to home page');
        setTimeout(() => {
          history.push('/');
          history.go(0);
        }, 3000);
    }
  }

  return (
    <nav>
        <div className='flex justify-between items-center w-full'>
          <div className='flex items-center'>
            <img src={logo} alt="motion-assists-logo" className='w-[52px] mx-[10px]' />
            <Link to='/'><h1>Motion Blogs</h1></Link>
          </div>
            {
              username ? (
                <div className='flex items-center mr-2'>
                  <img src={userIcon} alt="motion-assists-logo" className='w-[20px] mx-[10px]' />
                  <h3 className='font-semibold mr-4'>{username}</h3>
                  <button className='btn-primary' onClick={handleSignOut}>Sign out</button>
                </div>
              ) : (
                <div className='flex items-center mr-2'>
                  <Link to='/login' className='text-primary text-md mr-4'>Login</Link>
                  <Link to='/signup'>
                    <button className='btn-primary'>Sign up</button>
                  </Link>
                </div>
              )
            }
        </div>
        <ToastContainer autoClose={3000} />
    </nav>
  )
}

export default NavBar