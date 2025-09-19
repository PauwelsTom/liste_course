import { BoutonRetour } from "../Menu_principal/BoutonRetour";
import { Foyer } from "./Foyer";
import "./PageFoyer.css"
import { Component } from "react";
import { json_to_foyerList } from "../Class/Foyer"
import { AddFoyer } from "./AddFoyer"

export class PageFoyer extends Component {
    constructor(props) {
        super();
        const foyer = localStorage.getItem("foyer");
        this.state = {
            foyers: [],
            selected: foyer == null? null: parseInt(foyer)
        }
    }

    select_foyer = (foyer_id) => {
        this.setState({selected: foyer_id});
        localStorage.setItem("foyer", foyer_id);
    }

    create_foyer = (name, description) => {
        // TODO: Faire le call API pour créer un foyer dans la db (faire le endpoint aussi)
        alert(name + " - " + description);
        fetch("http://127.0.0.1:8000/foyer/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, description: description})
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("Problème lors de la connexion à l'API");

                return response.json();
            })
            .then(json => {
                this.get_foyers();
            })
            .catch(e => console.error("Erreur lors de la requête:", e))
        return;
    }

    get_foyers = () => {
        // TODO: Faire le call API pour récupérer les foyer
        fetch("http://127.0.0.1:8000/foyer/")
            .then(response => {
                if (!response.ok)
                    throw new Error("Problème lors de la connexion à l'API");

                return response.json();
            })
            .then(json => {
                const res = json_to_foyerList(json);
                console.log(res);
                this.setState({foyers: res});
                
                if (this.state.selected != null) {
                    for (const i = 0; i < res.length; i++) {
                        if (res[i].id === this.state.selected)
                            return;
                    }
                    this.setState({selected: null});
                    localStorage.setItem("foyer", null);
                }
            })
            .catch(e => console.error("Erreur lors de la requête:", e))
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
                        this.state.foyers.map((foy, _) => {
                            return (
                                <Foyer foyer={foy} select={this.select_foyer} selected={this.state.selected} get_foyer={this.get_foyers}/>
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