import Schemas.MaListe
import Crud.MaListe
from sqlalchemy.orm import Session
from fastapi import Depends


def all(app, get_db):
    @app.delete("/ma_liste/", response_model=bool, tags=["Ma Liste"])
    def delete_liste_route(liste: Schemas.MaListe.ListeDelete, db: Session = Depends(get_db)):
        return Crud.MaListe.delete_liste(db=db, liste=liste)

    @app.put("/ma_liste/", response_model=Schemas.MaListe.Liste, tags=["Ma Liste"])
    def update_liste_route(liste: Schemas.MaListe.ListeUpdate, db: Session = Depends(get_db)):
        return Crud.MaListe.update_liste(db=db, liste=liste)

    @app.post("/ma_liste/{foyer}", response_model=Schemas.MaListe.Liste, tags=["Ma Liste"])
    def create_liste_route(foyer: int, liste: Schemas.MaListe.ListeCreate, db: Session = Depends(get_db)):
        return Crud.MaListe.create_liste(db=db, liste=liste, foyer=foyer)

    @app.get("/ma_liste/{foyer}", response_model=list[Schemas.MaListe.Liste], tags=["Ma Liste"])
    def get_liste_route(foyer: int, db: Session = Depends(get_db)):
        return Crud.MaListe.get_all_liste(db, foyer)
