from pydantic import BaseModel

class PetModel(BaseModel):
    id:int
    name:str
    age:int
    specie:str
    breed: str
    description:str
    image:str