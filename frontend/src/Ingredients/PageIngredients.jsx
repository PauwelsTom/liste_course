import { ingrList } from "../Data/ingredients_data";
import { BoutonRetour } from "../Menu_principal/BoutonRetour";
import { Ingredient } from "./Ingredient";
import { IngredientModif } from "./IngredientModif";
import "./PageIngredients.css"
import "../Couleurs.css"
import { Component } from "react";
import { ListeIngredients } from "../Class/ListeIngredients";

export class PageIngredients extends Component {
    constructor(props) {
        super();
        this.state = {
            ingrSelected: null,
            ingrList: new ListeIngredients([])
        }
        this.foyer = 0;
    }

    get_all_ingr = (retry=false) => {
        fetch("http://127.0.0.1:8000/ingredients/" + this.foyer.toString())
            .then(response => {
                if (!response.ok)
                    throw new Error("Problème lors de la connexion à l'API");

                return response.json();
            })
            .then(json => {
                this.setState({ingrList: new ListeIngredients(json)});
                console.log(json);
            })
            .catch(e => console.error("Erreur lors de la requête:", e))
    }

    selectIngr = (ingr) => {
        this.setState({ingrSelected: ingr});
    }

    saveChange = (save, ingr=null) => {
        // TODO: envoie vers le backend le nouvel élément
        if (save) {
            console.log("requête update backend");
            console.log(ingr.to_json());

            //? Requête POST vers /ingredients/
            fetch("http://127.0.0.1:8000/ingredients/" + this.foyer.toString(), {
                method: 'POST',
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
                    this.setState({ingrList: new ListeIngredients(json)});
                })
                .catch(e => console.error("Erreur lors de la requête:", e))
                .finally(() => {
                    this.setState({ingrSelected: null});
                    this.get_all_ingr();
                })
        }
    }

    componentDidMount() {
        this.get_all_ingr();
    }

    render() {
        const body = (this.state.ingrSelected === null?
            <div className="IngredientListDiv">
                {this.state.ingrList.list.map((ingr, key) => {
                    return <Ingredient ingr={ingr} select={this.selectIngr}/>
                })}
                <Ingredient ingr={{name: "add"}} select={this.selectIngr}/>
            </div>
            :<IngredientModif ingr={this.state.ingrSelected} saveChange={this.saveChange}/>
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