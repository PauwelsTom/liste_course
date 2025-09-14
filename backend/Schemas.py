from pydantic import BaseModel

class IngrBase(BaseModel):
    name: str
    type: str
    mesure: str
    description: str
    image: str

class IngrCreate(IngrBase):
    pass

class Ingr(IngrBase):
    id: int

    class Config:
        from_attributes = True
