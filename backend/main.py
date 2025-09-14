from fastapi import FastAPI
from typing import List
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

import Models, Schemas, Crud
from database import SessionLocal, engine, Base

# Crée les tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Shopping List API")

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

@app.post("/ingredients/", response_model=Schemas.Ingr)
def create_ingredient_route(ingredient: Schemas.IngrCreate, db: Session = Depends(get_db)):
    return Crud.create_ingredient(db=db, ingr=ingredient)

@app.get("/ingredients/", response_model=list[Schemas.Ingr])
def get_ingredients_route(db: Session = Depends(get_db)):
    return Crud.get_ingredients(db)

@app.delete("/ingredients/{item_id}")
def delete_ingredient_route(item_id: int, db: Session = Depends(get_db)):
    success = Crud.delete_ingredient(db, item_id)
    return {"deleted": success}
