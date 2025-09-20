import Schemas.Ingredients
import Crud.Ingredients
from sqlalchemy.orm import Session
from fastapi import Depends


def all(app, get_db):
    @app.delete("/ingredients/{foyer}", response_model=bool, tags=["Ingredients"])
    def delete_ingredient_route(foyer: int, ingredient: Schemas.Ingredients.IngrCreate, db: Session = Depends(get_db)):
        return Crud.Ingredients.delete_ingredient(db=db, ingr=ingredient, foyer=foyer)

    @app.put("/ingredients/{foyer}", response_model=Schemas.Ingredients.Ingr, tags=["Ingredients"])
    def update_ingredient_route(foyer: int, ingredient: Schemas.Ingredients.IngrCreate, db: Session = Depends(get_db)):
        return Crud.Ingredients.update_ingr(db=db, ingr=ingredient, foyer=foyer)

    @app.post("/ingredients/{foyer}", response_model=Schemas.Ingredients.Ingr, tags=["Ingredients"])
    def create_ingredient_route(foyer: int, ingredient: Schemas.Ingredients.IngrCreate, db: Session = Depends(get_db)):
        return Crud.Ingredients.create_ingredient(db=db, ingr=ingredient, foyer=foyer)

    @app.get("/ingredients/{foyer}", response_model=list[Schemas.Ingredients.Ingr], tags=["Ingredients"])
    def get_ingredients_route(foyer: int, db: Session = Depends(get_db)):
        return Crud.Ingredients.get_ingredients(db, foyer)

    @app.get("/ingredient/{ingr_name}", response_model=Schemas.Ingredients.Ingr, tags=["Ingredients"])
    def get_ingredient_by_name_route(ingr_name: str, db: Session = Depends(get_db)):
        return Crud.Ingredients.get_ingredient_by_name(db, ingr_name)
