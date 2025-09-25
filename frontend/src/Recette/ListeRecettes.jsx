import { Component } from "react";
import "./ListeRecettes.css"
import { RecetteClass, json_to_recetteList } from "../Class/Recette";
import { Recette } from "./Recette";
import { RequeteClass } from "../Class/Requete";


// visible, foyer
export class ListeRecettes extends Component {
    constructor(props) {
        super();
        this.state = {
            recettes: []
        }
        this.visible = props.visible;
        this.req = new RequeteClass();
    }

    get_class = () => {
        return "ListeRecettesDiv " + (this.props.visible? "": "Hidden");
    }

    get_all_recettes = async () => {
        const res = await this.req.get_recettes(this.props.foyer.toString())
        this.setState({recettes: json_to_recetteList(res)});
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