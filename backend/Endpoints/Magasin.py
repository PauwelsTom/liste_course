import Schemas.Magasin
import Crud.Magasin
from sqlalchemy.orm import Session
from fastapi import Depends


def all(app, get_db):
    @app.get("/magasin/{foyer}", response_model=list[Schemas.Magasin.Liste], tags=["Magasin"])
    def get_magasin_ingredients_route(foyer : int, db: Session = Depends(get_db)):
        return Crud.Magasin.get_magasin_ingredients(foyer, db=db)
