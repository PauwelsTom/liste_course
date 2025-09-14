from sqlalchemy import Column, Integer, String
from database import Base

class Ingr(Base):
    __tablename__ = "Ingredients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    type = Column(String, nullable=False)
    mesure = Column(String, nullable=True)
    description = Column(String, nullable=True)
    image = Column(String, nullable=True)
