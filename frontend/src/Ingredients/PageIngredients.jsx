import { BoutonRetour } from "../Menu_principal/BoutonRetour";
import { Ingredient } from "./Ingredient";
import { IngredientModif } from "./IngredientModif";
import "./PageIngredients.css"
import "../Couleurs.css"
import { Component } from "react";
import { IngredientClass, json_to_ingrList } from "../Class/Ingredient";
import { RequeteClass } from "../Class/Requete";

export class PageIngredients extends Component {
    constructor(props) {
        super();
        this.state = {
            ingrSelected: null,
            ingrList: []
        }
        this.req = new RequeteClass();

        const foyer = parseInt(localStorage.getItem("foyer"));
        this.foyer = isNaN(foyer)? null: foyer;
    }

    get_all_ingr = async () => {
        const res = await this.req.get_ingredients(this.foyer.toString());
        this.setState({ingrList: json_to_ingrList(res)});
    }

    selectIngr = (ingr) => {
        this.setState({ingrSelected: ingr});
    }

    saveChange = async (save, newIngr=true, ingr=null) => {
        if (save) {
            if (newIngr) {
                const res = await this.req.create_ingredient(ingr, this.foyer.toString(), true)
                this.setState({ingrList: json_to_ingrList(res)});
            } else {
                const res = await this.req.update_ingredient(ingr, this.foyer.toString())
                this.setState({ingrList: json_to_ingrList(res)});
            }
        }
        this.setState({ingrSelected: null});
        this.get_all_ingr();
    }

    supprIngr = async (ingr) => {
        if (!window.confirm("Voulez vous supprimer l'ingrédient " + ingr.name + "?")) {
            return;
        }

        const count = await this.req.get_ingredient_recette_count(ingr.id);

        if (!window.confirm("L'ingrédient sera supprimé de " + count + " recette(s)")) {
            return;
        }

        ingr.foyer = this.foyer;
        await this.req.delete_ingredient(ingr, true);

        await this.get_all_ingr();
        this.setState({ingrSelected: null});
    }

    componentDidMount() {
        this.get_all_ingr();
    }

    render() {
        const body = (this.state.ingrSelected === null?
            <div className="IngredientListDiv">
                <Ingredient ingr={new IngredientClass({name: "add"})} select={this.selectIngr}/>
                {this.state.ingrList.map((ingr, key) => {
                    return <Ingredient key={key} ingr={ingr} select={this.selectIngr}/>
                })}
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