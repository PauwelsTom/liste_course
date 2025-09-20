import Schemas.Recette
import Crud.Recette
from sqlalchemy.orm import Session
from fastapi import Depends


def all(app, get_db):
    @app.delete("/recette/", response_model=bool, tags=["Recette"])
    def delete_recette_route(recette: Schemas.Recette.RecetteDelete, db: Session = Depends(get_db)):
        return Crud.Recette.delete_recette(db=db, recette=recette)

    @app.put("/recette/", response_model=Schemas.Recette.Recette, tags=["Recette"])
    def update_recette_route(recette: Schemas.Recette.RecetteUpdate, db: Session = Depends(get_db)):
        return Crud.Recette.update_recette(db=db, recette=recette)

    @app.post("/recette/{foyer}", response_model=Schemas.Recette.Recette, tags=["Recette"])
    def create_recette_route(foyer: int, recette: Schemas.Recette.RecetteCreate, db: Session = Depends(get_db)):
        return Crud.Recette.create_recette(db=db, recette=recette, foyer=foyer)

    @app.get("/recette/{foyer}", response_model=list[Schemas.Recette.Recette], tags=["Recette"])
    def get_recette_route(foyer: int, db: Session = Depends(get_db)):
        return Crud.Recette.get_all_recette(db, foyer)
