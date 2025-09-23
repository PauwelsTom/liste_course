import { BoutonRetour } from "../Menu_principal/BoutonRetour";
import { Ingredient } from "./Ingredient";
import { IngredientModif } from "./IngredientModif";
import "./PageIngredients.css"
import "../Couleurs.css"
import { Component } from "react";
import { IngredientClass, json_to_ingrList } from "../Class/Ingredient";

export class PageIngredients extends Component {
    constructor(props) {
        super();
        this.state = {
            ingrSelected: null,
            ingrList: []
        }

        const foyer = parseInt(localStorage.getItem("foyer"));
        this.foyer = isNaN(foyer)? null: foyer;
    }

    get_all_ingr = () => {
        fetch("http://127.0.0.1:8000/ingredients/" + this.foyer.toString())
            .then(response => {
                if (!response.ok)
                    throw new Error("Problème lors de la connexion à l'API");

                return response.json();
            })
            .then(json => {
                this.setState({ingrList: json_to_ingrList(json)});
                console.log(json);
            })
            .catch(e => console.error("Erreur lors de la requête:", e))
    }

    selectIngr = (ingr) => {
        this.setState({ingrSelected: ingr});
    }

    saveChange = (save, newIngr=true, ingr=null) => {
        if (save) {
            let typeRequete = "";
            if (newIngr) {
                typeRequete = "POST";
            } else {
                typeRequete = "PUT";
            }
            fetch("http://127.0.0.1:8000/ingredients/" + this.foyer.toString(), {
                method: typeRequete,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ingr)
            })
                .then(response => {
                    if (!response.ok)
                        throw new Error("Problème lors de la connexion à l'API");

                    return response.json();
                })
                .then(json => {
                    this.setState({ingrList: json_to_ingrList(json)});
                })
                .catch(e => alert("Erreur lors de la requête:" + e))
                .finally(() => {
                    this.setState({ingrSelected: null});
                    this.get_all_ingr();
                })
        } else {
            this.setState({ingrSelected: null});
            this.get_all_ingr();
        }
    }

    supprIngr = (ingr) => {
        if (!window.confirm("Voulez vous supprimer l'ingrédient " + ingr.name + "?")) {
            return;
        }

        fetch("http://127.0.0.1:8000/ingredients/" + this.foyer.toString(), {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ingr)
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("Problème lors de la connexion à l'API");

                return response.json();
            })
            .then(json => {
                this.setState({ingrList: json_to_ingrList(json)});
            })
            .catch(e => alert("Erreur lors de la requête:" + e))
            .finally(() => {
                this.setState({ingrSelected: null});
                this.get_all_ingr();
            })
    }

    componentDidMount() {
        this.get_all_ingr();
    }

    render() {
        const body = (this.state.ingrSelected === null?
            <div className="IngredientListDiv">
                {this.state.ingrList.map((ingr, key) => {
                    return <Ingredient key={key} ingr={ingr} select={this.selectIngr}/>
                })}
                <Ingredient ingr={new IngredientClass({name: "add"})} select={this.selectIngr}/>
            </div>
            :<IngredientModif ingr={this.state.ingrSelected} saveChange={this.saveChange}
                    suppr={this.supprIngr}/>
        )

        return (
            <div id="PageIngredientDiv">
                <BoutonRetour visible={this.state.ingrSelected == null}/>
                <header className="HeaderBar">
                    <div onClick={this.get_all_ingr}>Ingrédients</div>
                </header>
                
                {body}
            </div>
        );
    }
}