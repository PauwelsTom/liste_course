import Models.MaListe
import Schemas.MaListe
from sqlalchemy.orm import Session
from Crud.IngrRecette import delete_all_ingr_recette


def get_all_liste(db: Session, foyer: int):
    return db.query(Models.MaListe.MaListe).filter(Models.MaListe.MaListe.foyer == foyer).all()

def get_all_liste_ingredient(db: Session, foyer: int):
    rows = (
        db.query(Models.MaListe.MaListe, Models.Ingredients.Ingr.name.label("name"))
        .join(Models.Ingredients.Ingr, Models.MaListe.MaListe.ref == Models.Ingredients.Ingr.id)
        .filter(Models.MaListe.MaListe.foyer == foyer, Models.MaListe.MaListe.recette == False)
        .order_by(Models.Ingredients.Ingr.type.asc(), Models.Ingredients.Ingr.name.asc())   # tri ascendant sur name
        .all()
    )

    return [
        {
            "id": maliste.id,
            "quantite": maliste.quantite,
            "check": maliste.check,
            "ref": maliste.ref,
            "foyer": maliste.foyer,
            "recette": maliste.recette,
            "name": name,
        }
        for maliste, name in rows
    ]

def get_all_liste_recette(db: Session, foyer: int):
    rows = (
        db.query(Models.MaListe.MaListe, Models.Recette.Recette.name.label("name"))
        .join(Models.Recette.Recette, Models.MaListe.MaListe.ref == Models.Recette.Recette.id)
        .filter(Models.MaListe.MaListe.foyer == foyer, Models.MaListe.MaListe.recette == True)
        .order_by(Models.Recette.Recette.name.asc())   # tri ascendant sur namec
        .all()
    )

    return [
        {
            "id": maliste.id,
            "quantite": maliste.quantite,
            "check": maliste.check,
            "ref": maliste.ref,
            "foyer": maliste.foyer,
            "recette": maliste.recette,
            "name": name,
        }
        for maliste, name in rows
    ]

def liste_set_quantite(db: Session, liste: Schemas.MaListe.ListeUpdate):
    db_recette = db.query(Models.MaListe.MaListe).filter(Models.MaListe.MaListe.id == liste.id).first()
 
    if not db_recette:
        return None
    
    db_recette.quantite = liste.quantite

    db.commit()
    db.refresh(db_recette)
    return db_recette

def create_liste(db: Session, liste: Schemas.MaListe.ListeCreate, foyer: int):
    db_recette = db.query(Models.MaListe.MaListe).filter(Models.MaListe.MaListe.ref == liste.ref, Models.MaListe.MaListe.recette == liste.recette).first()
    if db_recette:
        return None
    
    db_liste = Models.MaListe.MaListe(
        foyer=foyer,
        ref=liste.ref,
        recette=liste.recette
    )
    db.add(db_liste)
    db.commit()
    db.refresh(db_liste)
    return db_liste

def liste_add_quantite(db: Session, liste: Schemas.MaListe.ListeUpdate):
    db_recette = db.query(Models.MaListe.MaListe).filter(Models.MaListe.MaListe.id == liste.id).first()

    if not db_recette:
        return None
    
    db_recette.quantite += liste.quantite

    db.commit()
    db.refresh(db_recette)
    return db_recette

def check_liste(db: Session, liste_id: int, liste: Schemas.MaListe.ListeCheck):
    db_recette = db.query(Models.MaListe.MaListe).filter(Models.MaListe.MaListe.id == liste_id).first()

    if not db_recette:
        return None
    
    db_recette.check = liste.check

    db.commit()
    db.refresh(db_recette)
    return db_recette

def delete_liste(db: Session, liste: Schemas.MaListe.ListeDelete):
    # delete_all_ingr_recette(db=db, recette=liste.id)
    db_recette = db.query(Models.MaListe.MaListe).filter(Models.MaListe.MaListe.id == liste.id).first()
    if db_recette:
        db.delete(db_recette)
        db.commit()
        return True
    return False

def clear_liste(db: Session, foyer: int):
    db_recette = db.query(Models.Recette.Recette).filter(Models.Recette.Recette.foyer == foyer).all()
    if db_recette:
        for recette in db_recette:
            delete_all_ingr_recette(db=db, recette=recette.id)
            db.delete(recette)
        db.commit()
        return True
    return False