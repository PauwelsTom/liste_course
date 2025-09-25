# Schemas/Recette.py
from pydantic import BaseModel

class ListeBase(BaseModel):
    id: int
    quantite: int

class ListeCreate(BaseModel):
    ref: int
    recette: bool

class ListeUpdate(ListeBase):
    pass

class ListeDelete(BaseModel):
    id: int

class ListeCheck(BaseModel):
    check: bool

class Liste(ListeBase):
    check: bool
    ref: int
    foyer: int
    recette: bool

    class Config:
        from_attributes = True
