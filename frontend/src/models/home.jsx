import React from 'react'
import Nbar from './Navbar'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <div>
        <Nbar/>
        <div className="homepage">
      <div className="homepage-header">
        <h1 className="header">Get a Pet</h1>
        <p className="paragraph"></p>
        <div className="buttons-container">
          <NavLink to={'/pets'}>
          <button className="button-primary">Adopt a Pet</button>
          </NavLink>
          </div>
          </div>
          </div>
          
    </div>
  )
}

export default Home