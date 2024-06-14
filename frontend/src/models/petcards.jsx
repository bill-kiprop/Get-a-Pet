import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';

function Petcard() {
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
