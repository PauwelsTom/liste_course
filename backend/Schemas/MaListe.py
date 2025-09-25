# Schemas/Recette.py
from pydantic import BaseModel

class ListeBase(BaseModel):
    ref_ingr: int
    quantite: int

class ListeCreate(ListeBase):
    pass

class ListeUpdate(ListeBase):
    id: int

class ListeDelete(BaseModel):
    id: int

class ListeCheck(BaseModel):
    check: bool

class Liste(ListeBase):
    id: int
    check: bool

    class Config:
        from_attributes = True
