from sqlalchemy.orm import Session
from fastapi import HTTPException

import Models, Schemas
from Functions import *

def get_ingredients(db: Session, foyer: int):
    return db.query(Models.Ingr).filter(Models.Ingr.foyer == foyer).all()

# TODO: fix celle là
def get_ingredient_by_name(db: Session, ingr_name: str):
    print(f"Ingr requested: {ingr_name}")
    return db.query(Models.Ingr).filter(Models.Ingr.name == ingr_name).first()

def create_ingredient(db: Session, ingr: Schemas.IngrCreate, foyer: int):
    if ingr_already_exist(db=db, ingrName=ingr.name, foyer=foyer):
        raise HTTPException(
            status_code=400,
            detail=f"L'ingrédient '{ingr.name}' existe déjà dans votre foyer."
        )
    
    db_ingr = Models.Ingr(
        name=ingr.name,
        type=ingr.type,
        mesure=ingr.mesure,
        description=ingr.description,
        image=ingr.image,
        foyer=foyer
    )
    db.add(db_ingr)
    db.commit()
    db.refresh(db_ingr)
    return db_ingr

def update_ingr(db: Session, ingr: Schemas.IngrCreate, foyer: int):
    db_ingr = db.query(Models.Ingr).filter(Models.Ingr.name == ingr.name, Models.Ingr.foyer == foyer).first()
    
    if not db_ingr:
        return None  # ou tu peux lever une exception HTTPException(status_code=404)

    db_ingr.type = ingr.type
    db_ingr.mesure = ingr.mesure
    db_ingr.description = ingr.description
    db_ingr.image = ingr.image
    db_ingr.foyer = foyer  # utile si le foyer peut changer

    db.commit()
    db.refresh(db_ingr)
    return db_ingr


def delete_ingredient(db: Session, ingr: Schemas.IngrCreate, foyer: int):
    ingr = db.query(Models.Ingr).filter(Models.Ingr.name == ingr.name, Models.Ingr.foyer == foyer).first()
    if ingr:
        db.delete(ingr)
        db.commit()
        return True
    return False
