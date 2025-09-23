# Schemas/IngrRecette.py
from pydantic import BaseModel

class IngrRecetteBase(BaseModel):
    ref_ingr: int
    quantite: int

class IngrRecetteCreate(IngrRecetteBase):
    pass

class IngrRecetteUpdate(BaseModel):
    id: int
    quantite: int

class IngrRecetteDelete(BaseModel):
    id: int

class IngrRecetteDetail(BaseModel):
    id: int
    name: str
    quantite: int

    class Config:
        from_attributes = True


class IngrRecette(IngrRecetteBase):
    ref_recette: int
    id: int

    class Config:
        from_attributes = True
