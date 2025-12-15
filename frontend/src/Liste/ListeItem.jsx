import { Component } from "react";
import "./ListeItem.css"
import { RequeteClass } from "../Class/Requete";

// item, recette
export class ListeItem extends Component {
    constructor(props) {
        super();
        this.req = new RequeteClass();
    }

    add_item = async () => {
        let quantite = 1;
        while (!this.props.item.recette && this.props.item.mesure != "Piece") {
            quantite = window.prompt("Combien de '" +  this.props.item.mesure + "' ?")
            if (quantite == null || quantite == "" || quantite == "0") {
                return;
            }
            quantite = parseInt(quantite);
            if (!isNaN(quantite)) {
                break;
            }
        }
        await this.req.ma_liste_add(this.props.item.id, quantite);
        this.props.get_items();
    }

    remove_item = async () => {
        if (this.props.item.quantite === 0) {
            alert("Ingrédient déjà à 0")
            return;
        }
        let quantite = 1;
        while (!this.props.item.recette && this.props.item.mesure != "Piece") {
            quantite = window.prompt("Combien de '" +  this.props.item.mesure + "' ?")
            if (quantite == null || quantite == "" || quantite == "0") {
                return;
            }
            quantite = parseInt(quantite);
            if (!isNaN(quantite)) {
                break;
            }
        }
        if (this.props.item.quantite - quantite < 0) {
            quantite = this.props.item.quantite;
            console.log(this.props.item);
        }
        await this.req.ma_liste_add(this.props.item.id, -quantite, true);
        this.props.get_items();
    }

    render() {
        return (
            <div className="ListeItem">
                <div className="BoutonPlusMoins" onClick={this.remove_item}>-</div>
                <div className="ListeItemContenu">
                    <span className="NomItem">{this.props.item.name}</span>
                    <span className="QuantiteItem">{this.props.item.quantite}</span>
                </div>
                <div className="BoutonPlusMoins" onClick={this.add_item}>+</div>
            </div>
        );
    }
}