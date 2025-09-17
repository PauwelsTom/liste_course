from pydantic import BaseModel

class FoyerBase(BaseModel):
    name: str
    description: str
    image: str

class FoyerCreate(FoyerBase):
    pass

class FoyerUpdate(FoyerBase):
    id: int

class FoyerDelete(FoyerBase):
    id: int

class Foyer(FoyerBase):
    id: int

    class Config:
        from_attributes = True
