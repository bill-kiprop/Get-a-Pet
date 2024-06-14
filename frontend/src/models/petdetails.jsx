import React from 'react'
import Nbar from './Navbar'
import { Button, Col, Container, NavLink, Row } from 'react-bootstrap'
import AdoptPet from './adoptpet'

export default function Petdetails() {
  return (
    <div>
        <Nbar/>
        <div>
            <NavLink to={"/pets"}>
                <Button bg="primary">go back</Button>
            </NavLink>
        </div>
        <div>

            <h1>Pet name</h1>
        </div>
        <Container>
            <Row>
                <Col>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlqcmwqMCQJxUcg7jvgvC8QWYRbkxZP-za-Q&s" className='petimage'/>

                </Col>
                 <Col>
                 <p>Pet details</p>
                 </Col>
            </Row>
        </Container>
        <div>
            <AdoptPet/>
        </div>
    </div>
  )
}
