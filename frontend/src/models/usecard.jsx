import React from 'react'
import './user.css'
import { Card } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function Usercard({id, name, image}) {
  return (
    <div>
        <Card style={{ width: '300px', backgroundColor:'#E6BEA0', borderRadius:'100%', height:'0px', paddingBottom:'100%', borderColor:'#E6BEA0'}} >
        <img src={image} className='pfp'/>
      <Card.Body style={{backgroundColor:'#E6BEA0'}} >
        <Card.Title >{name}</Card.Title>
        <Card.Text>
        
         
        </Card.Text>
        <NavLink to={`/users/${id}`}>
        <button className='button-primary'>VIEW PROFILE</button>
        </NavLink>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Usercard
