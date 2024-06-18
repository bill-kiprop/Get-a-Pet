import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { BASE_URL } from './utils';
import { Container } from 'react-bootstrap';
import Nbar from './Navbar';
import './home.css'

// Define Zod schema for user form validation
const userSchema = z.object({
  name: z.string({
    required_error: 'Name is required'
  }).min(1, { message: 'Name is required' }),
  phone: z.string({
    required_error: 'Phone Number is required'
  }).min(10, { message: 'Phone number is too short' })
    .max(10, { message: 'Phone number is too long' }),
  address: z.string({
    required_error: 'Address is required'
  }).min(1, { message: 'Address is required' }),
  bio: z.string().min(1, { message: 'Bio is required' }),
  image: z.string().url({ message: 'Invalid image URL' }).min(1, { message: 'Image URL is required' }),
});

function UserForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const { control, handleSubmit, formState, setError: setFormError } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      bio: '',
      image: ''
    }
  });

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/users/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else {
        setSubmitted(true);
        setError(null);
      }
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      setError('There was a problem submitting the form. Please try again.');
    }
  };

  return (
    <div style={{backgroundColor:'#E6BEA0'}}>
    <Nbar/>
    <Container style={{ paddingBottom:'800px'}}>
      {submitted && (
        <Alert variant="success" onClose={() => setSubmitted(false)} dismissible>
          Your form has been submitted successfully!
        </Alert>
      )}

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" {...field} />
                  {fieldState.invalid && (
                    <Form.Text className="text-danger">
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
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="tel" placeholder="Enter your phone number" {...field} />
                  {fieldState.invalid && (
                    <Form.Text className="text-danger">
                      {fieldState.error.message}
                    </Form.Text>
                  )}
                </Form.Group>
              )}
            />

            <Controller
              name="address"
              control={control}
              render={({ field, fieldState }) => (
                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" placeholder="Enter your address" {...field} />
                  {fieldState.invalid && (
                    <Form.Text className="text-danger">
                      {fieldState.error.message}
                    </Form.Text>
                  )}
                </Form.Group>
              )}
            />

            <Controller
              name="bio"
              control={control}
              render={({ field, fieldState }) => (
                <Form.Group controlId="formBio">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control as="textarea" placeholder="Tell us about yourself" {...field} />
                  {fieldState.invalid && (
                    <Form.Text className="text-danger">
                      {fieldState.error.message}
                    </Form.Text>
                  )}
                </Form.Group>
              )}
            />

            <Controller
              name="image"
              control={control}
              render={({ field, fieldState }) => (
                <Form.Group controlId="formImage">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control type="url" placeholder="Enter the URL of your image" {...field} />
                  {fieldState.invalid && (
                    <Form.Text className="text-danger">
                      {fieldState.error.message}
                    </Form.Text>
                  )}
                </Form.Group>
              )}
            />

            <button variant="primary" className='button-primary' type="submit" disabled={formState.isSubmitting} style={{marginTop:'50px'}}>
              {formState.isSubmitting ? 'Creating...' : 'Create'}
            </button>
          </Form>
          </Container>
    </div>
  );
}

export default UserForm;
