import { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { BASE_URL } from './utils';


const getSchema = () => z.object({
  name: z.string({
    required_error: "Name is required"
  }).min(1, { message: 'Name is required' }),
  phone: z.string({
    required_error: 'Phone Number is Required'
  }).min(10, { message: 'Phone number is too short' })
  .max(10, {message:'Phone number is too long'}),
  pet_id: z.string({
    required_error: 'Pet required'
  }).min(1, { message: 'Pet id is required' })
  ,
  street: z.string({
    required_error: 'Street is required'
  }).min(1, { message: 'Street is required' }),
  city: z.string({
    required_error: 'City is required'
  }).min(1, { message: 'City is required' }),
  zip: z.string({
    required_error: 'Zip is required'
  }).min(1, { message: 'Zip-Code is required' })
});

function AdoptPet() {
  const [availablePets, setAvailablePets] = useState([]);
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const { control, handleSubmit, formState, setError: setFormError } = useForm({
    resolver: zodResolver(getSchema(availablePets.map(pet => pet.id))),
    defaultValues: {
      name: '',
      phone: '',
      pet_id: '',
      street: '',
      city: '',
      zip: ''
    }
  });

  useEffect(() => {
    const fetchAvailablePets = async () => {
      try {
        const response = await fetch(`${BASE_URL}/pets`);
        const data = await response.json();
        setAvailablePets(data);
      } catch (error) {
        console.error('Error fetching available pets:', error);
      }
    };

    fetchAvailablePets();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setSubmitted(false);
    setShow(true);
  };

  const onSubmit = async (values) => {
    try {
      const response = await fetch(`${BASE_URL}/adoptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 409 && errorData.message.includes('Phone number already exists')) {
          setFormError('phone', {
            type: 'manual',
            message: 'This phone number is already registered.'
          });
        } else {
          throw new Error('Network response was not ok');
        }
      } else {
        const data = await response.json();
        console.log(data);
        setSubmitted(true);
        setError(null);
        setShow(false);
      }
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      setError('There was a problem submitting your application. Please try again.');
    }
  };

  return (
    <>
     {submitted && (
        <Alert variant="success" onClose={() => setSubmitted(false)} dismissible style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1050, padding: '30px' }}>
          Your application has been submitted and will be reviewed. You will be contacted within 1-2 weeks.
        </Alert>
      )}

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1050 }}>
          {error}
        </Alert>
      )}
      <button className='button-primary' onClick={handleShow}>
        Adopt Pet
      </button>
     
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adoption Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>User's Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <Form.Text className='text-danger'>
                      {fieldState.error.message}
                    </Form.Text>
                  )}
                </Form.Group>
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Phone Number:</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Phone"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <Form.Text className='text-danger'>
                      {fieldState.error.message}
                    </Form.Text>
                  )}
                </Form.Group>
              )}
            />
            <Controller
              name="pet_id"
              control={control}
              render={({ field, fieldState }) => (
                <Form.Group className="mb-3" controlId="formPetId">
                  <Form.Label>Pet ID</Form.Label>
                  <Form.Control
                    as="select"
                    {...field}
                  >
                    <option value="">Select Pet</option>
                    {availablePets.map((pet) => (
                      <option key={pet.id} value={pet.id}> {pet.id}</option>
                    ))}
                  </Form.Control>
                  {fieldState.invalid && (
                    <Form.Text className='text-danger'>
                      {fieldState.error.message}
                    </Form.Text>
                  )}
                </Form.Group>
              )}
            />
            <Controller
              name="street"
              control={control}
              render={({ field, fieldState }) => (
                <Form.Group className="mb-3" controlId="formStreet">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Street"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <Form.Text className='text-danger'>
                      {fieldState.error.message}
                    </Form.Text>
                  )}
                </Form.Group>
              )}
            />
            <Controller
              name="city"
              control={control}
              render={({ field, fieldState }) => (
                <Form.Group className="mb-3" controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <Form.Text className='text-danger'>
                      {fieldState.error.message}
                    </Form.Text>
                  )}
                </Form.Group>
              )}
            />
            <Controller
              name="zip"
              control={control}
              render={({ field, fieldState }) => (
                <Form.Group className="mb-3" controlId="formZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Zip-Code"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <Form.Text className='text-danger'>
                      {fieldState.error.message}
                    </Form.Text>
                  )}
                </Form.Group>
              )}
            />
            <Button variant="primary" type="submit" disabled={formState.isSubmitting}>
              {formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={formState.isSubmitting}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
    </>
  );
}

export default AdoptPet;
