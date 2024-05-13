import React, { useState, useEffect } from 'react'
import CreateForm from '../components/CreateForm'

function CreatePost() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`/api/auth/username`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
      });
      const user = await response.json();
      if (response.ok) {
        setUsername(user);
      }
    }
    getUser();
  }, []);
  return (
    <main>
        <h1 className='text-center text-xl text-gray-500 mb-[20px]'>Create a new post</h1>
        <CreateForm username={username} />
    </main>
  )
}

export default CreatePost