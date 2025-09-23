import { Component } from "react";
import "./Recette.css"

// recette
export class Recette extends Component {
    constructor(props) {
        super();
    }

    modify = () => {
        this.props.select(this.props.recette)
    }

    render() {
        return (
            <div className="RecetteDiv" onClick={this.modify}>
                <span className="RecetteName">{this.props.recette.name}</span>
                <span className="RecetteDescription">{this.props.recette.description}</span>
            </div>
        );
    }
}