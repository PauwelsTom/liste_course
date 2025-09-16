import "./Foyer.css"
import { Component } from "react";

// foyer, select
export class Foyer extends Component {
    constructor(props) {
        super();
        this.state = {
            selected: null
        }
        this.f = props.foyer;
    }

    render() {
        return (
            <div className="FoyerDiv" onClick={() => this.props.select(this.f.id)}>
                <span className="FoyerName">{this.f.name}</span>
                <span className="FoyerDescription">{this.f.description}</span>
                <img className="FoyerImage" src={this.f.image} alt="image" />
            </div>
        );
    }
}