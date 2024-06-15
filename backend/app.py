from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.pet import Pets
# from models import PetModel
app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins = ["*"], allow_credentials = True , allow_methods = ["*"], allow_headers = ['*'])




@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get('/pets')
def pets():
    pets = Pets.find_all()

    return pets

@app.get("/catalogue")
def get_catalogue():
    return[{"name":"inferno"}]

# @app.get("/pets")
# def save_catalogue(data: PetModel):
#     Pet = Pets(data) 