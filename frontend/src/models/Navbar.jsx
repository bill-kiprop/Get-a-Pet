import React from 'react'
import { Container, Nav,Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Nbar() {
  return (
    <>
     <Navbar data-bs-theme="dark" className='navbar'>
        <Container>
          <Navbar.Brand href="#home">GET A PET</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink to ={"/"}>
               <button> Home</button>
            </NavLink>
          </Nav>
          <Nav>
            
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Nbar