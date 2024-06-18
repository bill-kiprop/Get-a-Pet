import React, { useEffect, useState } from 'react';
import Nbar from './Navbar';
import { NavLink } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import "./home.css";
import { BASE_URL } from './utils';

function Homepage() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/pets`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((data) => setPets(data));
  }, []);

  return (
    <div className='home'>
      
      <div className="homepage">
        <div className="intro-section">
          <div className="text-wrapper">
            <div>
            <h1 className="header1">Get a Pet Foundation</h1>
            <p className="paragraph1">
              Welcome to Get a Pet, your one-stop destination for adopting adorable pets and bringing joy into your life!
            </p>
            </div>
            <div className="full-text">
              <h3><b><i>Discover Your Perfect Companion:</i></b></h3>
              <p>
                Browse through our extensive catalogue of pets available for adoption, including dogs, cats, rabbits, birds, and more. Each pet profile features detailed information about their breed, age, personality, and unique characteristics to help you find the perfect match for your lifestyle and preferences.
              </p>
              <h3><b>Easy Adoption Process:</b></h3>
              <p>
                Our streamlined adoption process makes it easy and convenient to welcome a new furry friend into your home. Simply browse our available pets, fill out an adoption application form, and our dedicated team will guide you through the rest of the process. From initial application to home visits and final adoption, we are committed to ensuring a smooth and rewarding experience for both you and your new companion.
              </p>
              <h3><b>Supportive Community:</b></h3>
              <p>
                Join our vibrant community of pet lovers and enthusiasts to connect with like-minded individuals, share stories, and receive valuable advice and support on pet care, training, and health. Our platform also features helpful resources, articles, and expert tips to help you provide the best possible care for your beloved pet.
              </p>
              <h3><b>Make a Difference:</b></h3>
              <p>
                By choosing to adopt from Get a Pet, you are not only gaining a loyal and loving companion but also making a meaningful difference in the lives of animals in need. Each adoption helps reduce pet overpopulation, alleviate the burden on shelters, and gives deserving pets a second chance at a happy and fulfilling life.
              </p>
              <h3><b>Find Your New Best Friend Today:</b></h3>
              <p>
                Whether you're looking for a playful puppy, a cuddly kitten, or a gentle senior pet, Get a Pet has the perfect match waiting for you. Start your journey towards pet parenthood today and experience the unconditional love and joy that only a furry friend can bring. Join Get a Pet and embark on a heartwarming adventure of companionship, loyalty, and endless tail wags!
              </p>
            </div>
          </div>
          <div className="carousel-container">
            {pets.length > 0 ? (
              <Carousel>
                {pets.map((pet) => (
                  <Carousel.Item key={pet.id}>
                    <img
                      className="d-block w-100 rounded"
                      src={pet.image}
                      alt={pet.name}
                      style={{ width: '500px', height: '500px', objectFit: 'cover' }}
                    />
                    <Carousel.Caption>
                      <h3>{pet.name}</h3>
                      <p>{pet.breed} - {pet.age} years old</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <p>Loading pets...</p>
            )}
            <div className="buttons-container">
          <NavLink to={'/pets'}>
            <button className="button-primary">Adopt a Pet</button>
          </NavLink>
          <NavLink to={'/donate'}>
            <button className="button-primary">Donate a Pet</button>
          </NavLink>
        </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Homepage;
