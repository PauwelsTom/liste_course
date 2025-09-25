import Models.MaListe
import Schemas.MaListe
from sqlalchemy.orm import Session
from Crud.IngrRecette import delete_all_ingr_recette


def get_all_liste(db: Session, foyer: int):
    return db.query(Models.MaListe.MaListe).filter(Models.MaListe.MaListe.foyer == foyer).all()

def create_liste(db: Session, liste: Schemas.MaListe.ListeCreate, foyer: int):
    db_recette = db.query(Models.MaListe.MaListe).filter(Models.MaListe.MaListe.ref_ingr == liste.ref_ingr).first()
    if db_recette:
        db_recette.quantite += liste.quantite
        db.commit()
        db.refresh(db_recette)
        return db_recette
    
    db_liste = Models.MaListe.MaListe(
        foyer=foyer,
        ref_ingr=liste.ref_ingr,
        quantite=liste.quantite
    )
    db.add(db_liste)
    db.commit()
    db.refresh(db_liste)
    return db_liste

def update_liste(db: Session, liste: Schemas.MaListe.ListeUpdate):
    db_recette = db.query(Models.MaListe.MaListe).filter(Models.MaListe.MaListe.id == liste.id).first()

    if not db_recette:
        return None
    
    db_recette.ref_ingr = liste.ref_ingr
    db_recette.quantite = liste.quantite

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
    delete_all_ingr_recette(db=db, recette=liste.id)
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