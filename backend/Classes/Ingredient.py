class Ingredient:
    def __init__(self, data):
        self.name = data["name"]
        self.type = data["type"]
        self.mesure = data["mesure"]
        self.image = data["image"]
        self.description = data["description"]

    def get_by_name(name):
        """TODO: Renvoie l'ingrédient correspondant au nom"""
        return None