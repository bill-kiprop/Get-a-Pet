import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import { BASE_URL } from './utils';

function Petcard() {
  const [pets, setPets] = useState([])

  useEffect(() => {
    fetch(`${BASE_URL}/pets`,{
      method:'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then((data) => {
      console.log(data)
    }).catch((err) => console.log(err))
  }, [])


  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlqcmwqMCQJxUcg7jvgvC8QWYRbkxZP-za-Q&s" />
      <Card.Body>
        <Card.Title>Pet name</Card.Title>
        <Card.Text>
          description of the pet
        </Card.Text>
        <NavLink to={"/petdetails"}>
        <Button variant="primary">View more</Button>
        </NavLink>
      </Card.Body>
    </Card>
  );
}

export default Petcard;
