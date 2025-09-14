from sqlalchemy.orm import Session
import Models, Schemas

def get_ingredients(db: Session):
    return db.query(Models.Ingr).all()

def create_ingredient(db: Session, ingr: Schemas.IngrCreate):
    db_ingr = Models.Ingr(
        name=ingr.name,
        type=ingr.type,
        mesure=ingr.mesure,
        description=ingr.description,
        image=ingr.image
    )
    db.add(db_ingr)
    db.commit()
    db.refresh(db_ingr)
    return db_ingr


def delete_ingredient(db: Session, item_id: int):
    ingr = db.query(Models.Ingr).filter(Models.Ingr.id == item_id).first()
    if ingr:
        db.delete(ingr)
        db.commit()
        return True
    return False
