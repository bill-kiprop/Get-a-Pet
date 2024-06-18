from pydantic import BaseModel

class AdoptionModel(BaseModel):
    name: str
    phone: int
    pet_id: int
    street: str
    city: str
    zip:str

class UserModel(BaseModel):
    name:str
    phone:int
    address:str
    bio:str
    image: str

class PetModel(BaseModel):
    name: str
    age: int
    specie: str
    breed: str
    description: str
    image: str