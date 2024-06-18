import React, { useEffect, useState } from 'react'
import Nbar from './Navbar'
import { Button, Col, Container, NavLink, Row } from 'react-bootstrap'
import AdoptPet from './adoptpet'
import { BASE_URL } from './utils';
import { useNavigate, useParams } from 'react-router-dom';
import './petpage.css'


export default function Petdetails() {
    const [pets, setPets] = useState([]);
    const params = useParams()
    
      

  useEffect(() => {
    fetch(`${BASE_URL}/pets/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
      })
      .catch((err) => console.log(err));
  }, [params.id]);
  return (
    <div>
       <Nbar/>
    <div className='detailspage'>
       
        
        <div>

            <h1 className='text'>{pets.name}</h1>
        </div>
        <Container>
            <Row>
                <Col>
                <img src={pets.image}className='petimage'/>

                </Col>
                 <Col>
                 <p><b>PET ID: </b>{pets.id}</p>
                 <p className='description'>{pets.description}</p>
                 <AdoptPet/>
                 </Col>
            </Row>
        </Container>
        
    </div>
    </div>
  )
}
