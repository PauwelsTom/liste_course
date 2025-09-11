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
                    <BoutonMode name="Faire ma liste"/>
                    <BoutonMode name="En magasin"/>
                    <BoutonMode name="Ajouter des recettes"/>
                    <BoutonMode name="Choisir un foyer"/>
                </div>
            </div>
        );
    }
}