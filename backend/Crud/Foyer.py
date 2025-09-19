from sqlalchemy.orm import Session
from fastapi import HTTPException

import Models.Foyer
import Schemas.Foyer
from Functions import *

# GET all foyers
def get_foyers(db: Session):
    return db.query(Models.Foyer.Foyer).all()

def create_foyer(db: Session, foyer: Schemas.Foyer.FoyerCreate):
    if foyer_already_exist(db=db, foy=foyer.name):
        raise HTTPException(
            status_code=400,
            detail=f"Le foyer '{foyer.name}' existe déjà dans votre foyer."
        )
    
    db_foyer = Models.Foyer.Foyer(
        name=foyer.name,
        description=foyer.description,
        image=None,
    )
    db.add(db_foyer)
    db.commit()
    db.refresh(db_foyer)
    return db_foyer

def update_foyer(db: Session, foyer: Schemas.Foyer.FoyerUpdate):
    db_foyer = db.query(Models.Foyer.Foyer).filter(Models.Foyer.Foyer.id == foyer.id).first()
    
    if not db_foyer:
        return None  # ou tu peux lever une exception HTTPException(status_code=404)

    db_foyer.name = foyer.name
    db_foyer.description = foyer.description
    db_foyer.image = None

    db.commit()
    db.refresh(db_foyer)
    return db_foyer


def delete_foyer(db: Session, foyer: Schemas.Foyer.FoyerDelete):
    foy = db.query(Models.Foyer.Foyer).filter(Models.Foyer.Foyer.id == foyer.id).first()
    ingrFoyer = db.query(Models.Ingredients.Ingr).filter(Models.Ingredients.Ingr.foyer == foyer.id).all()
    if foyer:
        for ingr in ingrFoyer:
            db.delete(ingr)
        db.delete(foy)
        db.commit()
        return True
    return False
