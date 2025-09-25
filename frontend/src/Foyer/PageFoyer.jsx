import { BoutonRetour } from "../Menu_principal/BoutonRetour";
import { Foyer } from "./Foyer";
import "./PageFoyer.css"
import { Component } from "react";
import { FoyerClass, json_to_foyerList } from "../Class/Foyer"
import { AddFoyer } from "./AddFoyer"
import { RequeteClass } from "../Class/Requete";

export class PageFoyer extends Component {
    constructor(props) {
        super();
        const foyer = localStorage.getItem("foyer");
        this.state = {
            foyers: [],
            selected: foyer == null? null: parseInt(foyer)
        }
        this.req = new RequeteClass();
    }

    select_foyer = (foyer_id) => {
        this.setState({selected: foyer_id});
        localStorage.setItem("foyer", foyer_id);
    }

    create_foyer = async (name, description) => {
        const foy = new FoyerClass({name: name, description: description});
        const res = await this.req.create_foyer(foy);
        this.get_foyers()
    }

    get_foyers = async () => {
        const res = json_to_foyerList(await this.req.get_foyers());
        this.setState({foyers: res});
        
        if (this.state.selected != null) {
            for (let i = 0; i < res.length; i++) {
                if (res[i].id === this.state.selected)
                    return;
            }
            this.setState({selected: null});
            localStorage.setItem("foyer", null);
        }
    }

    componentDidMount() {
        this.get_foyers();
    }

    render() {
        const warning_selected = this.state.selected? "": <span className="WarningSelected">Aucun foyer selectionné !</span>

        return (
            <div>
                <BoutonRetour visible={true}/>
                <header className="HeaderBar">
                    <div>Foyer</div>
                </header>

                {warning_selected}

                <div className="FoyerListDiv">
                    {
                        this.state.foyers.map((foy, index) => {
                            return (
                                <Foyer key={index} foyer={foy} select={this.select_foyer} selected={this.state.selected} get_foyer={this.get_foyers}/>
                            );
                        })
                    }
                    <AddFoyer add={this.create_foyer}/>
                    {/* <Foyer foyer={new FoyerClass({name: "add", description: "Cliquez ici pour ajouter votre foyer"})} select={this.create_foyer}/> */}
                </div>
            </div>
        );
    }
}