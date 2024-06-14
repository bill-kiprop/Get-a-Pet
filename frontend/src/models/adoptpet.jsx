import { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const schema = z.object({
  name: z.string({
    required_error: "Name is required"
  }).min(1, { message: 'Name is required' }),
  phone: z.string({
    required_error: 'Phone Number is Required'
  }).min(1, {message: 'Phone number is required'}),
  pet_id: z.string({
    required_error: 'Pet required'
  }).min(1, {message: 'Pet id is required'}),
  street: z.string({
    required_error: 'Street is required'
  }).min(1, {message: 'Street is required'}),
  city: z.string({
    required_error: 'City is required'
  }).min(1, {message:'City is required'}),
  zip: z.string({
    required_error: 'Zip is required'
  }).min(1, {message: 'Zip-Code is required'})
});

function AdoptPet() {
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      pet_id: '',
      street: '',
      city: '',
      zip: ''
    }
  });

  console.log(formState.errors);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Adopt Pet
      </Button>

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
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
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
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                  <Form.Label>Pet ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Pet ID"
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
              name="street"
              control={control}
              render={({ field, fieldState }) => (
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
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
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
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
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
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
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdoptPet;
