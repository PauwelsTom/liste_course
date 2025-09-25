from sqlalchemy import Column, Integer, String, Boolean
from database import Base

class MaListe(Base):
    __tablename__ = "MaListe"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    foyer = Column(Integer, index=True, nullable=False)
    ref_ingr = Column(Integer, nullable=False)
    quantite = Column(Integer, nullable=False)
    check = Column(Boolean, nullable=False, default=False)
