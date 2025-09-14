export class IngredientClass {
    constructor(name) {
        this.name = name;
    }

    build_ingr = (ingr) => {
        this.get_attribute_list().map((attr, _) => {
            this[attr] = ingr[attr];
        });
    }

    // TODO: Fais une requête vers le backend pour récupérer le descriptif
    get_full_ingr = (foyer=-1) => {
        this.description = "TODO: description";
        this.type = "Viande"
        this.mesure = "g";
        this.image = "";

        this.used_in = "";
        this.afficher = true;
        this.quantite = 0;
    }

    get_attribute_list = () => {
        return ["name", "type", "mesure", "description", "image"];
    }
}