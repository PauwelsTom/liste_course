from sqlalchemy import Column, Integer, String
from database import Base

class Foyer(Base):
    __tablename__ = "Foyer"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, index=True, unique=True, nullable=False)
    description = Column(String, nullable=True)
    image = Column(String, nullable=True)
