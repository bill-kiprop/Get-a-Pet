import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import Nbar from './Navbar';
import { BASE_URL } from './utils';
import Petcard from './petcards';
import './petpage.css'

export default function Petpage() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/pets`, {
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
  }, []);

  return (
    <>
    <Nbar />
    <div className='page'>
      
      <Container className="mt-10">
        <Row>
          {pets.map((pet) => (
            <Col key={pet.id} className="mb-5">
              <Petcard
                id={pet.id}
                name={pet.name}
                age={pet.age}
                specie={pet.specie}
                breed={pet.breed}
                description={pet.description}
                image={pet.image}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
    </>
  );
}
