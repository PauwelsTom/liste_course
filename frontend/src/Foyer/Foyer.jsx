import "./Foyer.css"
import { Component } from "react";
import { FoyerForm } from "./FoyerForm";
import { FoyerClass } from "../Class/Foyer";
import { RequeteClass } from "../Class/Requete";

// foyer, select, selected, get_foyer
export class Foyer extends Component {
    constructor(props) {
        super();
        this.state = {
            params: false,
            foyer: props.foyer
        }
        this.req = new RequeteClass();
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

    modifier = async (name, description) => {
        const foyer = this.build_foyer_class(name, description);
        this.setState({foyer: foyer, params: false});
        await this.req.update_foyer(foyer);
        console.log("On passe ici")
        this.props.get_foyer();
    }

    supprimer = async () => {
        await this.req.delete_foyer(this.state.foyer);
        this.props.get_foyer();
    }

    render() {
        return (
            <div className={this.foyer_class()}>
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