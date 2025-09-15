from sqlalchemy.orm import Session
import Models, Schemas

def get_ingredients(db: Session, foyer: int):
    return db.query(Models.Ingr).filter(Models.Ingr.foyer == foyer).all()

# TODO: fix celle là
def get_ingredient_by_name(db: Session, ingr_name: str):
    print(f"Ingr requested: {ingr_name}")
    return db.query(Models.Ingr).filter(Models.Ingr.name == ingr_name).first()

def create_ingredient(db: Session, ingr: Schemas.IngrCreate, foyer: int):
    db_ingr = Models.Ingr(
        name=ingr.name,
        type=ingr.type,
        mesure=ingr.mesure,
        description=ingr.description,
        image=ingr.image,
        foyer=foyer
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
