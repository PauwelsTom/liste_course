import { ingrList } from "../Data/ingredients_data";
import { BoutonRetour } from "../Menu_principal/BoutonRetour";
import { Ingredient } from "./Ingredient";
import { IngredientModif } from "./IngredientModif";
import "./PageIngredients.css"
import "../Couleurs.css"
import { Component } from "react";

export class PageIngredients extends Component {
    constructor(props) {
        super();
        this.state = {
            ingrSelected: null
        }
        this.ingrList = ingrList;
    }

    selectIngr = (ingr) => {
        this.setState({ingrSelected: ingr});
    }

    saveChange = (save, ingr=null) => {
        // TODO: envoie vers le backend le nouvel élément
        if (save) {
            console.log("requête update backend")
        }
        this.setState({ingrSelected: null});
    }

    render() {
        const body = (this.state.ingrSelected === null?
            <div className="IngredientListDiv">
                {this.ingrList.list.map((ingr, _) => {
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
                    <div>Ingrédients</div>
                </header>
                
                {body}
            </div>
        );
    }
}