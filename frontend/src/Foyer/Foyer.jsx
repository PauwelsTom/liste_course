import "./Foyer.css"
import { Component } from "react";
import { FoyerForm } from "./FoyerForm";
import { FoyerClass } from "../Class/Foyer";

// foyer, select, selected, get_foyer
export class Foyer extends Component {
    constructor(props) {
        super();
        this.state = {
            params: false,
            foyer: props.foyer
        }
        this.add = this.state.foyer.name === "add";
    }

    foyer_class = () => {
        const selected = this.props.selected === this.state.foyer.id && !this.add;
        return "FoyerDiv " + (selected? "FoyerSelected": "")
    }

    toggleParams = () => {
        this.setState({params: !this.state.params});
    }

    build_foyer_class = (name, description) => {
        return new FoyerClass({
            id: this.state.foyer.id,
            name: name,
            description: description,
            image: null
        });
    }

    modifier = (name, description) => {
        const foyer = this.build_foyer_class(name, description);
        this.setState({foyer: foyer, params: false});
        
        fetch("http://127.0.0.1:8000/foyer/", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(foyer.to_json())
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("Problème lors de la connexion à l'API");

                return response.json();
            })
            .catch(e => alert("Erreur lors de la requête:" + e))
            .finally(() => {
                this.props.get_foyer();
            })
    }

    supprimer = () => {
        fetch("http://127.0.0.1:8000/foyer/", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: this.state.foyer.id})
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("Problème lors de la connexion à l'API");

                return response.json();
            })
            .catch(e => alert("Erreur lors de la requête:" + e))
            .finally(() => {
                this.props.get_foyer();
            })
    }

    render() {
        return (
            <div key={this.state.foyer.name} className={this.foyer_class()}>
                <div className="FoyerInfoDiv" onClick={() => this.props.select(this.state.foyer.id)}>
                    <span className="FoyerName">{this.state.foyer.name}</span>
                    <span className="FoyerDescription">{this.state.foyer.description}</span>
                    <img className="FoyerImage" src="reglage.png" alt={this.state.foyer.name} onClick={this.toggleParams}/>
                </div>
                <FoyerForm visible={this.state.params} add={this.modifier}
                changeMode={this.supprimer} foyer={this.state.foyer}/>
            </div>
        );
    }
}