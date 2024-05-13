import React from 'react';

import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
        <h2>About</h2>
        <p>
          Motion Blogs is a blogging website where people share their own stories and experiences to others around the globe. With this website, you can express yourself, connect with others and make your voice heard!
          The purpose of this website however, is to be deployed via our team's CI/CD pipeline of our DevOps Project.
        </p>

        <div className="flex justify-center my-8">
          <Link to="/posts">
            <button className="btn-primary">View Blogs</button>
          </Link>
        </div>

        <h2>Tips of the day</h2>

        <div className="card">
            <h3>Rehydration</h3>
            <p>Start your day with a glass of water to rehydrate your body after a night's sleep.</p>
        </div>
        <div className="card">
            <h3>Boosting your mood</h3>
            <p>Express gratitude by writing down three things you're thankful for each day. It can shift your perspective and boost your mood.</p>
        </div>
    </main>
  )
}

export default Home