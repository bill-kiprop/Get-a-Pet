import React, { useEffect, useState } from 'react'
import Nbar from './Navbar'
import { Button, Col, Container, NavLink, Row } from 'react-bootstrap'

import { BASE_URL } from './utils';
import { useNavigate, useParams } from 'react-router-dom';
import './petpage.css'


export default function Userpage() {
    const [user, setUser] = useState([]);
    const params = useParams()
    const previousPage = useNavigate()
      

  useEffect(() => {
    fetch(`${BASE_URL}/users/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, [params.id]);
  return (
    <div>
       <Nbar/>
    <div className='userspage'>
       
        
        <div>
        <button className='button-primary' onClick={() => {previousPage-1}}>BACK</button>
            
        </div>
        <Container>
            <Row>
                <Col>
                <img src={user.image}className='pfp'/>
                <h1 className='text'>{user.name}</h1>
                </Col>
                 <Col>
                 <p><b>USER ID: </b>{user.id}</p>
                 <p className='description'>{user.bio}</p>
                 
                 </Col>
            </Row>
        </Container>
        
    </div>
    </div>
  )
}
