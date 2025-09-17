import Schemas.Foyer
import Crud.Foyer
from sqlalchemy.orm import Session
from fastapi import Depends


def all(app, get_db):
    @app.get("/foyer/", response_model=list[Schemas.Foyer.Foyer])
    def get_foyers(db: Session = Depends(get_db)):
        return Crud.Foyer.get_foyers(db=db)

    @app.post("/foyer/", response_model=Schemas.Foyer.Foyer)
    def create_foyer(foyer: Schemas.Foyer.FoyerCreate, db: Session = Depends(get_db)):
        return Crud.Foyer.create_foyer(db=db, foyer=foyer)
    
    @app.put("/foyer/", response_model=Schemas.Foyer.Foyer)
    def update_foyer(foyer: Schemas.Foyer.FoyerUpdate, db: Session = Depends(get_db)):
        return Crud.Foyer.update_foyer(db=db, foyer=foyer)
    
    @app.delete("/foyer/", response_model=bool)
    def delete_foyer(foyer: Schemas.Foyer.FoyerDelete, db: Session = Depends(get_db)):
        return Crud.Foyer.delete_foyer(db=db, foyer=foyer)
    
    pass