import Models.Recette
import Schemas.Recette
from sqlalchemy.orm import Session
from Crud.IngrRecette import delete_all_ingr_recette


def get_all_recette(db: Session, foyer: int):
    return (
        db.query(Models.Recette.Recette)
        .filter(Models.Recette.Recette.foyer == foyer)
        .order_by(Models.Recette.Recette.name.asc())
        .all()
    )


def create_recette(db: Session, recette: Schemas.Recette.RecetteCreate, foyer: int):
    db_recette = Models.Recette.Recette(
        name=recette.name,
        description=recette.description,
        foyer=foyer
    )
    db.add(db_recette)
    db.commit()
    db.refresh(db_recette)
    return db_recette

def update_recette(db: Session, recette: Schemas.Recette.RecetteUpdate):
    db_recette = db.query(Models.Recette.Recette).filter(Models.Recette.Recette.id == recette.id).first()

    if not db_recette:
        return None
    
    db_recette.name = recette.name
    db_recette.description = recette.description

    db.commit()
    db.refresh(db_recette)
    return db_recette

def delete_recette(db: Session, recette: Schemas.Recette.RecetteDelete):
    delete_all_ingr_recette(db=db, recette=recette.id)
    db_recette = db.query(Models.Recette.Recette).filter(Models.Recette.Recette.id == recette.id).first()
    if db_recette:
        db.delete(db_recette)
        db.commit()
        return True
    return False

def delete_all_recette(db: Session, foyer: int):
    db_recette = db.query(Models.Recette.Recette).filter(Models.Recette.Recette.foyer == foyer).all()
    if db_recette:
        for recette in db_recette:
            delete_all_ingr_recette(db=db, recette=recette.id)
            db.delete(recette)
        db.commit()
        return True
    return False