export class FoyerClass {
    constructor(foy) {
        this.attribute_list = ["id", "name", "description", "image"];
        
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
    if (!json || !Array.isArray(json)) {
        return [];
    }

    return json.map(foy => {
        return new FoyerClass(foy);
    });
}