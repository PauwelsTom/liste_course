from sqlalchemy import Column, Integer, ForeignKey, String
from database import Base

class Recette(Base):
    __tablename__ = "Recette"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    description = Column(String, nullable=True)
    foyer = Column(Integer, nullable=True)