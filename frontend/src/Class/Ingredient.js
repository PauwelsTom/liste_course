export class IngredientClass {
    constructor(ingr) {
        this.get_attribute_list().map((attr, _) => {
            this[attr] = ingr[attr];
        });
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

    to_json = () => {
        const res = {};
        this.get_attribute_list().map((attr, _) => {
            res[attr] = this[attr];
        })
        return res;
    }
}