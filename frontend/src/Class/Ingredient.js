export class IngredientClass {
    constructor(ingr) {
        this.attribute_list_form = ["name", "type", "mesure", "description", "image"];
        
        this.name = ingr.name;
        this.type = ingr.type;
        this.mesure = ingr.mesure;
        this.description = ingr.description;
        this.image = ingr.image;
    }
    
    to_json = () => {
        const res = {};
        this.attribute_list_form.map((attr, _) => {
            res[attr] = this[attr];
        })
        return res;
    }
}


export function json_to_ingrList(json) {
    if (!json || !Array.isArray(json)) {
        return [];
    }

    return json.map(ingr => {
        return new IngredientClass(ingr);
    });
}