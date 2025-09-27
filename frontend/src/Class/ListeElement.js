class ListeElementClass {
    constructor(elem) {
        this.attribute_list = ["id", "name", "quantite", "mesure", "check"];

        this.id = elem.id
        this.name = elem.name
        this.quantite = elem.quantite
        this.mesure = elem.mesure
        this.check = elem.check
    }
}


export function json_to_listeElementList(json) {
    if (!json || !Array.isArray(json) || json.length === 0) {
        return [];
    }

    return json.map(elem => {
        return new ListeElementClass(elem);
    });

}