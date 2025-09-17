from sqlalchemy.orm import Session
import Models.Ingredients
import Models.Foyer

def ingr_already_exist(db: Session,ingrName: str, foyer: int):
    """Renvoie true si l'ingr existe deja dans le foyer"""
    count = db.query(Models.Ingredients.Ingr).filter(
        Models.Ingredients.Ingr.name == ingrName,
        Models.Ingredients.Ingr.foyer == foyer
    ).count()
    
    return count > 0

def foyer_already_exist(db: Session, foy: str):
    """Renvoie true si l'ingr existe deja dans le foyer"""
    count = db.query(Models.Foyer.Foyer).filter(
        Models.Foyer.Foyer.name == foy
    ).count()
    
    return count > 0