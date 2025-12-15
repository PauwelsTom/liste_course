import "./PageListe.css"
import { Component } from "react";
import { BoutonRetour } from "../Menu_principal/BoutonRetour";
import { RequeteClass } from "../Class/Requete";
import { ListeItem } from "./ListeItem";
import { Categorie } from "./Categorie";

export class PageListe extends Component {
    constructor(props) {
        super();
        this.state = {
            items: [],
            modeRecette: true,
            display_list: ""
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

    reset_liste = () => {
        // Met tous les éléments (recettes et ingrédients) à 0
        return
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
                    <div className="ViderListe">X</div>
                </header>
                <div className="MaListeBody">
                    {this.state.items.map((item, index) => {
                        if (!this.state.modeRecette && (index === 0 || item.type !== this.state.items[index - 1].type)) {
                            return (
                                <div>
                                    <Categorie categorie={item.type}/>
                                    <ListeItem item={item} get_items={this.get_items} key={index}/>
                                </div>
                            ) 
                        } else {
                            return (
                                <ListeItem item={item} get_items={this.get_items} key={index}/>
                            )
                        }
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