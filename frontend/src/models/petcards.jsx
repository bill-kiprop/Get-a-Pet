import './petpage.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';


function Petcard({id,name, image,age,breed}) {
 


  return (
    <Card style={{ width: '300px' }} >
      <img variant="top" src={image} className='image' style={{objectFit:'cover', borderRadius:'5px'}}/>
      <Card.Body className='cards'>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
         AGE: {age}<br/>
         BREED: {breed}
        </Card.Text>
        <NavLink to={`/petdetails/${id}`}>
        <button className='button-primary'>View more</button>
        </NavLink>
      </Card.Body>
    </Card>
  );
}

export default Petcard;
