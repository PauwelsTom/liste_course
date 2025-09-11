import re

def get_price(text):
    """Récupère le prix à partir du texte d'un bouton"""

    # On cherche un nombre avec éventuellement des décimales suivi du signe €
    match = re.search(r"(\d+(?:[.,]\d+)?)\s*€", text)

    if match:
        prix = match.group(1).replace(",", ".")  # normaliser la virgule
        print("Prix:", prix)
        return float(prix)
    else:
        raise Exception("Aucun prix trouvé dans le texte")

def get_product(text):
    """Récupère le nom du produit à partir du texte d'un bouton"""
    return text.split("\n")[0]
