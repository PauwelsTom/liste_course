import "./PageListe.css"
import { Component } from "react";
import { BoutonRetour } from "../Menu_principal/BoutonRetour";
import { RequeteClass } from "../Class/Requete";

export class PageListe extends Component {
    constructor(props) {
        super();
        this.state = {
            items: [],
            modeRecette: true
        }
        this.req = new RequeteClass();
    }

    get_class_mode = (selected) => {
        return "ModeListeAjout " + (selected? "ModeListeAjoutSelected": "");
    }

    change_mode = () => {
        this.setState({modeRecette: !this.state.modeRecette});
    }

    get_items = async () => {
        
    }


    render() {
        return (
            <div>
                <BoutonRetour visible={true}/>
                <header className="HeaderBar">
                    <div onClick={this.debug}>Faire ma liste</div>
                </header>
                <div className="MaListeBody">

                </div>
                <div className="ModeListeAjoutDiv">
                    <div className={this.get_class_mode(this.state.modeRecette)} onClick={this.change_mode}>Recette</div>
                    <div className={this.get_class_mode(!this.state.modeRecette)} onClick={this.change_mode}>Ingrédients</div>
                </div>
            </div>
        );
    }
}