import "./PageListe.css"
import { Component } from "react";
import { BoutonRetour } from "../Menu_principal/BoutonRetour";
import { RequeteClass } from "../Class/Requete";
import { ListeItem } from "./ListeItem";

export class PageListe extends Component {
    constructor(props) {
        super();
        this.state = {
            items: [],
            modeRecette: true
        }
        this.req = new RequeteClass();

        const foyer = parseInt(localStorage.getItem("foyer"));
        this.foyer = isNaN(foyer)? null: foyer;
    }

    get_class_mode = (selected) => {
        return "ModeListeAjout " + (selected? "ModeListeAjoutSelected": "");
    }

    change_mode = () => {
        this.setState({modeRecette: !this.state.modeRecette}, () =>{
            this.get_items();
        });
    }


    get_items = async () => {
        const res = await this.req.get_items_ma_liste(this.state.modeRecette, this.foyer);
        this.setState({items: res});
    }

    componentDidMount() {
        this.get_items();
    }


    render() {
        return (
            <div>
                <BoutonRetour visible={true}/>
                <header className="HeaderBar">
                    <div onClick={this.debug}>Faire ma liste</div>
                </header>
                <div className="MaListeBody">
                    {this.state.items.map((item, index) => {
                        return (
                            <ListeItem item={item} get_items={this.get_items} key={index}/>
                        )
                    })}
                </div>
                <div className="ModeListeAjoutDiv">
                    <div className={this.get_class_mode(this.state.modeRecette)} onClick={this.change_mode}>Recette</div>
                    <div className={this.get_class_mode(!this.state.modeRecette)} onClick={this.change_mode}>Ingrédients</div>
                </div>
            </div>
        );
    }
}