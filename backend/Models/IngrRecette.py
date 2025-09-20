from sqlalchemy import Column, Integer, ForeignKey
from database import Base

class IngrRecette(Base):
    __tablename__ = "IngredientRecette"

    id = Column(Integer, primary_key=True, index=True)
    ref_ingr = Column(Integer, ForeignKey("Ingredients.id"), index=True, nullable=False)
    quantite = Column(Integer, index=True)
    ref_recette = Column(Integer, ForeignKey("Recette.id"), index=True, nullable=False)
