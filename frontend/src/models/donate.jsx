import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { BASE_URL } from './utils';
import Nbar from './Navbar';
import './home.css';

const schema = z.object({
  userID: z.string().min(1, { message: 'UserID is required' }),
  pet_name: z.string().min(1, { message: 'Pet name is required' }),
  pet_age: z.string().min(1, { message: 'Age is required' }),
  pet_breed: z.string().min(1, { message: 'Breed is required' }),
  pet_species: z.string().min(1, { message: 'Species is required' }),
  pet_description: z.string().min(1, { message: 'Description is required' }),
  pet_image_url: z.string().url({ message: 'Invalid URL' }).min(1, { message: 'Image URL is required' }),
});

function DonationForm() {
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      userID: '',
      pet_name: '',
      pet_age: '',
      pet_breed: '',
      pet_species: '',
      pet_description: '',
      pet_image_url: '',
    }
  });

  const onSubmit = async (data) => {
    const petData = {
      user_id: data.userID,
      pet_name: data.pet_name,
      pet_age: parseInt(data.pet_age, 10),
      pet_breed: data.pet_breed,
      pet_species: data.pet_species,
      pet_description: data.pet_description,
      pet_image_url: data.pet_image_url,
    };
  
    try {
      const response = await fetch(`${BASE_URL}/pets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petData),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to submit donation');
      }
  
      alert('Donation submitted successfully!');
      reset();
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting your donation. Please try again.');
    }
  };

  return (
    <div>
      <Nbar/>
      <div style={{backgroundColor:'#E6BEA0', paddingBottom:'200px'}}>
        <Container>
          <h2>Donate a Pet</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>User ID</Form.Label>
              <Controller
                name="userID"
                control={control}
                render={({ field }) => <Form.Control {...field} />}
              />
              {errors.userID && <Alert variant="danger">{errors.userID.message}</Alert>}
            </Form.Group>
            
            <Form.Group>
              <Form.Label>Pet Name</Form.Label>
              <Controller
                name="pet_name"
                control={control}
                render={({ field }) => <Form.Control {...field} />}
              />
              {errors.pet_name && <Alert variant="danger">{errors.pet_name.message}</Alert>}
            </Form.Group>
            
            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Controller
                name="pet_age"
                control={control}
                render={({ field }) => <Form.Control {...field} />}
              />
              {errors.pet_age && <Alert variant="danger">{errors.pet_age.message}</Alert>}
            </Form.Group>
            
            <Form.Group>
              <Form.Label>Breed</Form.Label>
              <Controller
                name="pet_breed"
                control={control}
                render={({ field }) => <Form.Control {...field} />}
              />
              {errors.pet_breed && <Alert variant="danger">{errors.pet_breed.message}</Alert>}
            </Form.Group>
            
            <Form.Group>
              <Form.Label>Species</Form.Label>
              <Controller
                name="pet_species"
                control={control}
                render={({ field }) => <Form.Control {...field} />}
              />
              {errors.pet_species && <Alert variant="danger">{errors.pet_species.message}</Alert>}
            </Form.Group>
            
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Controller
                name="pet_description"
                control={control}
                render={({ field }) => <Form.Control as="textarea" rows={3} {...field} />}
              />
              {errors.pet_description && <Alert variant="danger">{errors.pet_description.message}</Alert>}
            </Form.Group>
            
            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Controller
                name="pet_image_url"
                control={control}
                render={({ field }) => <Form.Control {...field} />}
              />
              {errors.pet_image_url && <Alert variant="danger">{errors.pet_image_url.message}</Alert>}
            </Form.Group>
            
            <button type="submit" className="button-primary" style={{ marginTop: '20px' }}>
              Submit Donation
            </button>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default DonationForm;
