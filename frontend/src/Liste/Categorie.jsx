import "./Categorie.css"
import { Component } from "react";

export class Categorie extends Component {
    constructor(props) {
        super();
        this.categorie = props.categorie;
    }

    render () {
        return (
            <div className="CategorieDiv">
                {this.categorie}
            </div>
        );
    }
}