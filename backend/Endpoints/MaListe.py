import Schemas.MaListe
import Crud.MaListe
from sqlalchemy.orm import Session
from fastapi import Depends


def all(app, get_db):
    @app.delete("/ma_liste/", response_model=bool, tags=["Ma Liste"])
    def delete_liste_route(liste: Schemas.MaListe.ListeDelete, db: Session = Depends(get_db)):
        return Crud.MaListe.delete_liste(db=db, liste=liste)

    @app.put("/ma_liste/set/", response_model=Schemas.MaListe.Liste, tags=["Ma Liste"])
    def update_liste_set_route(liste: Schemas.MaListe.ListeUpdate, db: Session = Depends(get_db)):
        return Crud.MaListe.liste_set_quantite(db=db, liste=liste)
    
    @app.put("/ma_liste/add/", response_model=Schemas.MaListe.Liste, tags=["Ma Liste"])
    def update_liste_add_route(liste: Schemas.MaListe.ListeUpdate, db: Session = Depends(get_db)):
        return Crud.MaListe.liste_add_quantite(db=db, liste=liste)
    
    @app.put("/ma_liste/check/{liste_id}", response_model=Schemas.MaListe.Liste, tags=["Ma Liste"])
    def update_liste_check_route(liste_id: int, liste: Schemas.MaListe.ListeCheck, db: Session = Depends(get_db)):
        return Crud.MaListe.check_liste(db=db, liste_id=liste_id, liste=liste)

    @app.post("/ma_liste/{foyer}", response_model=Schemas.MaListe.Liste, tags=["Ma Liste"])
    def create_liste_element(foyer: int, liste: Schemas.MaListe.ListeCreate, db: Session = Depends(get_db)):
        return Crud.MaListe.create_liste(db, liste, foyer)

    @app.get("/ma_liste/{foyer}", response_model=list[Schemas.MaListe.Liste], tags=["Ma Liste"])
    def get_liste_route(foyer: int, db: Session = Depends(get_db)):
        return Crud.MaListe.get_all_liste(db, foyer)

    @app.get("/ma_liste/recette/{foyer}", response_model=list[Schemas.MaListe.Liste], tags=["Ma Liste"])
    def get_liste_route(foyer: int, db: Session = Depends(get_db)):
        return Crud.MaListe.get_all_liste_recette(db, foyer)

    @app.get("/ma_liste/ingredient/{foyer}", response_model=list[Schemas.MaListe.Liste], tags=["Ma Liste"])
    def get_liste_route(foyer: int, db: Session = Depends(get_db)):
        return Crud.MaListe.get_all_liste_ingredient(db, foyer)
