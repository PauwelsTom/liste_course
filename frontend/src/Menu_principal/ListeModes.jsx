import { Component } from "react";
import "./ListeModes.css"
import { BoutonMode } from "./BoutonMode";

export class ListeModes extends Component {
    constructor(props) {
        super();
        const foyer = parseInt(localStorage.getItem("foyer"));
        this.state = {
            foyer: isNaN(foyer)? null: foyer
        }
    }

    debug = () => {
        localStorage.setItem("foyer", null);
        this.setState({foyer: null})
    }

    render() {
        return (
            <div id="ListeModesDiv">
                <div id="TitleBoxListeMode" onClick={this.debug}>Liste de courses</div>
                <div id="ListeBoutonMode">
                    <BoutonMode name="Ma liste" link='/liste' disable={this.state.foyer == null}/>
                    <BoutonMode name="En magasin" link='/magasin' disable={this.state.foyer == null}/>
                    <BoutonMode name="Mes recettes" link='/recette' disable={this.state.foyer == null}/>
                    <BoutonMode name="Mes ingrédients" link='/ingredients' disable={this.state.foyer == null}/>
                    <BoutonMode name="Choisir un foyer" link='/foyer' disable={false}/>
                </div>
            </div>
        );
    }
}