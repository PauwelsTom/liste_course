import "./PageRecette.css"
import "../Couleurs.css"
import { BoutonRetour } from "../Menu_principal/BoutonRetour";
import { Component } from "react";
import { ListeRecettes } from "./ListeRecettes";
import { AddRecette } from "./AddRecette";

export class PageRecette extends Component {
    constructor(props) {
        super();
        const foyer = parseInt(localStorage.getItem("foyer"));
        this.state = {
            foyer: isNaN(foyer)? null: foyer,
            addMode: false,
            recette: null,
        }
    }

    modify_recette = (rec=null) => {
        this.setState({
            addMode: !this.state.addMode,
            recette: rec
        })
        const name = (rec == null? "": rec.name);
        const descr = (rec == null? "": rec.description);

        document.getElementById("RecetteName").value = name;
        document.getElementById("RecetteDescription").value = descr;

    }

    render() {
        return (
            <div>
                <BoutonRetour visible={true}/>
                <header className="HeaderBar">
                    <div onClick={this.debug}>Recettes</div>
                </header>
                <ListeRecettes visible={!this.state.addMode} foyer={this.state.foyer} select={this.modify_recette}/>
                <AddRecette visible={this.state.addMode} recette={this.state.recette} exit={this.modify_recette} foyer={this.state.foyer}/>
            </div>
        );
    }
}