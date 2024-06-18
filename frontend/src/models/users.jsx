import React, { useEffect, useState } from 'react'
import { BASE_URL } from './utils';
import Usercard from './usecard';
import Nbar from './Navbar';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Users() {
   const [users , fetchUsers] = useState([])

   useEffect(() => {
    fetch(`${BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        fetchUsers(data);
      })
      .catch((err) => console.log(err));
  }, []);
 
  return (
    <div >
      <Nbar />
      <div className='page'>
      <NavLink to={'/users/create'}>
               <button className='button-primary'>CREATE PROFILE</button>
               </NavLink>
      <Container className="mt-10">

        <Row>
          {users.map((user) => (
            <Col key={user.id} className="mb-5">
              <Usercard
                id ={user.id}
                name ={user.name}
                phone={user.phone}
                address={user.address}
                bio = {user.bio}
                image = {user.image}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
    </div>
  )
}

export default Users