import Crud.MaListe
import Schemas.Magasin
import Models.IngrRecette
import Models.Ingredients
from sqlalchemy.orm import Session
from Crud.IngrRecette import get_from_recette


def get_magasin_ingredients(foyer: int, db: Session):
    results = []

    # 1. Ingrédients directs
    ingredients = Crud.MaListe.get_all_liste_ingredient(db, foyer)
    print(ingredients)
    for ingr in ingredients:
        results.append(Schemas.Magasin.Liste(
            id=ingr["id"],
            check=ingr["check"],
            ref_ingr=ingr["ref"],
            name=ingr["name"],
            quantite=ingr["quantite"],
            mesure=ingr["mesure"],
            image=ingr["image"],
            type=ingr["type"]
        ))

    # 2. Recettes -> ingrédients
    recettes = Crud.MaListe.get_all_liste_recette(db, foyer)
    for recette in recettes:
        if recette["quantite"] > 0:
            ingr_recettes = get_from_recette(db, recette["ref"])

            for ingr_row in ingr_recettes:
                print(ingr_row)
                for i in range(len(results)):
                    if results[i].name == ingr_row[1]:
                        quantite_finale = ingr_row[2] * recette["quantite"]
                        results[i].quantite += quantite_finale
                        break

    # 3. On retire tous les ingredients qui ont 0
    results = [ingr for ingr in results if ingr.quantite > 0]

    return results