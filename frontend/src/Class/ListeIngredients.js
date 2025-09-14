export class ListeIngredients {
    constructor(l=[]) {
        this.list = l;
    }

    add = (ingr) => {
        for (const i = 0; i < this.list.length; i++) {
            if (this.list[i].name === ingr.name) {
                this.list[i].quantite += ingr.quantite;
                return;
            }
        }
        this.list.push(ingr);
    }

    // TODO
    suppr = (ingr_name) => {
        for (const i = 0; i < this.list.length; i++) {
            if (this.list[i].name === ingr_name) {
                // Supprimer l'ingredient
                return;
            }
        }
    }

    // Renvoie une string avec le nom des ingrédients
    get_ingredients_list = () => {
        let res = "";
        for (let i = 0; i < this.list.length; i++) {
            res += this.list[i].name + ((i < this.list.length - 1)? ", ": "");
        }
        return res;
    }

    get_ingredients_list = (index) => {
        return this.list[index];
    }
}