export class RequeteClass {
    constructor() {
        this.host = "localhost";
        this.port = "8000";
        this.url = "http://" + this.host + ":" + this.port;
    }


    // ! INGREDIENT

    get_ingredients = async (foyer, debug=false) => {
        if (debug) { console.log("GET INGREDIENTS\n\nFoyer: ", foyer); }
        const res = await fetch(this.url + "/ingredients/" + foyer.toString());
        return res.json();
    }

    get_ingredient_by_name = async (ingr_name, debug=false) => {
        if (debug) { console.log("GET INGREDIENT BY NAME\n\nIngrédient: ",ingr_name); }
        const res = await fetch(this.url + "/ingredient/" + ingr_name);
        return res.json();
    }

    create_ingredient = async (ingr, foyer, debug=false) => {
        if (debug) { console.log("[CREATE INGREDIENT]", "\n\nIngrédient:", ingr, "\n\nFoyer:", foyer);}
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

    update_ingredient = async (ingr, foyer, debug=false) => {
        if (debug) { console.log("UPDATE INGREDIENT\n\nIngrédient: ",ingr, "\n\nFoyer: ", foyer); }
        const res = await fetch(this.url + "/ingredients/", {
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

    delete_ingredient = async (ingr, debug=false) => {
        if (debug) { console.log("DELETE INGREIDENT\n\nIngrédient: ",ingr); }
        const res = await fetch(this.url + "/ingredients/", {
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

    create_foyer = async (foy, debug=false) => {
        if (debug) { console.log("CREATE FOYER\n\nFoyer: ", foy); }
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

    update_foyer = async (foy, debug=false) => {
        if (debug) { console.log("UDATE FOYER\n\nFoyer: ", foy); }
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

    delete_foyer = async (foy, debug=false) => {
        if (debug) { console.log("DELETE FOYER\n\nFoyer: ", foy); }
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

    get_recettes = async (foyer, debug=false) => {
        if (debug) { console.log("GET RECETTE\n\nFoyer: ", foyer); }
        const res = await fetch(this.url + "/recette/" + foyer.toString());
        return res.json();
    }

    create_recette = async (rec, foyer, debug=false) => {
        if (debug) { console.log("CREATE RECETTE\n\nFoyer: ", foyer, "\n\nRecette: ", rec); }
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
        return res.json();
    }

    update_recette = async (rec, debug=false) => {
        if (debug) { console.log("UPDATE RECETTE\n\nRecette: ", rec); }
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

    delete_recette = async (rec, debug=false) => {
        if (debug) { console.log("DELETE RECETTE\n\nRecette: ", rec); }
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

    get_ingr_recette = async (recette, debug=false) => {
        if (debug) { console.log("GET INGREDIENT RECETTE\n\nRecette: ", recette); }
        const res = await fetch(this.url + "/ingredients_recette/" + recette.toString());
        return res.json();
    }

    create_ingr_recette = async (recette, ingr_rec, debug=false) => {
        if (debug) { console.log("CREATE INGREDIENT RECETTE\n\nRecette: ", recette, "\n\nIngrédient recette: ", ingr_rec); }
        const res = await fetch(this.url + "/ingredients_recette/" + recette.toString(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ref_ingr: ingr_rec.id,
                quantite: ingr_rec.quantite
            })
        });
        return res;
    }

    create_ingr_recette_by_name = async (recette_id, ingr_name, quantite, debug=false) => {
        if (debug) { console.log("CREATE INGREDIENT RECETTE BY NAME\n\nRecette: ", recette_id, "\n\nIngrédient name: ", ingr_name, "\n\nQuantité: ", quantite); }
        const ingr = await this.get_ingredient_by_name(ingr_name, debug);
        const res = await fetch(this.url + "/ingredients_recette/" + recette_id.toString(), {
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

    update_ingr_recette = async (ingr_rec, debug=false) => {
        if (debug) { console.log("UPDATE INGREDIENT RECETTE\n\nIngrédient recette: ", ingr_rec); }
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

    delete_ingr_recette = async (ingr_rec, debug=false) => {
        if (debug) { console.log("DELETE INGREDIENT RECETTE\n\nIngrédient recette: ", ingr_rec); }
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

    get_ingredient_recette_count = async (ingr_id, debug=false) => {
        if (debug) { console.log("GET INGREDIENT RECETTE COUNT\n\nID de l'ingrédient: ", ingr_id); }
        const res = await fetch(this.url + "/ingredients_recette_count/" + ingr_id.toString());
        return res.json();
    }

}