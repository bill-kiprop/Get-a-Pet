import React from 'react'
import { Container } from 'react-bootstrap'
import Petcard from './petcards'
import Nbar from './Navbar'
import {Col, Row} from 'react-bootstrap'

export default function Petpage() {
  return (
    <>
    <Nbar/>
   <Container className='mt-10'>
    <Row >
    {new Array(12).fill(Math.random()).map((_,index) => (
        <Col key={index} className='mb-5'>
    <Petcard />
         </Col>
   ))}
    </Row>
   </Container>
   </>
  )
}
