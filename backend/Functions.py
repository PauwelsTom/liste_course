from sqlalchemy.orm import Session
import Models

def ingr_already_exist(db: Session,ingrName: str, foyer: int):
    """Renvoie true si l'ingr existe deja dans le foyer"""
    count = db.query(Models.Ingr).filter(
        Models.Ingr.name == ingrName,
        Models.Ingr.foyer == foyer
    ).count()
    
    return count > 0