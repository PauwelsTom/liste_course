import "./Ingredient.css"
import { Component } from "react";

// ingr, select
export class Ingredient extends Component {
    constructor(props) {
        super();
        this.ingr = props.ingr;
    }

    render() {
        return (
            <div className="IngredientDiv" onClick={() => this.props.select(this.ingr)}>
                <div className="IngredientEssential">
                    <span className="IngrName">{this.ingr.name}</span>
                    <span className="IngrType">{this.ingr.type}</span>
                    <span>{"Mesure: " + this.ingr.mesure}</span>
                </div>
                <span className="IngrDescription">
                    {this.ingr.description}
                </span>
                <img className="IngrImage" src={this.ingr.image} alt="image"/>
            </div>
        );
    }
}