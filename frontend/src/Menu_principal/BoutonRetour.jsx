import "./BoutonRetour.css"
import { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// visible
export class BoutonRetour extends Component {
    constructor(props) {
        super();
    }

    render() {
        const boutonClass = "BoutonRetourDiv " + (this.props.visible ? "" : "Hidden");
        return (
            <Link className={boutonClass} to="/">
                {"<"}
            </Link>
        );
    }
}