import { BoutonRetour } from "../Menu_principal/BoutonRetour";
import { Foyer } from "./Foyer";
import "./PageFoyer.css"
import { Component } from "react";
import { FoyerClass } from "../Class/Foyer"

export class PageFoyer extends Component {
    constructor(props) {
        super();
        this.state = {
            foyers: [1, 2, 3],
            selected: null
        }
    }

    select_foyer = (foyer_id) => {
        this.setState({selected: foyer_id});
    }

    create_foyer = () => {
        // TODO: Faire le call API pour créer un foyer dans la db (faire le endpoint aussi)
        return
    }

    get_foyers = () => {
        // TODO: Faire le call API pour récupérer les foyer
        return;
    }

    render() {
        const warning_selected = this.state.selected? "": <span className="WarningSelected">Aucun foyer selectionné !</span>

        const f = new FoyerClass({name: "Foyer Filler", description: "Descr Filler"});

        return (
            <div>
                <BoutonRetour visible={true}/>
                <header className="HeaderBar">
                    <div>Foyer</div>
                </header>

                {warning_selected}

                <div className="FoyerListDiv">
                    {
                        this.state.foyers.map((foy, _) => {
                            return (
                                <Foyer foyer={f} select={this.select_foyer}/>
                            );
                        })
                    }
                    <Foyer foyer={new FoyerClass({name: "add", description: "Cliquez ici pour ajouter votre foyer"})} select={this.create_foyer}/>
                </div>
            </div>
        );
    }
}