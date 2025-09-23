export class IngrRecetteClass {
    constructor(rec) {
        this.attribute_list = ["id", "name", "quantite"];

        this.id = rec.id
        this.name = rec.name
        this.quantite = rec.quantite
    }

    to_json = () => {
        const res = {};
        this.attribute_list.map((attr, _) => {
            res[attr] = this[attr];
        })
        return res;
    }
}


export function json_to_ingrRecetteList(json) {
    if (!json || !Array.isArray(json) || json.length === 0) {
        return [];
    }

    return json.map(ingr => {
        return new IngrRecetteClass(ingr);
    });
}