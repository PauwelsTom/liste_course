import { Component } from "react";
import "./ListeModes.css"
import { BoutonMode } from "./BoutonMode";

export class ListeModes extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div id="ListeModesDiv">
                <div id="TitleBoxListeMode">Liste de courses</div>
                <div id="ListeBoutonMode">
                    <BoutonMode name="Faire ma liste" link='/liste'/>
                    <BoutonMode name="En magasin" link='/magasin'/>
                    <BoutonMode name="Ajouter des recettes" link='/recette'/>
                    <BoutonMode name="Choisir un foyer" link='/foyer'/>
                </div>
            </div>
        );
    }
}