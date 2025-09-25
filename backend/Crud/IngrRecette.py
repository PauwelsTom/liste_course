import Models.Ingredients
import Models.IngrRecette
import Schemas.IngrRecette
from sqlalchemy.orm import Session


# TODO: Create ingr, modify ingr, delete ingr, get ingr from recette

def get_from_recette(db: Session, recette: int):
    results = (
        db.query(
            Models.IngrRecette.IngrRecette.id,
            Models.Ingredients.Ingr.name,
            Models.IngrRecette.IngrRecette.quantite,
            Models.Ingredients.Ingr.mesure
        )
        .join(Models.Ingredients.Ingr, Models.IngrRecette.IngrRecette.ref_ingr == Models.Ingredients.Ingr.id)
        .filter(Models.IngrRecette.IngrRecette.ref_recette == recette)
        .all()
    )
    return results

def create_ingr_recette(db: Session, ingr: Schemas.IngrRecette.IngrRecetteCreate, recette: int):
    db_ingr = Models.IngrRecette.IngrRecette(
        ref_ingr=ingr.ref_ingr,
        quantite=ingr.quantite,
        ref_recette=recette
    )
    db.add(db_ingr)
    db.commit()
    db.refresh(db_ingr)
    return db_ingr

def update_ingr_recette(db: Session, ingr: Schemas.IngrRecette.IngrRecetteUpdate):
    db_ingr = db.query(Models.IngrRecette.IngrRecette).filter(Models.IngrRecette.IngrRecette.id == ingr.id).first()

    if not db_ingr:
        return None
    
    db_ingr.quantite = ingr.quantite

    db.commit()
    db.refresh(db_ingr)
    return db_ingr

def delete_ingr_recette(db: Session, ingr: Schemas.IngrRecette.IngrRecetteDelete):
    db_ingr = db.query(Models.IngrRecette.IngrRecette).filter(Models.IngrRecette.IngrRecette.id == ingr.id).first()
    if db_ingr:
        db.delete(db_ingr)
        db.commit()
        return True
    return False

def delete_all_ingr_recette(db: Session, recette: int):
    db_ingr = db.query(Models.IngrRecette.IngrRecette).filter(Models.IngrRecette.IngrRecette.ref_recette == recette).all()
    if db_ingr:
        for ingr in db_ingr:
            db.delete(ingr)
        db.commit()
        return True
    return False

def get_ingredient_count_recette(db: Session, ingr_id: int):
    count = db.query(Models.IngrRecette.IngrRecette).filter(Models.IngrRecette.IngrRecette.ref_ingr == ingr_id).count()
    return count