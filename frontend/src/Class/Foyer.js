export class FoyerClass {
    constructor(foy) {
        this.attribute_list = ["id", "name", "description", "image"];
        this.attribute_list_form = ["name", "description"];

        this.id = foy.id
        this.name = foy.name
        this.description = foy.description
        this.image = foy.image
    }

    to_json = () => {
        const res = {};
        this.attribute_list.map((attr, _) => {
            res[attr] = this[attr];
        })
        return res;
    }
}


export function json_to_foyerList(json) {
    if (!json || !Array.isArray(json) || json.length === 0) {
        return [];
    }

    return json.map(foy => {
        return new FoyerClass(foy);
    });
}