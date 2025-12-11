# Schemas/Magasin.py
from pydantic import BaseModel

class Liste(BaseModel):
    id: int
    check: bool
    ref_ingr: int
    name: str
    quantite: int
    mesure: str
    image: str
    type: str
    
    class Config:
        from_attributes = True
