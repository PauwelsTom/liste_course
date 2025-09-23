export class RecetteClass {
    constructor(rec) {
        this.attribute_list = ["id", "name", "description", "foyer"];
        this.attribute_list_form = ["name", "description"];

        this.id = rec.id
        this.name = rec.name
        this.description = rec.description
        this.foyer = rec.foyer
    }

    to_json = () => {
        const res = {};
        this.attribute_list.map((attr, _) => {
            res[attr] = this[attr];
        })
        return res;
    }
}


export function json_to_recetteList(json) {
    if (!json || !Array.isArray(json) || json.length === 0) {
        return [];
    }

    return json.map(rec => {
        return new RecetteClass(rec);
    });
}