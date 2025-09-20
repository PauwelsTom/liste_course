# Schemas/Recette.py
from pydantic import BaseModel

class RecetteBase(BaseModel):
    name: str
    description: str

class RecetteCreate(RecetteBase):
    pass

class RecetteUpdate(RecetteBase):
    id: int

class RecetteDelete(BaseModel):
    id: int

class Recette(RecetteBase):
    id: int
    foyer: int

    class Config:
        from_attributes = True
