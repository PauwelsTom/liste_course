import { Component } from "react";
import "./ArticleMagasin.css"

export class ArticleMagasin extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const img = this.props.ingr.check? "Valide.png": "Croix.png";
        return (
            <div className="ArticleMagasinDiv" onClick={() => this.props.check_ingr(this.props.ingr, !this.props.ingr.check)}>
                <img src={this.props.ingr.image} alt={this.props.ingr.name} className="ImageArticleMagasin"/>
                <span className="NomArticleMagasin">{this.props.ingr.name}</span>
                <span className="QuantiteArticleMagasin">{this.props.ingr.quantite} {this.props.ingr.mesure}</span>
                <img className="CheckArticleMagasin" src={img} alt=" "/>
            </div>
        );
    }
}