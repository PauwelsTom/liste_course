export class RequeteClass {
    constructor() {
        this.host = "127.0.0.1";
        this.port = "8000";
        this.url = "http://" + this.host + ":" + this.port;
    }


    // ! INGREDIENT

    get_ingredients = async (foyer) => {
        const res = await fetch(this.url + "/ingredients/" + foyer.toString());
        return res.json();
    }

    get_ingredient_by_name = async (ingr_name) => {
        const res = await fetch(this.url + "/ingredient/" + ingr_name);
        return res.json();
    }

    create_ingredient = async (ingr, foyer) => {
        const res = await fetch(this.url + "/ingredients/" + foyer.toString(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: ingr.name,
                type: ingr.type,
                mesure: ingr.mesure,
                description: ingr.description,
                image: ingr.image
            })
        });
        return res;
    }

    update_ingredient = async (ingr) => {
        const res = await fetch(this.url + "/ingredients/" + ingr.id.toString(), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: ingr.id,
                name: ingr.name,
                type: ingr.type,
                mesure: ingr.mesure,
                description: ingr.description,
                image: ingr.image
            })
        });
        return res;
    }

    delete_ingredient = async (ingr) => {
        const res = await fetch(this.url + "/ingredients/" + ingr.id.toString(), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: ingr.id
            })
        });
        return res;
    }


    // ! FOYER

    get_foyers = async () => {
        const res = await fetch(this.url + "/foyer/");
        return res.json();
    }

    create_foyer = async (foy) => {
        const res = await fetch(this.url + "/foyer/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: foy.name,
                description: foy.description
            })
        });
        return res;
    }

    update_foyer = async (foy) => {
        const res = await fetch(this.url + "/foyer/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: foy.id,
                name: foy.name,
                description: foy.description
            })
        });
        return res;
    }

    delete_foyer = async (foy) => {
        const res = await fetch(this.url + "/foyer/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: foy.id
            })
        });
        return res;
    }


    // ! RECETTE

    get_recettes = async (foyer) => {
        const res = await fetch(this.url + "/recette/" + foyer.toString());
        return res.json();
    }

    create_recette = async (rec, foyer) => {
        const res = await fetch(this.url + "/recette/" + foyer.toString(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: rec.name,
                description: rec.description
            })
        });
        return res;
    }

    update_recette = async (rec) => {
        const res = await fetch(this.url + "/recette/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: rec.id,
                name: rec.name,
                description: rec.description
            })
        });
        return res;
    }

    delete_recette = async (rec) => {
        const res = await fetch(this.url + "/recette/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: rec.id
            })
        });
        return res;
    }


    // ! INGREDIENT RECETTE

    get_ingr_recette = async (recette) => {
        const res = await fetch(this.url + "/ingredients_recette/" + recette.toString());
        return res.json();
    }

    create_ingr_recette = async (recette, ingr_rec) => {
        const res = await fetch(this.url + "/ingredients_recette/" + recette.toString(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ref_ingr: ingr_rec.ref_ingr,
                quantite: ingr_rec.quantite
            })
        });
        return res;
    }

    create_ingr_recette_by_name = async (recette, ingr_name, quantite) => {
        const ingr = await this.get_ingredient_by_name(ingr_name);
        const res = await fetch(this.url + "/ingredients_recette/" + recette.toString(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ref_ingr: ingr.id,
                quantite: quantite
            })
        });
        return res;
    }

    update_ingr_recette = async (ingr_rec) => {
        const res = await fetch(this.url + "/ingredients_recette/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: ingr_rec.id,
                quantite: ingr_rec.quantite
            })
        });
        return res;
    }

    delete_ingr_recette = async (ingr_rec) => {
        const res = await fetch(this.url + "/ingredients_recette/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: ingr_rec.id
            })
        });
        return res;
    }


}