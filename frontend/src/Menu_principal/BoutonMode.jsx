import { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./BoutonMode.css"

// name, link
export class BoutonMode extends Component {
    constructor(props) {
        super();
        this.name = props.name;
        this.link = props.disable? "/": props.link;
    }

    get_class = () => {
        return "BoutonModeDiv " + (this.props.disable? "Disabled": "");
    }

    render() {
        return (
            <Link className={this.get_class()} to={this.link}>
                {this.name}
            </Link>
        );
    }
}