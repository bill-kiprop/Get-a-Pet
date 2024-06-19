from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from models.pet import Pets
from pydantic import BaseModel
from models.adop_appl import Adopt_applctn
from models.user import User
from allmodels import UserModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AdoptionModel(BaseModel):
    name: str
    phone: int
    pet_id: int
    street: str
    city: str
    zip: str

class PetModel(BaseModel):
    user_id: int
    pet_name: str
    pet_age: int
    pet_breed: str
    pet_species: str
    pet_description: str
    pet_image_url: str


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get('/pets')
def get_pets():
    pets = Pets.find_all()
    return [pet.to_dict() for pet in pets]

@app.get("/pets/{id}")
def get_pet(id: int):
    pet = Pets.find_by_id(id)
    if not pet:
        raise HTTPException(status_code=404, detail="Pet not found")
    return pet.to_dict()

@app.post('/pets')
def create_pet(data: PetModel):    
    try:
        pet = Pets(
            name=data.pet_name,
            age=data.pet_age,
            specie=data.pet_species,
            breed=data.pet_breed,
            description=data.pet_description,
            image=data.pet_image_url
        )  
        pet.save()
        return pet.to_dict()
    except Exception as e:
        print(f"Error creating pet: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/adoptions")
def save_adoption(data: AdoptionModel = Body(...)):
    adoption = Adopt_applctn(
        name=data.name,
        phone=data.phone,
        pet_id=data.pet_id,
        street=data.street,
        city=data.city,
        zip=data.zip
    )
    adoption.save()
    return adoption.to_dict()

@app.post('/users/create')
def save_user(data: UserModel):
    user = User(
        name=data.name,
        phone=data.phone,
        address=data.address,
        bio=data.bio,
        image=data.image
    )
    user.save()
    return user.to_dict()

@app.get('/users/{id}')
def get_user(id: int):
    user = User.find_one(id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user.to_dict()

@app.get('/users')
def get_user():
    users = User.find_all()
    return [user.to_dict() for user in users]