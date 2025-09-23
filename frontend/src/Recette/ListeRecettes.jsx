import { Component } from "react";
import "./ListeRecettes.css"
import { RecetteClass, json_to_recetteList } from "../Class/Recette";
import { Recette } from "./Recette";


// visible, foyer
export class ListeRecettes extends Component {
    constructor(props) {
        super();
        this.state = {
            recettes: []
        }
        this.visible = props.visible;
    }

    get_class = () => {
        return "ListeRecettesDiv " + (this.props.visible? "": "Hidden");
    }

    get_all_recettes = () => {
        fetch("http://127.0.0.1:8000/recette/" + this.props.foyer.toString())
            .then(response => {
                if (!response.ok)
                    throw new Error("Problème lors de la connexion à l'API");

                return response.json();
            })
            .then(json => {
                this.setState({recettes: json_to_recetteList(json)});
            })
            .catch(e => console.error("Erreur lors de la requête:", e))
        return;
    }

    componentDidMount() {
        this.get_all_recettes()
    }

    componentDidUpdate() {
        if (this.visible !== this.props.visible) {
            this.visible = this.props.visible;
            if (this.visible) { 
                this.get_all_recettes();
            }
        }
    }

    render() {
        return (
            <div className={this.get_class()}>
                {
                    this.state.recettes.map((rec, index) => {
                        return <Recette key={rec.id} recette={rec} select={this.props.select}/>;
                    })
                }
                <div className="AddRecetteLineDiv" onClick={this.props.select}>
                    <span className="RecetteName">Ajouter une recette</span>
                    <span className="RecetteDescription">Cliquer ici pour ajouter une recette</span>
                </div>
            </div>
        )
    }
}