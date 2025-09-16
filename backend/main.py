from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

import Models, Schemas, Crud
from database import SessionLocal, engine, Base

# Crée les tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Shopping List API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ton front React
    allow_credentials=True,
    allow_methods=["*"],  # autorise toutes les méthodes HTTP
    allow_headers=["*"],  # autorise tous les headers
)

# Dépendance pour la DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Bienvenue dans l'API liste de courses 🚀"}

@app.put("/ingredients/{foyer}", response_model=Schemas.Ingr)
def update_ingredient_route(foyer: int, ingrName: str, db: Session = Depends(get_db)):
    return Crud.delete_ingredient(db=db, ingrName=ingrName, foyer=foyer)

@app.put("/ingredients/{foyer}", response_model=Schemas.Ingr)
def update_ingredient_route(foyer: int, ingredient: Schemas.IngrCreate, db: Session = Depends(get_db)):
    return Crud.update_ingr(db=db, ingr=ingredient, foyer=foyer)

@app.post("/ingredients/{foyer}", response_model=Schemas.Ingr)
def create_ingredient_route(foyer: int, ingredient: Schemas.IngrCreate, db: Session = Depends(get_db)):
    return Crud.create_ingredient(db=db, ingr=ingredient, foyer=foyer)

@app.get("/ingredients/{foyer}", response_model=list[Schemas.Ingr])
def get_ingredients_route(foyer: int, db: Session = Depends(get_db)):
    return Crud.get_ingredients(db, foyer)

@app.get("/ingredient/{ingr_name}", response_model=Schemas.Ingr)
def get_ingredient_by_name_route(ingr_name: str, db: Session = Depends(get_db)):
    return Crud.get_ingredient_by_name(db, ingr_name)

@app.delete("/ingredients/{item_id}")
def delete_ingredient_route(item_id: int, db: Session = Depends(get_db)):
    success = Crud.delete_ingredient(db, item_id)
    return {"deleted": success}
