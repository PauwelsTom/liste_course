import Schemas.IngrRecette
import Crud.IngrRecette
from sqlalchemy.orm import Session
from fastapi import Depends


def all(app, get_db):
    @app.delete("/ingredients_recette/", response_model=bool, tags=["Ingrédient de recette"])
    def delete_ingredient_recette_route(ingredient: Schemas.IngrRecette.IngrRecetteDelete, db: Session = Depends(get_db)):
        return Crud.IngrRecette.delete_ingr_recette(db=db, ingr=ingredient)

    @app.put("/ingredients_recette/", response_model=Schemas.IngrRecette.IngrRecette, tags=["Ingrédient de recette"])
    def update_ingredient_recette_route(ingredient: Schemas.IngrRecette.IngrRecetteUpdate, db: Session = Depends(get_db)):
        return Crud.IngrRecette.update_ingr_recette(db=db, ingr=ingredient)

    @app.post("/ingredients_recette/{recette}", response_model=Schemas.IngrRecette.IngrRecette, tags=["Ingrédient de recette"])
    def create_ingredient_recette_route(recette: int, ingredient: Schemas.IngrRecette.IngrRecetteCreate, db: Session = Depends(get_db)):
        return Crud.IngrRecette.create_ingr_recette(db=db, ingr=ingredient, recette=recette)

    @app.get("/ingredients_recette/{recette}", response_model=list[Schemas.IngrRecette.IngrRecetteDetail], tags=["Ingrédient de recette"])
    def get_ingredients_from_recette(recette: int, db: Session = Depends(get_db)):
        return Crud.IngrRecette.get_from_recette(db, recette)
