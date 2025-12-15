export class RequeteClass {
    constructor() {
        this.host = "127.0.0.1";
        this.port = "8000";
        // this.url = "http://" + this.host + ":" + this.port;
        this.url = "/api"
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
        // console.log(await res.json());
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
        })
        const json = await res.json();
        this.create_item_ma_liste(foyer, json.id, false, debug);

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
        this.ma_liste_delete_foy_item(ingr.foyer, ingr.id, false, debug);
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
        })

        const json = await res.json();
        this.create_item_ma_liste(foyer, json.id, true, debug);
        return json;
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
        await this.ma_liste_delete_foy_item(rec.foyer, rec.id, true, debug);
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

    // ! MA LISTE

    get_items_ma_liste = async (recette, foyer, debug=false) => {
        if (debug) { console.log("MA LISTE GET ITEMS\n\nRecette: ", recette, "\n\nFoyer: ", foyer); }
        
        if (recette) {
            const res = await fetch(this.url + "/ma_liste/recette/" + foyer.toString());
            return res.json();
        } else {
            const res = await fetch(this.url + "/ma_liste/ingredient/" + foyer.toString());
            return res.json();
        }
    }

    create_item_ma_liste = async (foyer_id, item_id, recette, debug=false) => {
        if (debug) { console.log("MA LISTE CREATE ITEMS\n\nFoyer: ", foyer_id, "\n\nItem: ", item_id, "\n\nRecette: ", recette); }
        const res = await fetch(this.url + "/ma_liste/" + foyer_id.toString(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ref: item_id,
                recette: recette
            })
        });
        return res;
    }

    ma_liste_check = async (liste_id, check, debug=false) => {
        if (debug) { console.log("MA LISTE CHECK\n\nListe ID: ", liste_id, "\n\nCheck: ", check); }
        const res = await fetch(this.url + "/ma_liste/check/" + liste_id.toString(), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                check: check
            })
        });
        return res
    }

    ma_liste_add = async (liste_id, quantite, debug=false) => {
        if (debug) { console.log("MA LISTE ADD\n\nListe ID: ", liste_id, "\n\nQuantite: ", quantite); }
        const res = await fetch(this.url + "/ma_liste/add/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: liste_id,
                quantite: quantite
            })
        });
        return res;
    }

    ma_liste_set = async (liste_id, quantite, debug=false) => {
        if (debug) { console.log("MA LISTE SET\n\nListe ID: ", liste_id, "\n\nQuantite: ", quantite); }
        const res = await fetch(this.url + "/ma_liste/set/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: liste_id,
                quantite: quantite
            })
        });
        return res;
    }

    ma_liste_delete = async (liste_id, debug=false) => {
        if (debug) { console.log("MA LISTE DELETE\n\nListe ID: ", liste_id); }
        const res = await fetch(this.url + "/ma_liste/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: liste_id
            })
        });
        return res;
    }

    ma_liste_delete_foy_item = async (foyer_id, item, recette, debug=false) => {
        if (debug) { console.log("MA LISTE DELETE FOY ITEM\n\nFoyer: ", foyer_id, "\n\ningr_id: ", item, "\n\nRecette: ", recette); }
        const ma_liste = await this.get_items_ma_liste(recette, foyer_id, debug);
        console.log(ma_liste)

        for (let i = 0; i < ma_liste.length; i++) {
            if (ma_liste[i].ref === item && ma_liste[i].foyer === foyer_id) {
                this.ma_liste_delete(ma_liste[i].id, debug);
                return;
            }
        }
    }

    ma_liste_reset = async (foyer_id, debug=false) => {
        if (debug) { console.log("MA LISTE RESET\n\nFoyer: ", foyer_id); }
        const res = await fetch(this.url + "/ma_liste/reset/" + foyer_id.toString(), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return res;
    }

    // ! MAGASIN

    get_magasin_ingr = async (foyer, debug=false) => {
        if (debug) { console.log("GET MAGASIN INGR\n\nFoyer: ", foyer); }
        const res = await fetch(this.url + "/magasin/" + foyer.toString());
        return res.json();
    }
}